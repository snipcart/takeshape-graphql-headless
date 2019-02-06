document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementsByTagName('form')[0];
    const input = document.getElementById('message');

    const API_URL = 'https://takeshape-gratitude-journal-api.netlify.com/.netlify/functions/add-entry'

    let processing = false;

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        if (processing) {
            return;
        }

        processing = true;

        fetch(API_URL, {
            method: 'POST',
            body: JSON.stringify({message: input.value})
        })
        .then(function() {
            document.getElementById('success-message').style.display = 'block';
            document.getElementById('message').style.display = 'none';

            processing = false;
        })
        .catch(function() {
            processing = false;
        })
    })
});