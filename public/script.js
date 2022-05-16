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

const startBtn = document.getElementById('startTimer');
const resetTimer = document.getElementById('resetTimer');
const countDisplay = document.getElementById('countDisplay');

let setTimeForm = document.getElementById('setTime');
let minInput = document.getElementById('mins');
let breakMinInput = document.getElementById('breakTime');

setTimeForm.addEventListener('submit', function (e) {
    e.preventDefault();
    inputChecker();
});


function myDefaultTimer() {
    // default time;
    const defaultTime = 25;
    let defaultInTotalSecs = defaultTime * 60;

    setInterval(runDefaultTimer, 1000);

    let valid = true;
    let breakValid = true;

    function runDefaultTimer() {
        if (defaultInTotalSecs >= 0) {
            valid = true;
        } else {
            valid = false;
        }

        if (valid) {
            const defaultM = Math.floor(defaultInTotalSecs / 60);
            let defaultS = defaultInTotalSecs % 60;

            defaultS = defaultS < 10 ? '0' + defaultS : defaultS;

            countDisplay.innerHTML = `${defaultM}:${defaultS}`;
            defaultInTotalSecs--;
        } else {
            if (breakValid == true) {
                defaultBreakTimer();
                breakValid = false;
            }
        }
    }
}

// default break time;
function defaultBreakTimer() {
    // default break time;
    const minValDefault = 5;
    let totalBreakDefault = minValDefault * 60;

    setInterval(runDefaultBreak, 1000);

    let valid = true;

    function runDefaultBreak() {
        if (valid) {
            const minutes = Math.floor(totalBreakDefault / 60);
            let seconds = minutes * 60;

            seconds = seconds < 10 ? '0' + seconds : seconds;

            countDisplay.innerHTML = `${minutes}:${seconds}`;
            totalBreakDefault--;
        }
    }
}

// custome pomodoro timer;
function customTimer() {

    const minVal = minInput.value;
    let totalTimeConst = minVal * 60;
    let totalTime = totalTimeConst;

    setInterval(executeTimer, 1000);

    let valid = true;
    let breakValid = true;
    let count = 0;
    let cyclesVal = 0;

    if (cycles.value == '') {
        cyclesVal = 3;
    } else {
        cyclesVal = cycles.value;
    }

    console.log(cyclesVal);

    function executeTimer() {

        if (totalTime >= 0) {
            valid = true;
        } else {
            valid = false;
        }

        if (valid) {
            // console.log(count);
            const minutes = Math.floor(totalTime / 60);
            let seconds = totalTime % 60;

            seconds = seconds < 10 ? '0' + seconds : seconds;

            countDisplay.innerHTML = `${minutes}:${seconds}`;
            totalTime -= 20;

        } else {
            if (breakValid == true) {
                breakTimer();
                breakValid = false;
                count++;
            } else {
                if (count < cyclesVal) {
                    breakValid = true;
                }
            }

            if (count < cyclesVal) {
                totalTime = totalTimeConst;
            }
        }
    }
}

// custome break timer;
function breakTimer() {
    const minVal = breakMinInput.value;
    let totalBreak = minVal * 60;

    setInterval(executeBreak, 1000);

    let valid = true;

    function executeBreak() {
        if (totalBreak >= 0) {
            valid = true;
        } else {
            valid = false;
        }

        if (valid) {
            const minutes = Math.floor(totalBreak / 60);
            let seconds = totalBreak % 60;

            seconds = seconds < 10 ? '0' + seconds : seconds;

            countDisplay.innerHTML = `${minutes}:${seconds}`;
            totalBreak -= 30;
        }
    }
}

function inputChecker() {
    let num;
    if (cycles.value == '') {
        num = 3;
    } else {
        num = cycles.value;
    }

    // if (document.getElementById('mins').value == '') {
    //     myDefaultTimer();
    //     timeInputSector.style.display = 'none';
    // } else {
    //     for (i = 0; i < num; i++) {
    //         customTimer();
    //         timeInputSector.style.display = 'none';
    //     }
    // }

    customTimer();
    customTimer();
    timeInputSector.style.display = 'none';
}

function clearTimer() {
    countDisplay.style.display = 'none';
    timeInputSector.style.display = 'block';
}

// MUSIC PLAYER SCRIPT HERE
function playRandomTrack() { }

function playPrevTrack() { }

function pauseThisTrack() { }

function playNextTrack() { }

function repeatThisTrack() { }