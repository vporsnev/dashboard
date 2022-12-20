import React, { useState, useEffect } from "react";
import "./Clock.css";

function Clock() {
	const [dateState, setDateState] = useState(new Date());
	useEffect(() => {
		setInterval(() => setDateState(new Date()), 6000);
	}, []);
	return (
		<div className="clock">
			<span>
				It's{" "}
				{dateState.toLocaleDateString("en-EU", {
					weekday: "long",
					day: "numeric",
					month: "short",
					year: "numeric",
				})}
			</span>
			<span>
				{" "}
				{dateState.toLocaleString("en-GB", {
					hour: "numeric",
					minute: "numeric",
				})}
			</span>
		</div>
	);
}

export default Clock;
