// don't forget to import useEffect from react
import { useEffect, useState } from "react";
import "./To-do.css";

export default function App() {
	const [tasks, setTasks] = useState(() => {
		// get the todos from localstorage
		const savedTasks = localStorage.getItem("tasks");
		if (savedTasks) {
			return JSON.parse(savedTasks);
		} else {
			return [];
		}
	});

	const [task, setTask] = useState("");

	// useEffect to run once the component mounts
	useEffect(() => {
		// localstorage only support storing strings as keys and values
		// - therfore we cannot store arrays and objects without converting the object
		// into a string first. JSON.stringify will convert the object into a JSON string
		// reference: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify
		localStorage.setItem("tasks", JSON.stringify(tasks));
		// add the todos as a dependancy because we want to update the
		// localstorage anytime the todos state changes
	}, [tasks]);

	// function to get the value of the input and set the new state
	function handleInputChange(e) {
		// set the new state value to what's currently in the input box
		setTask(e.target.value);
	}

	// function to create a new object on form submit
	function handleFormSubmit(e) {
		// prevent the browser default behavior or refreshing the page on submit
		e.preventDefault();

		// don't submit if the input is an empty string
		if (task !== "") {
			// set the new todos state (the array)
			setTasks([
				// copy the current values in state
				...tasks,
				{
					// setting a basic id to identify the object
					id: tasks.length + 1,
					// set a text property to the value of the todo state and
					// trim the whitespace from the input
					text: task.trim(),
				},
			]);
		}

		// clear out the input box
		setTask("");
	}

	return (
		<div className="to-do">
			<h3>To do list</h3>
			{/* create a form element and pass the handleFormSubmit function 
      to the form using the onSubmit prop */}
			<form onSubmit={handleFormSubmit} className="new-task">
				{/* create an input element - make sure to add the value prop 
        with the state value passed in and the onChange prop to update
        the state every time something is typed in the input */}
				<input
					name="task"
					type="text"
					placeholder="Create a new task"
					value={task}
					onChange={handleInputChange}
				/>
				<button onClick={handleFormSubmit} className="add-btn">
					+
				</button>
			</form>

			{/* create a ul to hold all of the list items */}
			<ul className="task-list">
				{/* map over the todos array which creates a new li element for every todo
        (make sure to add the "key" prop using the unique todo.id value to the li element)
        remember this is an array of objects - so we need to access the property 
        "text" to get the value we want to display */}
				{tasks.map((task) => (
					<li key={task.id}>{task.text}</li>
				))}
			</ul>
		</div>
	);
}
