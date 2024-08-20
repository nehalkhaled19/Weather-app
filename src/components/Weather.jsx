import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import moment from 'moment'; // تأكد من أنك قد قمت بتثبيت moment

export default function Weather() {
  const { cityName } = useParams();
  const [weatherData, setWeatherData] = useState(null);

  // Fetch data from API
  async function getData(city = 'cairo') {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=82434d8ba23b7825d039ab149324b912&units=metric`);
    const data = await response.json();
    console.log(data);
    if (data.cod === 200) {
      setWeatherData(data);
    }
  }

  useEffect(() => {
    getData(cityName);
  }, [cityName]);

  return (
    <div className="  md:m-28 md:px-4 py-8">
      {weatherData ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* First Section */}
          <div className="bg-blue-100 p-6 rounded-lg shadow-lg text-center">
            <h3 className="text-2xl font-semibold border-b-2 border-gray-200 pb-3">
              {weatherData.name}, {weatherData.sys?.country}
            </h3>
            <div className="py-4">
              <img
                src={`https://openweathermap.org/img/wn/${weatherData?.weather[0].icon}@4x.png`}
                alt="weather-icon"
                className="w-20 mx-auto"
              />
              <h3 className="text-xl font-medium">{weatherData?.weather[0].main}</h3>
              <h4 className="text-lg">{weatherData?.weather[0].description}</h4>
              <h5 className="text-lg">Temp: {weatherData?.main.temp}°C</h5>
              <div className="flex justify-between mt-3">
                <div>
                  <h4 className="text-md font-medium text-blue-600 flex items-center">
                    <i className="fas fa-temperature-high mr-2"></i> Max Temp
                  </h4>
                  <h6>{weatherData?.main.temp_max}°C</h6>
                </div>
                <div>
                  <h4 className="text-md font-medium text-blue-600 flex items-center">
                    <i className="fas fa-temperature-low mr-2"></i> Min Temp
                  </h4>
                  <h6>{weatherData?.main.temp_min}°C</h6>
                </div>
              </div>
            </div>
          </div>
          {/* Second Section */}
          <div className="bg-blue-100 p-6 rounded-lg shadow-lg">
            <div className="mb-4">
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-md font-medium text-blue-600 flex items-center">
                  <i className="fas fa-sun mr-2"></i> Sunset
                </h4>
                <h6>
                  {moment
                    .utc(weatherData?.sys.sunset, 'X')
                    .add(weatherData?.timezone, 'seconds')
                    .format('HH:mm a')}
                </h6>
              </div>
              <div className="flex">
                <div className="bg-blue-200 p-4 rounded-lg w-1/2 text-center mx-2">
                  <h4 className="text-md font-medium text-blue-600 flex items-center">
                    <i className="fas fa-thermometer-half mr-2"></i> Real Feel
                  </h4>
                  <h6>{weatherData?.main.feels_like}°C</h6>
                </div>
                <div className="bg-blue-200 p-4 rounded-lg w-1/2 text-center mx-2">
                  <h4 className="text-md font-medium text-blue-600 flex items-center">
                    <i className="fas fa-tint mr-2"></i> Humidity
                  </h4>
                  <h6>{weatherData?.main.humidity}%</h6>
                </div>
              </div>
              <div className="flex mt-4">
                <div className="bg-blue-200 p-4 rounded-lg w-1/2 text-center mx-2">
                  <h4 className="text-md font-medium text-blue-600 flex items-center">
                    <i className="fas fa-wind mr-2"></i> Wind Speed
                  </h4>
                  <h6 className="font-bold">{weatherData?.wind.speed} m/s</h6>
                </div>
                <div className="bg-blue-200 p-4 rounded-lg w-1/2 text-center mx-2">
                  <h4 className="text-md font-medium text-blue-600 flex items-center">
                    <i className="fas fa-compass mr-2"></i> Wind Direction
                  </h4>
                  <h6>{weatherData?.wind.deg}°</h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
