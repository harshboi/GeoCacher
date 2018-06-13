function showModal()
{
	document.getElementById('modal-backdrop').classList.toggle('hidden');
	document.getElementById('leave-comment-modal').classList.toggle('hidden');
	document.getElementById('create-location-modal').classList.toggle('hidden');
}

function hideModal()
{
	document.getElementById('modal-backdrop').classList.toggle('hidden');
	document.getElementById('leave-comment-modal').classList.toggle('hidden');
	document.getElementById('create-location-modal').classList.toggle('hidden');
	document.getElementById('comment-author-input').value = '';
	document.getElementById('location-author-input').value = '';
	document.getElementById('location-description-input').value = '';
	document.getElementById('location-latitude-input').value = '';
	document.getElementById('location-longitude-input').value = '';
	document.getElementById('location-city-input').value = '';
	document.getElementById('location-state-input').value = '';
}

document.getElementsByClassName('modal-close-button')[0].addEventListener('click', hideModal);

document.getElementsByClassName('modal-cancel-button')[0].addEventListener('click', hideModal);

document.getElementById('create-button').addEventListener('click', showModal);
