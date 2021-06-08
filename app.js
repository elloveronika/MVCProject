const express = require('express')
const logger = require('morgan')
const Sequelize = require('sequelize');
const { INITIALLY_DEFERRED } = require('sequelize/types/lib/deferrable');

const sequelize = new Sequelize({
    'dialect': 'sqlite',
    'storage': 'development.db'
});

const Model = sequelize.Model;


class Post extends Model{}

Post.init({
    post: Sequelize.DataTypes.TEXT
} sequelize )

(async () => {
    try {
        await sequelize.authenticate();
        console.log('connection has been established');

        try{
            await sequelize.sync({force: true});
        }catch(err){
            console.log("database couldnt be synced")
        }
    } catch (err){
        console.log('Database couldnt be authenticated', err)
    }
}
)();

const posts = ["This is the post I want", "This is also the post I want"]

const app = express()//this tells us that express is a fucntion

app.use(logger('dev'));

app.use(express.json());

app.set('view engine', 'ejs')

app.route('/').get((request, response) => response.render('./feed' , {title:"Root route"}))


app.get('/posts', (req,res) => {
    res.render('.../post.ejs', {
    posts,
    })
})
    
// app
//     // console.log(req.body);
//     res.json({message: "message recieved"});

app.post('/posts', (req, res) => {
    posts.push(req.body.post)
    res.status(201).send();// changes the status code of the http response
})

app.route('/api').post((req, res) => {
    console.log(req.body);
    res.json({ message: "message recieved sis"})
})


app.listen(3000, () => console.log('Running on port 3000'))