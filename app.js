const express = require('express')
const logger = require('morgan')

const app = express()//this tells us that express is a fucntion

app.use(logger('dev'));

app.use(express.json());

app.set('view engine', 'ejs')
app
    .route('/').get((request, response) => response.render('feed' , {title:"Root route"}))
    .get((request, response) => response.send('This is my app'))
    .post((req, res) => {

app
    console.log(req.body);
    res.json({message: "message recieved"});

app.post('/posts', (req, res) => {
    posts.push(req.body.post)
    res.redirect('/post')
})

app.route('/api').post((req, res) => {
    console.log(req.body);
    res.json({ message: "message recieved sis lul"})
})

    })

app.listen(3000, () => console.log('Running on port 3000'))