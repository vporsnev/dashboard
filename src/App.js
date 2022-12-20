import React from "react";
import "./App.css";

import Weather from "./components/weather/Weather";
import News from "./components/news/News";
import Clock from "./components/clock/Clock";
import ToDo from "./components/To-do/To-do";

function App() {
	return (
		<main>
			<h1 className="hello">Hello!</h1>
			<Clock />
			<Weather />
			<section>
				<div>
					<News />
				</div>
				<div>
					<ToDo />
				</div>
			</section>
		</main>
	);
}

export default App;
