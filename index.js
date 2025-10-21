//Body element
const body = document.body;

//------Footer------
let footer = document.createElement("footer");
body.appendChild(footer);

const today = new Date();
const thisYear = today.getFullYear();
footer = document.querySelector("footer");

const copyright = document.createElement("p");
copyright.innerHTML = `\u00A9 Periwinkle ${thisYear}`;
footer.appendChild(copyright);
footer.style.textAlign = "center";

//-------- main logic --------------
const output = document.getElementById("output");
const tempBtn = document.getElementById("tempBtn");
const windBtn = document.getElementById("windBtn");
const cityInput = document.getElementById("cityInput");

const baseURL = "https://api.open-meteo.com/v1/forecast";
const geoURL = "https://geocoding-api.open-meteo.com/v1/search";

//------------ Location section--------
async function getCoordinates(city) {
  const response = await fetch(
    `${geoURL}?name=${encodeURIComponent(city)}&count=1`
  );
  if (!response.ok) throw new Error("Error fetching city coordinates.");
  const data = await response.json();
  if (!data.results || data.results.length === 0)
    throw new Error("City not found.");
  const { latitude, longitude, name, country } = data.results[0];
  return { latitude, longitude, name, country };
}

//-------- weather section -----------
//fetch temperature
async function getTemperature() {
  const city = cityInput.value.trim() || "Chicago";
  try {
    const { latitude, longitude, name, country } = await getCoordinates(city);
    const tempURL = `${baseURL}?latitude=${latitude}&longitude=${longitude}&current=temperature_2m&temperature_unit=fahrenheit`;
    const response = await fetch(tempURL);
    if (!response.ok) throw new Error("Failed to fetch temperature data.");
    const data = await response.json();
    const temp = data.current.temperature_2m;
    output.innerHTML = `
      <h3>Current Temperature</h3>
      <p>${temp} °F</p>
      <p><strong>Location:</strong> ${name}, ${country}</p>
    `;
  } catch (error) {
    output.innerHTML = `<p>${error.message}</p>`;
  }
}

//fetch wind speed
async function getWind() {
  const city = cityInput.value.trim() || "Chicago";
  try {
    const { latitude, longitude, name, country } = await getCoordinates(city);
    const windURL = `${baseURL}?latitude=${latitude}&longitude=${longitude}&current=wind_speed_10m`;
    const response = await fetch(windURL);
    if (!response.ok) throw new Error("Failed to fetch wind data.");
    const data = await response.json();
    const wind = data.current.wind_speed_10m;
    output.innerHTML = `
      <h3>Current Wind Speed</h3>
      <p>${wind} mph</p>
      <p><strong>Location:</strong> ${name}, ${country}</p>
    `;
  } catch (error) {
    output.innerHTML = `<p>${error.message}</p>`;
  }
}

//---------------- Event listeners ------------
tempBtn.addEventListener("click", getTemperature);
windBtn.addEventListener("click", getWind);
