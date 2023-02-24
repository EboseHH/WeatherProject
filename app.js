const { query } = require("express");
const express = require("express");
const { STATUS_CODES } = require("http");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");

  app.post("/", function (req, res) {
    const query = req.body.cityName
    const apiKey = "";
    const url =
      "https://api.openweathermap.org/data/2.5/weather?appid=" +
      apiKey +
      "&units=metric&q=" +
      query;
    https.get(url, function (response) {
      console.log(response.statusCode);

      response.on("data", function (data) {
        const weatherData = JSON.parse(data);
        const temp = weatherData.main.temp;
        const weatherDescription = weatherData.weather[0].description;
        const icon = weatherData.weather[0].icon;

        res.write("<p>The weather is currently " + weatherDescription + "</p>");
        res.write(
          "<h1>The temperature in " + query + " is "  + temp + " degree celsius</h1>"
        );
        res.send();
      });
    });
  });
});

app.listen(3000, function () {
  console.log("server is running on port 3000");
});
