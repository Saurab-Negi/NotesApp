import { useState } from 'react';

const AddNote = ({ handleAddNote }) => {
	const [noteText, setNoteText] = useState('');
	const [noteTitle, setNoteTitle] = useState('');
	const characterLimit = 500;

	const handleChangeText = (event) => {
		if (characterLimit - event.target.value.length >= 0) {
			setNoteText(event.target.value);
		}
	};

	const handleChangeTitle = (event) => {
		setNoteTitle(event.target.value);
	};

	const handleSaveClick = () => {
		if (noteText.trim().length > 0) {
			handleAddNote(noteTitle, noteText);
			setNoteTitle('');
			setNoteText('');
		}
	};

	return (
		<div className='note new'>
			<input
				type='text'
				placeholder='Title'
				value={noteTitle}
				onChange={handleChangeTitle}
				style={{marginBottom: 10}}
			/>
			<textarea
				rows='8'
				cols='10'
				placeholder='New note'
				value={noteText}
				onChange={handleChangeText}
			></textarea>
			<div className='note-footer'>
				<button className='save' onClick={handleSaveClick}>
					save
				</button>
			</div>
		</div>
	);
};

export default AddNote;
