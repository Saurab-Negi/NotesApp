import { useState } from 'react';
import { MdDeleteForever, MdEdit } from 'react-icons/md';

const Note = ({ id, text, date, handleDeleteNote, handleUpdateNote, isEditing, setEditNoteId }) => {
	const [editText, setEditText] = useState(text);

	const handleSaveClick = () => {
		if (editText.trim()) {
			handleUpdateNote(id, editText);
		}
	};

	return (
		<div className='note'>
			{isEditing ? (
				<>
					<textarea
						rows='8'
						cols='10'
						value={editText}
						onChange={(e) => setEditText(e.target.value)}
					/>
					<button onClick={handleSaveClick}>save</button>
				</>
			) : (
				<span>{text}</span>
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
