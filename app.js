const express = require('express')
const logger = require('morgan')
const Sequelize = require('sequelize'); // Sequelize lets us communicate with SQL databases in javascript

const app = express()//this tells us that express is a fucntion

const sequelize = new Sequelize({ // instance of db 
    'dialect': 'sqlite', // sequelize = mongoose ,, sqlite = mongodb 
    'storage': 'development.db'
});

const Model = sequelize.Model;


class Post extends Sequelize.Model{}

Post.init({//creating a schema like in mongoose
    post: Sequelize.DataTypes.TEXT
}, {sequelize});

(async () => { //sequelize is an  orm:  object rrelational mapper
    try {
        await sequelize.authenticate();
        console.log('connection has been established');

        try{
            await sequelize.sync({force: true});
            const posts = ["This is the post I want", "This is also the post I want"]
            for(let post of posts){
                await Post.create({post});
            }
        }catch(err){
            console.log("database couldnt be synced")
        }
    } catch (err){
        console.log('Database couldnt be authenticated', err)
    }
}
)();



app.use(logger('dev'));

app.use(express.json());

app.set('view engine', 'ejs')

app.route('/').get((request, response) => response.render('feed', {title:"Root route"}))


app.get('/posts', async (req,res) => {
    const posts = await Post.findAll()
    res.render('posts', { posts })
})
    
// app
//     // console.log(req.body);
//     res.json({message: "message recieved"});
app.route('/api').post((req, res) => {
    console.log(req.body);
    res.json({ message: "message recieved sis"})
})

app.post('/api/posts', (req, res) => {
    // create a new Post instance here like on line 30
    res.status(201).send();// changes the status code of the http response
})



app.listen(3000, () => console.log('Running on port 3000'))