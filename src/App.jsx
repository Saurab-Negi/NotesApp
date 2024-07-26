import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import NotesList from './components/NotesList';
import Search from './components/Search';
import Header from './components/Header';

const App = () => {
	const [notes, setNotes] = useState(() => {
		console.log("Retrieving notes from localStorage...");
		const savedNotes = localStorage.getItem('react-notes-app-data');
		if (savedNotes) {
			try {
				const parsedNotes = JSON.parse(savedNotes);
				console.log("Notes retrieved:", parsedNotes);
				return parsedNotes;
			} catch (error) {
				console.error("Failed to parse notes from localStorage:", error);
				return [];
			}
		}
		return [];
	});

	const [searchText, setSearchText] = useState('');
	const [darkMode, setDarkMode] = useState(false);
	const [editNoteId, setEditNoteId] = useState(null);
	const [currentPage, setCurrentPage] = useState(1);
	const notesPerPage = 5;

	useEffect(() => {
		console.log("Saving notes to localStorage:", notes);
		localStorage.setItem('react-notes-app-data', JSON.stringify(notes));
	}, [notes]);

	const addNote = (text) => {
		const date = new Date();
		const newNote = {
			id: nanoid(),
			text,
			date: date.toLocaleString(),
		};
		setNotes((prevNotes) => [newNote, ...prevNotes]); // Add new note at the start
		setCurrentPage(1); // Reset to first page
	};

	const deleteNote = (id) => {
		setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
	};

	const updateNote = (id, newText) => {
		setNotes((prevNotes) =>
			prevNotes.map((note) =>
				note.id === id ? { ...note, text: newText } : note
			)
		);
		setEditNoteId(null);
	};

	// Pagination Logic
	const indexOfLastNote = currentPage * notesPerPage;
	const indexOfFirstNote = indexOfLastNote - notesPerPage;
	const filteredNotes = notes.filter((note) =>
		note.text.toLowerCase().includes(searchText.toLowerCase())
	);
	const currentNotes = filteredNotes.slice(indexOfFirstNote, indexOfLastNote);

	const handlePageChange = (pageNumber) => {
		setCurrentPage(pageNumber);
	};

	return (
		<div className={`${darkMode && 'dark-mode'}`}>
			<div className='container'>
				<Header handleToggleDarkMode={setDarkMode} />
				<Search handleSearchNote={setSearchText} />
				<NotesList
					notes={currentNotes}
					handleAddNote={addNote}
					handleDeleteNote={deleteNote}
					handleUpdateNote={updateNote}
					editNoteId={editNoteId}
					setEditNoteId={setEditNoteId}
					currentPage={currentPage}
					notesPerPage={notesPerPage}
					totalNotes={filteredNotes.length}
					handlePageChange={handlePageChange}
				/>
			</div>
		</div>
	);
};

export default App;
