"use strict";
const images = ['icon-72x72', 'icon-96x96', 'icon-128x128', 'icon-144x144'];
const imgElem = document.querySelector('img');
let currentImg = 0;

function randomValueFromArray(array) {
    currentImg = currentImg > 3 ? 0 : currentImg;
    return array[currentImg++];
}

setInterval(() => {
    const randomChoice = randomValueFromArray(images);
    imgElem.src = `images/icons/${randomChoice}.png`;
}, 2000);




// Register service worker to control making site work offline

if ('serviceWorker' in navigator) {
    navigator.serviceWorker
        .register('/mynotespwa/sw.js')
        .then(() => { console.log('Service Worker Registered'); })
        .catch(function (err) {
            console.warn('Error whilst registering service worker', err);
        });
}

// Code to handle install prompt on desktop

let deferredPrompt;
const addBtn = document.querySelector('.add-button');
addBtn.style.display = 'none';

window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    e.preventDefault();
    // Stash the event so it can be triggered later.
    deferredPrompt = e;
    // Update UI to notify the user they can add to home screen
    addBtn.style.display = 'block';

    addBtn.addEventListener('click', () => {
        // hide our user interface that shows our A2HS button
        addBtn.style.display = 'none';
        // Show the prompt
        deferredPrompt.prompt();
        // Wait for the user to respond to the prompt
        deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                console.log('User accepted the A2HS prompt');
            } else {
                console.log('User dismissed the A2HS prompt');
            }
            deferredPrompt = null;
        });
    });
});