function showModal()
{
	document.getElementById('modal-backdrop').classList.toggle('hidden');
	if(document.getElementById('leave-comment-modal')) {
		document.getElementById('leave-comment-modal').classList.toggle('hidden');
	}
	if(document.getElementById('create-location-modal')) {
		document.getElementById('create-location-modal').classList.toggle('hidden');
	}
}

function hideModal()
{
	document.getElementById('modal-backdrop').classList.toggle('hidden');
	if(document.getElementById('leave-comment-modal')) {
		document.getElementById('leave-comment-modal').classList.toggle('hidden');
	}
	if(document.getElementById('create-location-modal')) {
		document.getElementById('create-location-modal').classList.toggle('hidden');
	}
	if(document.getElementById('comment-author-input'))
		document.getElementById('comment-author-input').value = '';
	if(document.getElementById('location-author-input'))
		document.getElementById('location-author-input').value = '';
	if(document.getElementById('location-description-input'))
		document.getElementById('location-description-input').value = '';
	if(document.getElementById('location-latitude-input'))
		document.getElementById('location-latitude-input').value = '';
	if(document.getElementById('location-longitude-input'))
		document.getElementById('location-longitude-input').value = '';
	if(document.getElementById('location-city-input'))
		document.getElementById('location-city-input').value = '';
	if(document.getElementById('location-state-input'))
		document.getElementById('location-state-input').value = '';
}

document.getElementsByClassName('modal-close-button')[0].addEventListener('click', hideModal);

document.getElementsByClassName('modal-cancel-button')[0].addEventListener('click', hideModal);

document.getElementById('create-button').addEventListener('click', showModal);
