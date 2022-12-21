import React, { useState, useEffect } from "react";
import "./App.css";

import Weather from "./components/weather/Weather";
import News from "./components/news/News";
import Clock from "./components/clock/Clock";
import ToDo from "./components/To-do/To-do";
import Notes from "./components/notes/Notes";

export default function App() {
	const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
	const toggleTheme = () => {
		if (theme === "light") {
			setTheme("dark");
		} else {
			setTheme("light");
		}
	};
	useEffect(() => {
		localStorage.setItem("theme", theme);
		document.body.className = theme;
	}, [theme]);

	return (
		<main className={`App ${theme}`}>
			<div className="top">
				<h1 className="hello">Hello!</h1>
				<label className="toggle">
					<input className="toggle-checkbox" type="checkbox"></input>
					<div className="toggle-switch" onClick={toggleTheme}></div>
				</label>
			</div>
			<div className="second">
				<Clock />
				<Weather />
			</div>
			<div className="third">
				<News />
				<ToDo />
				<Notes />
			</div>
		</main>
	);
}
