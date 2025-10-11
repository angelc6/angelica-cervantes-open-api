//Body element
const body = document.body;

//------Footer------

//create footer element
let footer = document.createElement("footer");
//append footer to body
body.appendChild(footer);

// create a new date object
const today = new Date();
//get current year
const thisYear = today.getFullYear();
//get the current footer element
footer = document.querySelector("footer");
//create new <p> element
const copyright = document.createElement("p");
//set the inner html with copyright symbol, name, and year
copyright.innerHTML = `\u00A9 Periwinkle ${thisYear}`;
//append <p> to the footer
footer.appendChild(copyright);
//center footer
footer.style.textAlign = "center";

//-------- weather section -----------
const temperature_unit = "fahrenheit";
const apiURL =
  "https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m&temperature_unit=fahrenheit";
// site = https://api.open-meteo.com
//endpoint = v1/forecast
// ? = everything after is a parameter

fetch(apiURL)
  .then((response) => {
    if (!response.ok) {
      throw new Error("Failed to fetch weather data. Please try again later.");
    }
    return response.json(); //parse JSON
  })
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.error("Error fetching forecast", error);
  });
