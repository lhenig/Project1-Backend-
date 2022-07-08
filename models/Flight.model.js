const mongoose = require('mongoose');
const Schema = mongoose.Schema

// DEFINING FLIGHT SCHEMA
const flightSchema = new Schema({

    // data required
    // flight number, deparuture date, arrival date, departure time, arrival time
    // departure airport, arrival airport, number of passengers, passenger limit

    flightNumber: {
        type: String,
        required: true,
        unique: true,
    },
    departureDate: {
        type: String,
        required:true
    },
    arrivalDate: {
        type: String,
        required:true
    },
    departureTime: {
        type: String,
        required: true
    },
    arrivalTime: {
        type: String,
        required:true
    },
    departureAirport: {
        type: String,
        required:true
    },
    arrivalAirport: {
        type: String, 
        required:true
    },
    numPassengers: {
        type: Number,
        required:true,
        min: 0,
        max: [544, 'You cannot hold more people than a Airbus A380'],
    },
    passengerLimit: {
        type: Number,
        required: true,
        min: 0,
        max: [544, 'You cannot hold more people than a Airbus A380'],
    },
});

const Flight = mongoose.model('Flight', flightSchema,);
module.exports = Flight;