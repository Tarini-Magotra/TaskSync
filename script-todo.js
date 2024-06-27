document.addEventListener('DOMContentLoaded', function() {
    const taskInput = document.getElementById('task');
    const addTaskBtn = document.getElementById('add-task-btn');
    const taskList = document.getElementById('task-list');
    const timeDisplay = document.getElementById('time-display');
    const startTimerBtn = document.getElementById('start-btn');
    const pauseTimerBtn = document.getElementById('pause-btn');
    const resetTimerBtn = document.getElementById('reset-btn');
    const hoursInput = document.getElementById('hours');
    const minutesInput = document.getElementById('minutes');
    const homebutton = document.getElementById('home-icon');
    const addPlaylistBtn = document.getElementById('add-playlist-btn');
    const playlistInput = document.getElementById('playlist-link');
    const playlistContainer = document.getElementById('player');
    const calcbutton = document.getElementById('calculator-icon');
    const progressBar = document.querySelector('.progress-bar');
    const progressNumber = document.getElementById('number');

    let countdownInterval;
    let remainingTime = 0;
    let player;


    function updateProgress() {
        const totalTasks = taskList.children.length;
        const completedTasks = taskList.querySelectorAll('.completed').length;
        const percentage = totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100;
        const offset = 282.6 - (282.6 * (percentage / 100));
        
        progressBar.style.strokeDashoffset = offset;
        progressNumber.textContent = `${Math.round(percentage)}%`;
    }

    // Function to add a task to the list
    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText !== '') {
            const li = document.createElement('li');
            li.classList.add('task-item');

            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.addEventListener('change', function() {
                if (checkbox.checked) {
                    li.classList.add('completed');
                } else {
                    li.classList.remove('completed');
                }
            });

            const textNode = document.createTextNode(taskText);
            li.appendChild(checkbox);
            li.appendChild(textNode);

            const actionsDiv = document.createElement('div');
            actionsDiv.classList.add('task-actions');

            const editButton = document.createElement('button');
            editButton.textContent = '✎'; // Edit symbol
            editButton.addEventListener('click', function() {
                const newText = prompt('Edit your task:', textNode.textContent);
                if (newText !== null && newText.trim() !== '') {
                    textNode.textContent = newText.trim();
                }
            });
            

            const deleteButton = document.createElement('button');
            deleteButton.textContent = '✘'; // Cross symbol
            deleteButton.addEventListener('click', function() {
                li.remove();
            });

            actionsDiv.appendChild(editButton);
            actionsDiv.appendChild(deleteButton);
            li.appendChild(actionsDiv);

            taskList.appendChild(li);
            taskInput.value = '';
        }
    }

    // Event listener for adding a task
    addTaskBtn.addEventListener('click', addTask);

    // Event listener for adding a task with Enter key
    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    // Timer Functions
    function formatTime(seconds) {
        const hrs = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }

    function updateDisplay() {
        timeDisplay.textContent = formatTime(remainingTime);
    }

    function startTimer() {
        clearInterval(countdownInterval);
        remainingTime = parseInt(hoursInput.value || 0, 10) * 3600 + parseInt(minutesInput.value || 0, 10) * 60;
        updateDisplay();

        countdownInterval = setInterval(() => {
            if (remainingTime > 0) {
                remainingTime--;
                updateDisplay();
            } else {
                clearInterval(countdownInterval);
            }
        }, 1000);
    }

    function pauseTimer() {
        clearInterval(countdownInterval);
    }

    function resetTimer() {
        clearInterval(countdownInterval);
        remainingTime = 0;
        hoursInput.value = '';
        minutesInput.value = '';
        updateDisplay();
    }

    startTimerBtn.addEventListener('click', startTimer);
    pauseTimerBtn.addEventListener('click', pauseTimer);
    resetTimerBtn.addEventListener('click', resetTimer);

    // Event delegation for edit buttons (since they are dynamically created)
    taskList.addEventListener('click', function(event) {
        const target = event.target;
        if (target.tagName === 'BUTTON' && target.textContent === '✎') {
            const textNode = target.parentNode.previousSibling.previousSibling;
            const newText = prompt('Edit your task:', textNode.textContent.trim());
            if (newText !== null && newText.trim() !== '') {
                textNode.textContent = newText.trim();
            }
        }
    });

    // Function to handle adding Spotify playlist
    function addSpotifyPlaylist(url) {
        const accessToken = ''; // Placeholder for access token

        // Extract playlist ID from Spotify URL
        const playlistId = extractPlaylistId(url);

        if (!playlistId) {
            alert('Please enter a valid Spotify playlist link.');
            return;
        }

        // Construct API request to add playlist tracks (example)
        const apiUrl = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`;

        // Example of fetch request to add tracks (requires authentication)
        fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                uris: [] // Replace with Spotify track URIs to add
            })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to add playlist tracks.');
            }
            // Handle success
            alert('Playlist added successfully!');
            playlistInput.value = ''; // Clear input after adding
        })
        .catch(error => {
            console.error('Error adding playlist:', error);
            alert('Error adding playlist. Please try again.');
        });
    }

    // Function to extract Spotify playlist ID from URL
    function extractPlaylistId(url) {
        const regex = /(?:https?:\/\/)?(?:www\.)?open\.spotify\.com\/playlist\/([a-zA-Z0-9]+)/;
        const matches = url.match(regex);
        return matches ? matches[1] : null;
    }

    // Event listener for adding Spotify playlist
    addPlaylistBtn.addEventListener('click', () => {
        const playlistLink = playlistInput.value.trim();
        if (playlistLink !== '' && playlistLink.startsWith('https://open.spotify.com/playlist/')) {
            addSpotifyPlaylist(playlistLink);
        } else {
            alert('Please enter a valid Spotify playlist link.');
        }
    });

    // Event listener for navigating back to home
    homebutton.addEventListener('click', function() {
        window.location.href = 'index.html'; // Replace with your homepage URL
    });

    // Event listener for navigating to the calculator page
    calcbutton.addEventListener('click', function() {
        window.location.href = 'calculator-index.html'; // Replace with your calculator page URL
    });

    // Initial display update
    updateDisplay();
});
