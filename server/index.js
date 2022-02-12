const express = require("express")
const app = express()
const data = require("./data/index.json")

const port = process.env.PORT || 8000;

// generate random number
const genRandom = (min, max) => {
    return Math.floor(Math.random() * max) + min;
}
const randomCo2 = () => {
    return genRandom(400, 3500);
};

// console.log(data[0].sensorDetails[0].CO2)

//Routes
app.get("/data", (req, res) => {
    const newData = [];
    var i = 0;
    for (const key of data) {
        // Update CO2 value with timestamp
        data[i].sensorDetails.forEach(item => {
            const newCo2 = randomCo2();
            const newTime = new Date().getTime();
            item.CO2 = newCo2;
            item.timestamp = newTime;
            newData.push(newCo2);
        });
        i++;
    }
    res.send(data)
})

//Server listening port
app.listen(port, (req, res) => {
    console.log(`Server Listening on port ${port}`)
})