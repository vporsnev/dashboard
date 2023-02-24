import React, { useEffect, useState } from "react";
import "./Weather.css";
import axios from "axios";
import { WEATHER_API_URL, WEATHER_API_KEY } from "../../Api";

export default function Weather() {
	const [lat, setLat] = useState([]);
	const [long, setLong] = useState([]);
	const [data, setData] = useState([]);

	navigator.geolocation.getCurrentPosition((position) => {
		setLat(position.coords.latitude);
		setLong(position.coords.longitude);
	});

	useEffect(() => {
		const fetchData = async () => {
			navigator.geolocation.getCurrentPosition(function (position) {
				setLat(position.coords.latitude);
				setLong(position.coords.longitude);
			});

			const response = await axios.get(
				`${WEATHER_API_URL}/weather/?lat=${lat}&lon=${long}&units=metric&APPID=${WEATHER_API_KEY}`
			);
			console.log(response);
			setData(response.data);
		};
		fetchData();
	}, [lat, long]);

	return (
		<div className="box weather">
			<div className="intro">
				<span>The weather in </span>
				<span className="cityname">
					{data.name}
					{data.sys ? <span>, {data.sys.country}</span> : "Loading.."}
				</span>{" "}
				is
			</div>
			<div className="weather-display">
				<div className="col1">
					{data.main ? (
						<h1 className="temp">{data.main.temp.toFixed()} ℃</h1>
					) : null}
					{data.main ? (
						<p className="feelslike">
							Feels like {data.main.feels_like.toFixed()} ℃
						</p>
					) : null}
				</div>
				<div className="col2">
					{data.weather ? (
						<img
							className="icon"
							src={`https://openweathermap.org/img/wn/${data.weather[0].icon}.png`}
						/>
					) : null}
					{data.weather ? <p className="main">{data.weather[0].main}</p> : null}
				</div>
			</div>
		</div>
	);
}
