#!/usr/bin/env node
const moment = require('moment-timezone');
let timezone = moment.tz.guess()
const minimist = require("minimist");
const args = minimist(process.argv.slice(2))
if('h' in args){
    console.log(`
        Usage: galosh.js [options] -[n|s] LATITUDE -[e|w] LONGITUDE -z TIME_ZONE
            -h            Show this help message and exit.
            -n, -s        Latitude: N positive; S negative.
            -e, -w        Longitude: E positive; W negative.
            -z            Time zone: uses tz.guess() from moment-timezone by default.
            -d 0-6        Day to retrieve weather: 0 is today; defaults to 1.
            -j            Echo pretty JSON from open-meteo API and exit.`);
    process.exit(0);
}
let long;
let lat;

if('n' in args) {
    lat = args["n"];
}else if('s' in args) {
    lat = -args["s"];
}

if('e' in args) {
    long = args["e"];
}else if('w' in args) {
    long = -args["w"];
}
if(!long || !lat){
    console.log("ur missing somthing")
    process.exit(0)
}
if('t' in args){
    timezone  =  args['t'];
}
if('j' in args) {
    console.log(data);
    process.exit(0);
}
if(lat == undefined || Math.abs(lat) > 90) {
    process.exit(1);
}
if(long == undefined || Math.abs(long) > 180) {
    process.exit(1);
}
async function fet(){
const response = await fetch("https://api.open-meteo.com/v1/forecast?latitude="+lat+"&longitude="+long+"&daily=precipitation_hours&current_weather=true&timezone="+timezone)
const data = await response.json();
if (args['d'] == 0) {
    console.log("It will rain at "+lat +", "+long+" for "+ data["daily"]["precipitation_hours"][0]+" hours today.\n");
} else if (args['d'] > 1) {
    console.log("It will rain at "+lat+", "+long+" for "+data["daily"]["precipitation_hours"][0]+" hours in "+days+" days.\n");
} else {
    console.log("It will rain at "+lat+", "+long +" for "+data["daily"]["precipitation_hours"][0]+" hours tomorrow.\n");
}
}
fet();
