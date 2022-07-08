const Flight = require('../models/Flight.model');

/////****DATA VALIDATORS FOR NEW FLIGHT AND FLIGHTUPDATE+****/////

// Returns -1 if a is less than b
// Returns 0 if a == b
// Returns 1 if a is greater than b 
const dateCompare = (d, a) => {
    if(d == a){
        return 0;
    }
    let arrD = d.split("-");
    let arrA = a.split("-");
    // Compare Years
    if(arrD[0] < arrA[0]){
        return -1;
    }else if (arrD[0] > arrA[0]){
        return 1;
    }
    // Compare Months
    if(arrD[1] < arrA[1]){
        return -1;
    }else if(arrD[1] > arrA[1]){
        return 1;
    }
    // Compare Days
    if(arrD[2] < arrA[2]){
        return -1;
    }else if(arrD[2] > arrA[2]){
        return 1;
    }
    //if data is in propper form this point fill not be reached
    return -99; 
}

// Returns True if depart Time < arrival Time
const timeCompare = (d, a) => {
    let arrD = d.split("-");
    let arrA = a.split("-");
    // Compare Hours
    if(arrD[0] < arrA[0]){
        return true;
    }else if (arrD[0] > arrA[0]){
        return false;
    }
    // Compare Hours
    if(arrD[1] < arrA[1]){
        return true;
    }else if (arrD[1] > arrA[1]){
        return false;
    }    
    //if the formating does not match
    return false;
}

    // data required
    // flight number, deparuture date, arrival date, departure time, arrival time
    // departure airport, arrival airport, number of passengers, passenger limit

const createFlight = async ({flightNumber, departureDate, arrivalDate, departureTime, arrivalTime, departureAirport, arrivalAirport, numPassengers, passengerLimit}) => {
    //validating DATES and TIMES
    try{
        let result = dateCompare(departureDate,arrivalDate);
        if(result == -1){
            console.log(`Valid dates`);
        }
        else if(result == 1){
            throw{status:400, message:`Cannot time travel`};
        }
        //if the dates are the same compare time
        else if (result == 0){
            if(timeCompare(departureTime, arrivalTime)){
                console.log(`valid times`);
            }
            else{
                throw{status:400, message:`Cannot time travel`};
            }
        }
        else{
            throw{status:400, message:`Impropper date format`};
        }
        // check for valid num of passenegers
        if(numPassengers > passengerLimit){
            throw{status:400, message:`Impropper date format`};
        }

    } catch(err){
        console.log(err);
        throw{status:400, message:err};
    }
    try {
        const flight = new Flight({
            flightNumber,
            departureDate,
            arrivalDate,
            departureTime,
            arrivalTime,
            departureAirport, 
            arrivalAirport, 
            numPassengers, 
            passengerLimit
        });
        await flight.save();
        // Returns newly created object
        return flight;
    }
    catch (err) {
        console.log(err);
        throw{status:400, message:err};
    }
};

const findAllFlights = async (limit=0) => {
    const flights = await Flight.find();  // GET all flights
    return flights;
};

const removeFlightByMongoId = async id => {
    const responce = await Flight.deleteOne({ _id: id });

}

        //////  TODO   //////
    /* Come back and split this into two functions*/
const findFlightByIdOrFlightId = async id => {
    try{
        console.log('here');
        const flight = await Flight.findById(id);
        console.log('error here');
        if (flight != null){
            console.log('dfgfg');
            return flight;

        }
    }catch(err){
        console.log(`${id} is not in Mongo id form.\nNow checking for Flight ID`);
    }
    try{

        let flights = await Flight.find();
        if(flights != null){
            flights = flights.filter(flights => flights.flightNumber == id);
            if(array.length >0 || array != undefined){
                console.log(flights);
                console.log('reee');
                return flights;
            }
        }
        // If the code runs this far there will not be a match so we throw an error
        throw`ID ${id} does not match a Flight Id or a Mongo Doc Id`;
    
    } catch (err){
        //Might take this out later
        // console.error(err);
        throw {status:404, message:err }; //rejects the promise
    }
};
// {fN, departureDate, arrivalDate, departureTime, arrivalTime, departureAirport, arrivalAirport, numPassengers, passengerLimit }
const replaceFlightById = async ( id, fN, dD, aD,dT,aT,dA,aA,nP,pL) => {
    try{
        let result = dateCompare(dD,aD);
        if(result == -1){
            console.log(`Valid dates`);
        }
        else if(result == 1){
            throw{status:400, message:`Cannot time travel`};
        }
        //if the dates are the same compare time
        else if (result == 0){
            if(timeCompare(dT, aT)){
                console.log(`valid times`);
            }
            else{
                throw{status:400, message:`Cannot time travel`};
            }
        }
        else{
            throw{status:400, message:`Impropper date format`};
        }
        // check for valid num of passenegers
        if(nP > pL){
            throw{status:400, message:`Impropper date format`};
        }

    } catch(err){
        console.log(err);
        throw{status:400, message:err};
    }
    try {

            // Will probably change to Flight.replaceOne()
            await Flight.updateOne({_id: id}, {$set: {flightNumber: fN}});
            await Flight.updateOne({_id: id}, {$set: {departureDate: dD}});
            await Flight.updateOne({_id: id}, {$set: {arrivalDate: aD}});
            await Flight.updateOne({_id: id}, {$set: {departureTime: dT}});
            await Flight.updateOne({_id: id}, {$set: {arrivalTime: aT}});
            await Flight.updateOne({_id: id}, {$set: {departureAirport: dA}});
            await Flight.updateOne({_id: id}, {$set: {arrivalAirport: aA}});
            await Flight.updateOne({_id: id}, {$set: {numPassengers: nP}});
            await Flight.updateOne({_id: id}, {$set: {passengerLimit: pL}});

        }
        catch (err) {
            console.log(err);
            throw{status:400, message:err};
        }    
};

module.exports = {createFlight, findAllFlights, findFlightByIdOrFlightId, removeFlightByMongoId, replaceFlightById};