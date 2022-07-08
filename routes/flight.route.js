const router = require('express').Router();

const {createFlight, findAllFlights,findFlightByIdOrFlightId, removeFlightByMongoId, replaceFlightById} = require('../controllers/flight.controller');

router.get('/', async (req,res) => {
    const flights = await findAllFlights();
    res.json(flights);
});

router.post('/', async (req,res) => {
    try {
        const flightId = await createFlight(req.body);
        console.log("made it here");
        res.status(201).json({_id: flightId});
    } catch (err){
        res.status(err?.status || 500).json(err);
    }
});

router.delete('/:id', async(req, res) =>{
    try{
        console.log(`removing ${req.params.id}`);
        removeFlightByMongoId(req.params.id);
        console.log(`${req.params.id} Removed`);
        res.status(200);
    } catch (err){
        console.log(err);
        res.status(400);
    }
});

router.put('/:id', async(req,res) =>{
    try{
        console.log(`replacing ${req.params.id}`);
        replaceFlightById(req.params.id, req.body.flightNumber, req.body.departureDate, req.body.arrivalDate, req.body.departureTime, req.body.arrivalTime, req.body.departureAirport, req.body.arrivalAirport, req.body.numPassengers, req.body.passengerLimit);
        res.status(200);
    } catch (err){
        console.log(err);
    }
});

router.get('/:id', async (req, res) => {
        try{
            console.log(`starting to fetch ${req.params.id}`);
            const flight = await findFlightByIdOrFlightId(req.params.id);
            res.json(flight);
        }
        catch (err) {
            console.log(`did not find flight ID`);
            res.status(err?.status || 400).json(err);
        }
});

module.exports = router;