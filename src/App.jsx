import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import NotesList from './components/NotesList';
import Search from './components/Search';
import Header from './components/Header';

const App = () => {
	const [notes, setNotes] = useState(() => {
		const savedNotes = localStorage.getItem('react-notes-app-data');
		if (savedNotes) {
			try {
				return JSON.parse(savedNotes);
			} catch {
				return [];
			}
		}
		return [];
	});

	const [searchText, setSearchText] = useState('');
	const [editNoteId, setEditNoteId] = useState(null);
	const [currentPage, setCurrentPage] = useState(1);
	const notesPerPage = 8;

	useEffect(() => {
		localStorage.setItem('react-notes-app-data', JSON.stringify(notes));
	}, [notes]);

	const addNote = (title, text) => {
		const date = new Date();
		const newNote = {
			id: nanoid(),
			title,
			text,
			date: date.toLocaleString(),
		};
		setNotes((prevNotes) => [newNote, ...prevNotes]);
		setCurrentPage(1);
	};

	const deleteNote = (id) => {
		setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
	};

	const updateNote = (id, newTitle, newText) => {
		const date = new Date();
		setNotes((prevNotes) =>
			prevNotes.map((note) =>
				note.id === id
					? { ...note, title: newTitle, text: newText, date: date.toLocaleString() }
					: note
			)
		);
		setEditNoteId(null);
	};

	const filteredNotes = notes.filter((note) =>
		note.text.toLowerCase().includes(searchText.toLowerCase()) ||
		note.title.toLowerCase().includes(searchText.toLowerCase())
	);

	const indexOfLastNote = currentPage * notesPerPage;
	const indexOfFirstNote = indexOfLastNote - notesPerPage;
	const currentNotes = filteredNotes.slice(indexOfFirstNote, indexOfLastNote);

	const handlePageChange = (pageNumber) => {
		setCurrentPage(pageNumber);
	};

	return (
		<div className='container'>
			<Header />
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
	);
};

export default App;
