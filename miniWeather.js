let celsiusTemperature = null;

        function displayTemperature(response) {
            celsiusTemperature = Math.round(response.data.temperature.current);
            document.querySelector("#current-temperature").innerHTML = `${celsiusTemperature}°C`;
            document.querySelector("#current-city").innerHTML = `<span class="location-icon">📍</span> ${response.data.city}`;
            document.querySelector("#description").innerHTML = response.data.condition.description;

            document.querySelector("#humidity").innerHTML = `${response.data.temperature.humidity}%`;
            document.querySelector("#wind-speed").innerHTML = `${response.data.wind.speed} km/h`;
            document.querySelector("#uv-index").innerHTML = response.data.uv_index;
            document.querySelector("#sunrise-sunset").innerHTML = `Sunrise: ${response.data.sunrise}, Sunset: ${response.data.sunset}`;
            
             celsiusTemperature = Math.round(response.data.temperature.current);
            const temperatureElement = document.querySelector("#current-temperature");
            const cityElement = document.querySelector("#current-city");
            const descriptionElement = document.querySelector("#description");
            const humidityElement = document.querySelector("#humidity");
            const iconElement = document.querySelector("#weather-icon");

            // Set weather data in the DOM
            temperatureElement.innerHTML = `${celsiusTemperature}°C`;
            cityElement.innerHTML = `<span class="location-icon">📍</span> ${response.data.city}`;
            descriptionElement.innerHTML = response.data.condition.description;
            humidityElement.innerHTML = `${response.data.temperature.humidity}%`;

            // Set icon based on weather condition
            iconElement.src = `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`;
            iconElement.alt = response.data.condition.description;
            
           
           
            

            const now = new Date(response.data.time * 1000);
            document.querySelector("#current-date").innerHTML = formatDate(now);
        }

        function search(event) {
            event.preventDefault();
            let city = document.querySelector("#search-input").value;
            let apiKey = "fcdct849484e9bbad2411do67437021d";
            let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
            axios.get(apiUrl).then(displayTemperature);
        }

        function formatDate(date) {
            let minutes = date.getMinutes();
            let hours = date.getHours();
            let day = date.getDay();

            if (minutes < 10) {
                minutes = `0${minutes}`;
            }

            if (hours < 10) {
                hours = `0${hours}`;
            }

            let days = [
                "Sunday",
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
            ];

            let formattedDay = days[day];
            return `${formattedDay} ${hours}:${minutes}`;
        }

        let searchForm = document.querySelector("#search-form");
        searchForm.addEventListener("submit", search);

        let currentDateELement = document.querySelector("#current-date");
        let currentDate = new Date();

        currentDateELement.innerHTML = formatDate(currentDate);



        function convertTemperature() {
            const temperatureElement = document.querySelector("#current-temperature");
            const toggleButton = document.querySelector("#toggle-units");
            if (toggleButton.innerHTML === "Convert to °F") {
                let fahrenheitTemperature = Math.round((celsiusTemperature * 9) / 5 + 32);
                temperatureElement.innerHTML = `${fahrenheitTemperature}°F`;
                toggleButton.innerHTML = "Convert to °C";
            } else {
                temperatureElement.innerHTML = `${celsiusTemperature}°C`;
                toggleButton.innerHTML = "Convert to °F";
            }
        }

        document.querySelector("#search-form").addEventListener("submit", search);
        document.querySelector("#toggle-units").addEventListener("click", convertTemperature);