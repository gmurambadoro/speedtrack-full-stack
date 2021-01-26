const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

// load environment variables from .env file
dotenv.config();

const app = express();

const port = process.env.PORT || 5000;
const uri = process.env.MONGO_URL;

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true,
})
    .then(() => 'MongoDB database connection established successfully')
    .catch(err => console.error(err));

app.use(cors());
app.use(express.json());

const connection = mongoose.connection;

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
