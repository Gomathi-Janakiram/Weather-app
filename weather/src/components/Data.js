import React, { useState, useEffect } from "react";

const Data = () => {
  const API_KEY = "859a4bb2d69285e417f177d4bfe71d78";
  const [searchterm, setSearchterm] = useState("");

  const [result, setResult] = useState({});

  const fetchData = (e) => {
    if (e.key == "Enter") {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${searchterm}&units=metric&APPID=${API_KEY}`
      )
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setResult(data);
          setSearchterm("");
          console.log(data);
        });
    }
  };

  // this function returns the present date,month and year
  const dateBuilder = (d) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let day = days[d.getDay()];

    let month = months[d.getMonth()];

    let date = d.getDate();

    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-3" />
        <div
          className={
            typeof result.main !== "undefined"
              ? result.main.temp > 17 //background image changes based on the temp
                ? "col-sm-6 text-center vh-100 bg-warm rounded"
                : "col-sm-6 text-center vh-100 bg-cold rounded"
              : "col-sm-6 text-center vh-100 bg-cold rounded"
          }
        >
          <input
            type="text"
            className="p-1 w-75 rounded-3 border-0 shadow-lg searchbar"
            placeholder="Search..."
            value={searchterm}
            onChange={(e) => setSearchterm(e.target.value)}
            onKeyPress={fetchData}
          />
          {typeof result.main !== "undefined" ? (
            <>
              <h1 className="mt-5 pt-5 text-white">
                {result.name},{result.sys.country}
              </h1>
              <div className="text-white">{dateBuilder(new Date())}</div>

              <div className="text-center mt-5">
                <span className="fs-1 px-5 py-4 shadow-lg transparent rounded-3 text-white fw-bolder">
                  {Math.round(result.main.temp)}°c
                </span>
              </div>
              <h4 className="mt-5 fs-1 text-white">{result.weather[0].main}</h4>
            </>
          ) : (
            ""
          )}
        </div>

        <div className="col-sm-3 " />
      </div>
    </div>
  );
};

export default Data;
