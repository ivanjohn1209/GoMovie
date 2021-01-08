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

//Use Route
app.use('/api/items', require('./routes/api/items'));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/movies', require('./routes/api/movies'));
app.use('/api/auth', require('./routes/api/auth'));

// change Meta Tags
app.get('/home', (request, response) => {
    console.log('Home page visited!sdasdasda');
    const filePath = path.resolve(__dirname, 'client', 'build', 'index.html');

    // read in the index.html file
    fs.readFile(filePath, 'utf-8', function (err, data) {
        if (err) {
            return console.log(err);
        }
        // replace the special strings with server generated strings
        data = data.replace(/\$OG_TITLE/g, 'Home Page');
        data = data.replace(/\$OG_DESCRIPTION/g, "Home page description");
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



// const express = require('express');
// const app = express();
// const port = process.env.PORT || 5000;
// const path = require('path');
// const fs = require('fs')

// app.get('/', function (request, response) {
//     console.log('Home page visited!');
//     const filePath = path.resolve(__dirname, './build', 'index.html');

//     // read in the index.html file
//     fs.readFile(filePath, 'utf8', function (err, data) {
//         if (err) {
//             return console.log(err);
//         }

//         // replace the special strings with server generated strings
//         data = data.replace(/\$OG_TITLE/g, 'Home Page');
//         data = data.replace(/\$OG_DESCRIPTION/g, "Home page description");
//         result = data.replace(/\$OG_IMAGE/g, 'https://i.imgur.com/V7irMl8.png');
//         response.send(result);
//     });
// });

// app.get('/about', function (request, response) {
//     console.log('About page visited!');
//     const filePath = path.resolve(__dirname, './build', 'index.html')
//     fs.readFile(filePath, 'utf8', function (err, data) {
//         if (err) {
//             return console.log(err);
//         }
//         data = data.replace(/\$OG_TITLE/g, 'About Page');
//         data = data.replace(/\$OG_DESCRIPTION/g, "About page description");
//         result = data.replace(/\$OG_IMAGE/g, 'https://i.imgur.com/V7irMl8.png');
//         response.send(result);
//     });
// });

// app.get('/contact', function (request, response) {
//     console.log('Contact page visited!');
//     const filePath = path.resolve(__dirname, './build', 'index.html')
//     fs.readFile(filePath, 'utf8', function (err, data) {
//         if (err) {
//             return console.log(err);
//         }
//         data = data.replace(/\$OG_TITLE/g, 'Contact Page');
//         data = data.replace(/\$OG_DESCRIPTION/g, "Contact page description");
//         result = data.replace(/\$OG_IMAGE/g, 'https://i.imgur.com/V7irMl8.png');
//         response.send(result);
//     });
// });

// app.use(express.static(path.resolve(__dirname, './build')));

// app.get('*', function (request, response) {
//     const filePath = path.resolve(__dirname, './build', 'index.html');
//     response.sendFile(filePath);
// });

// app.listen(port, () => console.log(`Listening on port ${port}`));



























//zUll33G1G13bUqg3
