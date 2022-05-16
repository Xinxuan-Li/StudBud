var timer = document.querySelector('.timer');
var music = document.querySelector('.music');

function showTimer() {
    timer.style.display = 'block';
    music.style.display = 'none';
}

function hideTimer() {
    timer.style.display = 'none';
}

function showMusicPlayer() {
    music.style.display = 'block';
    timer.style.display = 'none';
}

function hideMusicPlayer() {
    music.style.display = 'none';
}

// TIMER SCRIPT HERE
let timeInputSector = document.querySelector('.timeInput');
let cycles = document.getElementById('pomodoro');
let resetTimerTbn = document.getElementById('resetTimer');

const startBtn = document.getElementById('#startTimer');
const resetTimer = document.getElementById('#resetTimer');
const countDisplay = document.getElementById('countDisplay');

let setTimeForm = document.getElementById('setTime');
let minInput = document.getElementById('mins');
let secInput = document.getElementById('secs');

const defaultTime = 25;
let defaultInTotalSecs = defaultTime * 60;

function myDefaultTimer() {
    const defaultM = Math.floor(defaultInTotalSecs / 60);
    let defaultS = defaultInTotalSecs % 60;

    defaultS = defaultS < 10 ? '0' + defaultS : defaultS;

    countDisplay.innerHTML = `${defaultM}:${defaultS}`;
    defaultInTotalSecs--;
}

setTimeForm.addEventListener('submit', function (e) {
    e.preventDefault();
    inputChecker();
});

// A NOTE FOR ADDING CYCLES 
// for loop, take cycle inputs first, then nest two loops, one for break one for work. work time finishes, load break time. Remeber to set a end time, so the timer doesnt go beyong 00:00

function customTimer() {
    const minVal = minInput.value;
    let secVal = secInput.value;
    let totalTime = minVal * 60 + secVal;

    if (minVal == '') {
        setInterval(minUndefined, 1000);
    } else if (secVal == '') {
        setInterval(secUndefined, 1000);
    } else {
        setInterval(normalCase, 1000);
    }

    function secUndefined() {
        const minutes = Math.floor(totalTime / 60);
        let seconds = totalTime % 60;

        seconds = seconds < 10 ? '0' + seconds : seconds;

        countDisplay.innerHTML = `${minutes}:${seconds}`;
        totalTime--;
    }

    function minUndefined() {
        const minutes = Math.floor(totalTime / 60);
        let seconds = totalTime % 60;

        countDisplay.innerHTML = `${minutes}:${seconds}`;
        totalTime--;
    }

    function normalCase() {
        const minutes = Math.floor(totalTime / 60);
        let seconds = totalTime % 60;

        countDisplay.innerHTML = `${minutes}:${seconds}`;
        totalTime--;
    }

    // resetTimerTbn.addEventListener('click', function (e) {
    //     clearInterval(minUndefined);
    //     clearInterval(secUndefined);
    //     clearInterval(normalCase);
    // });
}

function inputChecker() {
    // if both input fields are null;
    if (document.getElementById('mins').value == '' && document.getElementById('secs').value == '') {
        setInterval(myDefaultTimer, 1000);
        timeInputSector.style.display = 'none';
    } else {
        customTimer();
        timeInputSector.style.display = 'none';
    }
}

// MUSIC PLAYER SCRIPT HERE
function setVolume() { }

function playRandomTrack() { }

function playPrevTrack() { }

function pauseThisTrack() { }

function playNextTrack() { }

function repeatThisTrack() { }