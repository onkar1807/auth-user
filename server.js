require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const { readdirSync } = require('fs');


// Database connection
const url = process.env.MONGO_URI;
mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

const connection = mongoose.connection;
connection.once('open', () => {
    console.log('Database connected');
})


// Middlewares
app.use(express.json());
app.use(cors());


// Route middleware
readdirSync('./route').map((r) => app.use('/api', require(`./route/${r}`)));

// Listening port
const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));


