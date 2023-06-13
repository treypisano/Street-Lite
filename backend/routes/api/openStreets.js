const express = require('express');
const router = express.Router();
require('../../models/Event')
const mongoose = require('mongoose');
const { format } = require('morgan');
const Event = mongoose.model('Event')
const proj4 = require('proj4');

function formatGeocode (geoCode) {
    // geocode is an array from the api
    // console.log(geoCode)
    // Define the New York State Plane Coordinate System for Long Island 3104 (NAD83)
    proj4.defs('EPSG:3104', '+proj=lcc +lat_1=40.66666666666666 +lat_2=41.03333333333333 +lat_0=40.16666666666666 +lon_0=-74 +x_0=300000.0000000001 +y_0=0 +datum=NAD83 +units=us-ft +no_defs');
    
    // Define the input coordinates in the New York State Plane Coordinate System (Long Island 3104)
    const inputCoordinates = [geoCode[0], geoCode[1]];
    
    // Convert the coordinates to latitude and longitude (WGS84)
    const outputCoordinates = proj4('EPSG:3104', 'EPSG:4326', inputCoordinates);
    
    // Extract the latitude and longitude values
    const latitude = outputCoordinates[0];
    const longitude = outputCoordinates[1];
    
    return ([longitude, latitude])
}

router.post('/' , async (req, res, next) => {
    let data = req.body

    for(let i = 0; i < data.length; i++ ) {
        const currentEvent = data[i]
        const coordinates = formatGeocode(currentEvent.the_geom.coordinates[0][0]) 
        
        const newCurrentEvent = new Event({
            dates: currentEvent.apprdayswe,
            location: {
                startStreet: currentEvent.apprfromst,
                endStreet: currentEvent.apprtostre,
                mainStreet: currentEvent.appronstre,
                latitude: coordinates[0],
                longitude: coordinates[1]
            }
        })

        await newCurrentEvent.save()
    }
})

router.post('/all', async (req, res, next) => {
    const allEvents = await Event.find()

    res.send(allEvents)  
})

module.exports = router