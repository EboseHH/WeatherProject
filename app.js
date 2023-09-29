// import dependencies
require("dotenv").config();
const { query } = require("express");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

// return index.ejs on loading homepage
app.get("/", function (req, res) {
  res.render("pages/index");
});

// using async function to wait for an operation to complete
app.post("/", async function (req, res) {
  // get user's input using body parser.
  const query1 = req.body.cityName1;
  const query2 = req.body.cityName2;
  // declare api key
  const apiKey = process.env.OPEN_WEATHER_API_KEY;
  // url is the api endpoint which gives us access to the openweather data
  const url =
    "https://api.openweathermap.org/data/2.5/weather?appid=" +
    apiKey +
    "&units=metric&q=";
  // await says wait for the operation, fetch returns the data that corresponds with the city name inputed by the user
  const response1 = await fetch(url + query1);
  // convert repsonse to javascript object using await because this happens asynchronously
  const data1 = await response1.json();
  // repeat for second input
  const response2 = await fetch(url + query2);
  const data2 = await response2.json();

  const cities = [
    {
      name: data1.name,
      temperature: data1.main.temp,
      description: data1.weather[0].description,
      icon: data1.weather[0].icon,
    },
    {
      name: data2.name,
      temperature: data2.main.temp,
      description: data2.weather[0].description,
      icon: data2.weather[0].icon,
    },
  ];

  res.render("pages/results", {
    cities: cities,
  });
});

app.listen(3000, function () {
  console.log("server is running on port 3000");
});
