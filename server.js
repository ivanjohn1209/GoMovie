const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const config = require('config');

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
