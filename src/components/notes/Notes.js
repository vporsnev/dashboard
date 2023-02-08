import React, { useState, useEffect } from "react";
import "./Notes.css";

export default function Note() {
	const [notes, setNotes] = useState(() => {
		const savedNotes = localStorage.getItem("notes");
		if (savedNotes) {
			return JSON.parse(savedNotes);
		} else {
			return [];
		}
	});

	const [note, setNote] = useState("");

	useEffect(() => {
		localStorage.setItem("notes", JSON.stringify(notes));
	}, [notes]);

	function handleInputChange(e) {
		setNote(e.target.value);
	}

	function handleDeleteClick(id) {
		const removeNote = notes.filter((note) => {
			return note.id !== id;
		});
		setNotes(removeNote);
	}

	function handleFormSubmit(e) {
		e.preventDefault();
		if (note !== "" && notes.length < 5) {
			setNotes([
				...notes,
				{
					id: notes.length + 1,
					text: note.trim(),
				},
			]);
			setNote("");
		}
	}

	const handleNoteEdit = (id, e) => {
		const noteIndex = notes.findIndex((note) => note.id === id);
		let newNotes = [...notes];
		newNotes[noteIndex].text = e.target.value;
		setNotes(newNotes);
	};

	return (
		<div className="box notes">
			<div className="box-title">
				<h3>Notes</h3>
			</div>
			<form onSubmit={handleFormSubmit} className="new-note">
				<input
					name="note"
					type="text"
					className="note-input"
					placeholder="Create a new note"
					value={note}
					onChange={handleInputChange}
				/>
				<button onClick={handleFormSubmit} className="add-btn">
					+
				</button>
			</form>
			<div className="note-list">
				{notes.map((note) => (
					<div className="notes-list" key={note.id}>
						<textarea
							name="note"
							type="text"
							className="sub-notes"
							placeholder="Edit note"
							value={note.text}
							onChange={(e) => handleNoteEdit(note.id, e)}
						></textarea>
						<button
							className="del-btn"
							onClick={() => handleDeleteClick(note.id)}
						>
							<i className="fa fa-trash"></i>
						</button>
					</div>
				))}
			</div>
		</div>
	);
}
