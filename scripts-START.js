let countdown;
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]'); //selects all elements with this attribute

function timer(seconds) {
    clearInterval(countdown); //begins by clearing any existing timers
    const now = Date.now(); //gives the time in milliseconds
    const then = now + seconds * 1000; // to make this into milliseconds
    displayTimeLeft(seconds); //run as soon as the timer function is invoked to offset the one second delay from setInterval
    displayEndTime(then);

    countdown = setInterval (() => {
        const secondsLeft = Math.round((then - Date.now()) / 1000); //gives how many seconds are left
        if (secondsLeft < 0) {
            clearInterval(countdown);
            return;
        }
        
        displayTimeLeft(secondsLeft);
    }, 1000);

}


//setInterval takes at least 1 second to start running. So we need this function to offset it:

function displayTimeLeft(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainderSeconds = seconds % 60;
    const display = `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
    timerDisplay.textContent = display;
    document.title = display; //updates the title tag on browser!


    }

function displayEndTime(timestamp) {
    const end = new Date(timestamp);
    const hour = end.getHours();
    const adjustedHour = hour > 12 ? hour - 12 : hour; //so it's not European time
    const minutes = end.getMinutes();
    endTime.textContent = `Be Back At ${adjustedHour}:${minutes < 10 ? '0' : ''}${minutes}`;
  }

  function startTimer() {
    const seconds = parseInt(this.dataset.time);
    timer(seconds);
  }
  
  buttons.forEach(button => button.addEventListener('click', startTimer));

  document.customForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const mins = this.minutes.value;
    //console.log(mins);
    timer(mins * 60);//timer function takes seconds
    this.reset();
  });