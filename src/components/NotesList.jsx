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

			{/* Pagination Controls */}
			<div className='pagination'>
				<button
					onClick={() => handlePageChange(currentPage - 1)}
					disabled={currentPage === 1}
				>
					Previous
				</button>
				{pageNumbers.map((number) => (
					<button
						key={number}
						onClick={() => handlePageChange(number)}
						className={number === currentPage ? 'active' : ''}
					>
						{number}
					</button>
				))}
				<button
					onClick={() => handlePageChange(currentPage + 1)}
					disabled={currentPage === pageNumbers.length}
				>
					Next
				</button>
			</div>
		</div>
	);
};

export default NotesList;
