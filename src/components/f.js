import React, { useEffect, useState } from "react";

function ToDo() {
	// Initialize the to-do lists as an empty array
	const [lists, setLists] = useState([]);

	// Function to add a new to-do list
	const addList = () => {
		// Prompt the user for a name for the new list
		const listName = prompt("Enter a name for the new to-do list:");

		// If the user entered a name, create a new list object and add it to the lists array
		if (listName) {
			setLists([...lists, { name: listName, items: [] }]);
		}
	};

	// Function to add a new to-do item to a list
	const addItem = (listIndex) => {
		// Prompt the user for the text of the new to-do item
		const itemText = prompt("Enter the text for the new to-do item:");

		// If the user entered text, add a new item object to the list's items array
		if (itemText) {
			const updatedList = [...lists];
			updatedList[listIndex].items = [
				...updatedList[listIndex].items,
				{ text: itemText, completed: false },
			];
			setLists(updatedList);
		}
	};

	// Function to mark a to-do item as completed
	const completeItem = (listIndex, itemIndex) => {
		const updatedList = [...lists];
		updatedList[listIndex].items[itemIndex].completed = true;
		setLists(updatedList);
	};

	// Function to remove a to-do item
	const removeItem = (listIndex, itemIndex) => {
		const updatedList = [...lists];
		updatedList[listIndex].items.splice(itemIndex, 1);
		setLists(updatedList);
	};

	// Function to remove a to-do list
	const removeList = (listIndex) => {
		const updatedLists = [...lists];
		updatedLists.splice(listIndex, 1);
		setLists(updatedLists);
	};

	useEffect(() => {
		const storedLists = localStorage.getItem("lists");
		if (storedLists) {
			setLists(JSON.parse(storedLists));
		}
	}, []);

	// Save the to-do lists to local storage when the component updates
	useEffect(() => {
		localStorage.setItem("lists", JSON.stringify(lists));
	}, [lists]);

	return (
		<div>
			<h1>To-Do Lists</h1>
			<button onClick={addList}>Add To-Do List</button>
			{lists.map((list, listIndex) => (
				<div key={listIndex}>
					<h2>{list.name}</h2>
					<button onClick={() => addItem(listIndex)}>Add To-Do Item</button>
					<button onClick={() => removeList(listIndex)}>
						Remove To-Do List
					</button>
					<ul>
						{list.items.map((item, itemIndex) => (
							<li key={itemIndex}>
								{item.text}
								{!item.completed && (
									<button onClick={() => completeItem(listIndex, itemIndex)}>
										Mark as Completed
									</button>
								)}
								<button onClick={() => removeItem(listIndex, itemIndex)}>
									Remove
								</button>
							</li>
						))}
					</ul>
				</div>
			))}
		</div>
	);
}

export default ToDo;
