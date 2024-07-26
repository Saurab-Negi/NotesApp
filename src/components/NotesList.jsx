import Note from './Note';
import AddNote from './AddNote';

const NotesList = ({
	notes,
	handleAddNote,
	handleDeleteNote,
	handleUpdateNote,
	editNoteId,
	setEditNoteId,
	currentPage,
	notesPerPage,
	totalNotes,
	handlePageChange,
}) => {
	const pageNumbers = [];
	for (let i = 1; i <= Math.ceil(totalNotes / notesPerPage); i++) {
		pageNumbers.push(i);
	}

	return (
		<div className='notes-list'>
			
			<div className="note-items">
				{/* AddNote component first */}
				<AddNote handleAddNote={handleAddNote} />

				{/* Render notes after AddNote */}
				{notes.map((note) => (
					<Note
						key={note.id}
						id={note.id}
						text={note.text}
						date={note.date}
						handleDeleteNote={handleDeleteNote}
						handleUpdateNote={handleUpdateNote}
						isEditing={editNoteId === note.id}
						setEditNoteId={setEditNoteId}
					/>
				))}
			</div>

			{/* Pagination Controls */}
			<div className='pagination'>
				{pageNumbers.map((number) => (
					<button
						key={number}
						onClick={() => handlePageChange(number)}
						className={number === currentPage ? 'active' : ''}
					>
						{number}
					</button>
				))}
			</div>
			
		</div>
	);
};

export default NotesList;
