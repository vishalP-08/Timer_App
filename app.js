// Timer array to store active timers
let timers = [];

function startNewTimer() {
  const hours = parseInt(document.getElementById('hours').value) || 0;
  const minutes = parseInt(document.getElementById('minutes').value) || 0;
  const seconds = parseInt(document.getElementById('seconds').value) || 0;

  const totalTime = hours * 3600 + minutes * 60 + seconds;

  if (totalTime === 0) {
    alert('Please enter a valid time.');
    return;
  }

  const timerObj = {
    totalTime,
    timeRemaining: totalTime,
  };

  timers.push(timerObj);

  createTimerElement(timerObj);

  // Start the interval for the new timer
  timerObj.intervalId = setInterval(() => {
    timerObj.timeRemaining--;

    if (timerObj.timeRemaining <= 0) {
      clearInterval(timerObj.intervalId);
      handleTimerEnd(timerObj);
    }

    updateTimerElement(timerObj);
  }, 1000);
}

function createTimerElement(timerObj) {
  const activeTimersContainer = document.getElementById('activeTimers');
  const timerElement = document.createElement('div');
  timerElement.className = 'timer';
  timerElement.innerHTML = `
    <div class="time">${formatTime(timerObj.timeRemaining)}</div>
    <button class="stop-btn" onclick="stopTimer(${timers.indexOf(timerObj)})">Stop Timer</button>
  `;
  activeTimersContainer.appendChild(timerElement);
}

function updateTimerElement(timerObj) {
  const timerElements = document.querySelectorAll('.timer');
  const timerElement = timerElements[timers.indexOf(timerObj)];
  timerElement.querySelector('.time').textContent = formatTime(timerObj.timeRemaining);
}

function stopTimer(index) {
  const timerObj = timers[index];
  clearInterval(timerObj.intervalId);
  timers.splice(index, 1);
  document.getElementById('activeTimers').children[index].remove();
}

function handleTimerEnd(timerObj) {
  const timerElements = document.querySelectorAll('.timer');
  const timerElement = timerElements[timers.indexOf(timerObj)];

  // Change the timer display
  timerElement.classList.add('timer-ended');

  // Display "Timer is up!" text
  const timerUpText = document.createElement('div');
  timerUpText.className = 'timer-up-text';
  timerUpText.textContent = 'Timer is up!';
  timerElement.appendChild(timerUpText);

  // Play audio alert
  const audio = new Audio('wrong-answer-129254.mp3'); // Replace with your audio file path
  audio.play();

  // Display or hide the "You have no timers currently!" message
  updateNoTimersMessage();

  // Remove the timer after a delay (optional)
  setTimeout(() => {
    timerElement.remove();
    updateNoTimersMessage();
  }, 5000); // Change 5000 to the desired delay in milliseconds
}

function stopTimer(index) {
  const timerObj = timers[index];
  clearInterval(timerObj.intervalId);

  // Remove the "Timer is up!" text if it exists
  const timerElements = document.querySelectorAll('.timer');
  const timerElement = timerElements[index];
  const timerUpText = timerElement.querySelector('.timer-up-text');
  if (timerUpText) {
    timerUpText.remove();
  }

  timers.splice(index, 1);
  timerElement.remove();

}



function formatTime(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
}
