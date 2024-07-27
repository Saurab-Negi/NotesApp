import { useState } from 'react';
import { MdDeleteForever, MdEdit } from 'react-icons/md';

const Note = ({ id, title = '', text = '', date, handleDeleteNote, handleUpdateNote, isEditing, setEditNoteId }) => {
	const [editText, setEditText] = useState(text);
	const [editTitle, setEditTitle] = useState(title);

	const handleSaveClick = () => {
		if (editText.trim() && editTitle.trim()) {
			handleUpdateNote(id, editTitle, editText);
		}
	};

	return (
		<div className='note'>
			{isEditing ? (
				<div className='note-top'>
					<input
						type='text'
						placeholder='Title'
						value={editTitle}
						onChange={(e) => setEditTitle(e.target.value)}
					/>
					<textarea
						rows='8'
						cols='6'
						placeholder='Note...'
						value={editText}
						onChange={(e) => setEditText(e.target.value)}
					/>
					<button className='save' style={{marginBottom: 10, width: 50}} onClick={handleSaveClick}>save</button>
				</div>
			) : (
				<div className='note-top'>
					<h3>{title}</h3>
					<p>{text}</p>
				</div>
			)}
			<div className='note-footer'>
				<small>{date}</small>
				<div className="edit-delete-icon">
				{!isEditing && (
					<>
						<MdEdit
							onClick={() => setEditNoteId(id)}
							className='edit-icon'
							size='1.3em'
						/>
						<MdDeleteForever
							onClick={() => handleDeleteNote(id)}
							className='delete-icon'
							size='1.3em'
						/>
					</>
				)}
				</div>
			</div>
		</div>
	);
};

export default Note;
