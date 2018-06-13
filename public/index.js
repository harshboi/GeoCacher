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
	if(document.getElementById('location-name-input'))
		document.getElementById('location-name-input').value = '';
	if(document.getElementById('comment-author-input'))
		document.getElementById('comment-author-input').value = '';
	if(document.getElementById('comment-input'))
		document.getElementById('comment-input').value = '';
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

function sendData() {
	var xhr = new XMLHttpRequest();
	if(document.getElementById('leave-comment-modal')) {
		xhr.open("POST", "/new_comment", true);
		xhr.setRequestHeader('Content-Type', 'application/json');
		xhr.send(JSON.stringify({
		    author: document.getElementById('comment-author-input').value,
				comment: document.getElementById('comment-input').value
		}));
	} else if(document.getElementById('create-location-modal')) {
		xhr.open("POST", "/new_location", true);
		xhr.setRequestHeader('Content-Type', 'application/json');
		xhr.send(JSON.stringify({
				name: document.getElementById('location-name-input').value,
		    author: document.getElementById('location-author-input').value,
				desc: document.getElementById('location-description-input').value,
				lat: document.getElementById('location-latitude-input').value,
				long: document.getElementById('location-longitude-input').value,
				city: document.getElementById('location-city-input').value,
				state: document.getElementById('location-state-input').value
		}));
	}
	hideModal();
}

document.getElementsByClassName('modal-accept-button')[0].addEventListener('click', sendData);

document.getElementsByClassName('modal-close-button')[0].addEventListener('click', hideModal);

document.getElementsByClassName('modal-cancel-button')[0].addEventListener('click', hideModal);

document.getElementById('create-button').addEventListener('click', showModal);
