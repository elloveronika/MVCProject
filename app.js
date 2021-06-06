const express = require('express')
const logger = require('morgan')

const app = express()//this tells us that express is a fucntion

app.use(logger('dev'));

app.use(express.json());


app
    .route('/')
    .get((request, response) => response.send('This is my app'))
    .post((req, res) => {

app
    console.log(req.body);
    res.json({message: "message recieved"});

    })

app.listen(3000, () => console.log('Running on port 3000'))