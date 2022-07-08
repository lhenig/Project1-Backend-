const express = require('express');
const mongoose = require('mongoose');
//const logger = require('./middleware/logger');
require('dotenv').config();
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 8088;

app.use(express.json());
app.use(cors());
//app.use(logger);

///////////////////////
//* PAGE NAVIGATION *//
///////////////////////
app.use('/flights', require('./routes/flight.route.js'));


app.all('*', (req, res) =>{
    res.status(404).send(`We do not have that resource`);
});

///////////////////////////
//* END PAGE NAVIGATION *//
///////////////////////////

// connection to database
mongoose.connect(process.env.MONGO_URI)
    .then(()=> {
        console.log('Connection made to MONGO DB');
    })
    .catch(err => {
        console.error("\nCould not connect to MongoDB\n");
        console.error(err);
        process.exit(1);
    })
// TODO Clean up method
process.on('exit', () => {
    console.log('Database Connection Terminated');
})

// Start Server on Port
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});