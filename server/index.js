const express = require("express")
const app = express()
const cors = require("cors")
const data = require('./data/index.json');

let port = process.env.PORT || 8000;

//Middlewire for cors policy
app.use(cors())
// generating random values between 400 and 3500
const genRandom = (min, max) => {
    return Math.floor(Math.random() * max) + min;
}
const randomCo2 = () => {
    return genRandom(400, 3500);
};
//Default route
app.get("/", (req, res) => {
    res.send("Welcome to the Server")
})
//Routes
app.get("/data", (req, res) => {
    var newData = []
    for (const key of data) {
        // Update CO2 value with timestamp
        // var item = data[arr[key]];
        key.co2 = randomCo2();
        key.timestamp = new Date().getTime();
        newData.push(key);
    }
    res.send((newData));
});

app.listen(port => { });