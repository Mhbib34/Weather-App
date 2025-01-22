const formSearch = document.querySelector(".search-form");
const button = document.querySelector("#submit-button");
const cards = document.querySelector(".weather");
const image = document.querySelector(".image");
const cardsContainer = document.querySelector(".cards-container");

const getFetch = async () => {
  const apiKey = "12f00b544886203c1caa2287ca5df369";
  const city = formSearch.value;

  if (city == "") return;
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
    );
    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }
    const data = await response.json();
    cards.innerHTML = card(data);

    const cloudInfo = document.querySelector(".cloud-info");
    const weatherDetail = document.querySelector(".weather-detail");

    cloudInfo.classList.add("animate");
    weatherDetail.classList.add("animate");
    cardsContainer.classList.add("animate-expand");

    setTimeout(() => {
      cloudInfo.classList.remove("animate");
      weatherDetail.classList.remove("animate");
    }, 800);
  } catch (error) {
    cardsContainer.classList.add("animate-expand");
    cards.innerHTML = `<img src="img/404.png" alt="" class="not-found-pic" />`;
    console.error("Failed to fetch weather data:", error.message);
  }
};

button.addEventListener("click", (e) => {
  e.preventDefault();
  getFetch();
});
formSearch.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    getFetch();
  }
});

function card(data) {
  return `  <div class="cloud-info">
              <img src="img/${data.weather[0].main}.png" alt="" class="image" />
              <p class="temperature">${Math.ceil(
                data.main.temp
              )}<span>°C</span></p>
              <p class="description">${data.weather[0].description}</p>
            </div>
            <div class="weather-detail">
              <div class="humidity">
                <i class="bx bx-water"></i> 
                <div class="text">
                  <div class="info-humidity">
                    <span>${data.main.humidity}%</span>
                  </div>
                  <p>Humidity</p>
                </div>
              </div>
              <div class="wind">
                <i class="bx bx-wind"></i>
                <div class="text">
                  <div class="info-wind">
                    <span>${data.wind.speed}Km/h</span>
                  </div>
                  <p>Wind Speed</p>
                </div>
              </div>
            </div>`;
}
