const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const config = require('config');
const fs = require('fs')
const app = express();
//Bodyparser Middleware
app.use(express.json());


//DB Config
const db = config.get('MONGOURI');
//Connect to MongoMONGO_URI
mongoose.connect(process.env.MONGO_URI || db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
})
    .then(() => console.log("MONGO CONNECTED..."))
    .catch(err => console.log(err));

//Use RouteS
app.use('/api/users', require('./routes/api/users'));
app.use('/api/movies', require('./routes/api/movies'));
app.use('/api/auth', require('./routes/api/auth'));


app.get('/', (request, response) => {
    const filePath = path.resolve(__dirname, 'client', 'build', 'index.html');
    fs.readFile(filePath, 'utf-8', function (err, data) {
        if (err) {
            return console.log(err);
        }
        data = data.replace(/\$OG_TITLE/g, 'GoMovie | Watch Movie');
        data = data.replace(/\$OG_DESCRIPTION/g, "At GoMovie, we want to entertain the world. Whatever your taste, and no matter where you live, we give you access to best-in-class TV shows, movies and documentaries.");
        result = data.replace(/\$OG_IMAGE/g, 'https://i.imgur.com/V7irMl8.png');
        response.send(result);
    });
});


app.get('/home', (request, response) => {
    const filePath = path.resolve(__dirname, 'client', 'build', 'index.html');
    fs.readFile(filePath, 'utf-8', function (err, data) {
        if (err) {
            return console.log(err);
        }
        data = data.replace(/\$OG_TITLE/g, 'GoMovie: Watch Movie Online · GoMovie');
        data = data.replace(/\$OG_DESCRIPTION/g, "Watch GoMovie movies & TV shows online or stream right to your smart TV, game console, PC, Mac, mobile, tablet and more.");
        result = data.replace(/\$OG_IMAGE/g, 'https://i.imgur.com/V7irMl8.png');
        response.send(result);
    });
});
app.get('/login', (request, response) => {
    const filePath = path.resolve(__dirname, 'client', 'build', 'index.html');
    fs.readFile(filePath, 'utf-8', function (err, data) {
        if (err) {
            return console.log(err);
        }
        data = data.replace(/\$OG_TITLE/g, 'Login | GoMovie');
        data = data.replace(/\$OG_DESCRIPTION/g, "Watch GoMovie movies & TV shows online or stream right to your smart TV, game console, PC, Mac, mobile, tablet and more, soo Login now.");
        result = data.replace(/\$OG_IMAGE/g, 'https://i.imgur.com/V7irMl8.png');
        response.send(result);
    });
});

app.get('/signup', (request, response) => {
    const filePath = path.resolve(__dirname, 'client', 'build', 'index.html');
    fs.readFile(filePath, 'utf-8', function (err, data) {
        if (err) {
            return console.log(err);
        }
        data = data.replace(/\$OG_TITLE/g, 'Signup | GoMovie');
        data = data.replace(/\$OG_DESCRIPTION/g, "Watch GoMovie movies & TV shows online or stream right to your smart TV, game console, PC, Mac, mobile, tablet and more, soo Signup now.");
        result = data.replace(/\$OG_IMAGE/g, 'https://i.imgur.com/V7irMl8.png');
        response.send(result);
    });
});

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
    //set static folder
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on ${port}`))





//zUll33G1G13bUqg3
