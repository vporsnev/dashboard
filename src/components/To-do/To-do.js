import { useEffect, useState } from "react";
import "./To-do.css";

export default function ToDo() {
	const [tasks, setTasks] = useState(() => {
		const savedTasks = localStorage.getItem("tasks");
		if (savedTasks) {
			return JSON.parse(savedTasks);
		} else {
			return [];
		}
	});

	const [task, setTask] = useState("");

	useEffect(() => {
		localStorage.setItem("tasks", JSON.stringify(tasks));
	}, [tasks]);

	function handleInputChange(e) {
		setTask(e.target.value);
	}

	function handleDeleteClick(id) {
		const removeItem = tasks.filter((task) => {
			return task.id !== id;
		});
		setTasks(removeItem);
	}

	function handleFormSubmit(e) {
		e.preventDefault();
		if (task !== "") {
			setTasks([
				...tasks,
				{
					id: tasks.length + 1,
					text: task.trim(),
				},
			]);
			setTask("");
		}
	}

	function handleTaskClick(id) {
		const taskIndex = tasks.findIndex((task) => task.id === id);
		let newTasks = [...tasks];
		newTasks[taskIndex].isCompleted = !newTasks[taskIndex].isCompleted;
		setTasks(newTasks);
	}

	return (
		<div className="to-do">
			<h3>To do list</h3>
			<form onSubmit={handleFormSubmit} className="new-task">
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
			<ul className="task-list">
				{tasks.map((task) => (
					<li
						key={task.id}
						style={{
							textDecoration: task.isCompleted ? "line-through" : "none",
						}}
						onClick={() => handleTaskClick(task.id)}
					>
						{task.text}
						<button
							className="del-btn"
							onClick={(e) => {
								e.stopPropagation();
								handleDeleteClick(task.id);
							}}
						>
							<i className="fa fa-trash"></i>
						</button>
					</li>
				))}
			</ul>
		</div>
	);
}
