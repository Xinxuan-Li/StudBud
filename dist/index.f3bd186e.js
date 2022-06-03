var timer = document.querySelector('.timer');
var music = document.querySelector('.music');
var navbar = document.querySelector('.navlinks');
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
function displayMenu() {
    navbar.style.display = 'block';
}
function hideMenu() {
    navbar.style.display = 'none';
}
window.addEventListener("resize", function() {
    if (window.matchMedia("(min-width: 700px)").matches) navbar.style.display = 'block';
});
// TIMER SCRIPT HERE
let timeInputSector = document.querySelector('.timeInput');
let cycles = document.getElementById('pomodoro');
let resetTimerTbn = document.getElementById('resetTimer');
var startBtn = document.getElementById('startTimer');
const resetBtn = document.getElementById('resetTimer');
const countDisplay = document.getElementById('countDisplay');
let setTimeForm = document.getElementById('setTime');
let minInput = document.getElementById('mins');
let breakMinInput = document.getElementById('breakTime');
var mintxt = document.querySelector('.mintxt');
if (startBtn) startBtn.addEventListener('click', function(e) {
    e.preventDefault();
    inputChecker();
    startBtn.innerHTML = 'Pause';
});
if (resetBtn) resetBtn.addEventListener('click', function() {
    window.location.reload();
    timer.style.display = 'block';
});
// Variable name valid acted as switch to check whether the timer round has ended. If the cycles of timer is set to be 3, the timer will end after 3 rounds after running work and break time, and the number of rounds is monitored by a variable count;
// The same logic applies to myDefaultTimer(), defaultBreakTimer(), customTimer(), and breakTimer();
function myDefaultTimer() {
    // default time;
    const defaultTime = 25;
    let totalTimeConst = defaultTime * 60;
    let defaultInTotalSecs = totalTimeConst;
    setInterval(runDefaultTimer, 1000);
    let valid = true;
    let breakValid = true;
    let count = 0;
    function runDefaultTimer() {
        if (defaultInTotalSecs >= 0) valid = true;
        else valid = false;
        if (valid) {
            const defaultM = Math.floor(defaultInTotalSecs / 60);
            let defaultS = defaultInTotalSecs % 60;
            defaultS = defaultS < 10 ? '0' + defaultS : defaultS;
            countDisplay.innerHTML = `${defaultM}:${defaultS}`;
            countDisplay.style.color = '#6E703D';
            defaultInTotalSecs--;
        } else {
            if (breakValid == true) {
                defaultBreakTimer();
                breakValid = false;
                count++;
            } else if (count < 3) breakValid = true;
            if (count < 3) defaultInTotalSecs = totalTimeConst;
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
        if (totalBreakDefault >= 0) valid = true;
        else valid = false;
        if (valid) {
            const minutes = Math.floor(totalBreakDefault / 60);
            let seconds = totalBreakDefault % 60;
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
    if (cycles.value == '') cyclesVal = 3;
    else cyclesVal = cycles.value;
    function executeTimer() {
        if (totalTime >= 0) valid = true;
        else valid = false;
        if (valid) {
            const minutes = Math.floor(totalTime / 60);
            let seconds = totalTime % 60;
            seconds = seconds < 10 ? '0' + seconds : seconds;
            countDisplay.innerHTML = `${minutes}:${seconds}`;
            countDisplay.style.color = '#6E703D';
            totalTime--;
        } else {
            // Runs the break time the first time as pomodoro timer ends; breakValid is a switch to check whether break time has ends;
            if (breakValid == true) {
                breakTimer();
                breakValid = false;
                count++;
            } else if (count < cyclesVal) breakValid = true;
            if (count < cyclesVal) totalTime = totalTimeConst;
        }
    }
}
// custome break timer;
function breakTimer() {
    const minVal = breakMinInput.value;
    let totalBreak = minVal * 60;
    if (minVal == '') totalBreak = 300;
    setInterval(executeBreak, 1000);
    let valid = true;
    function executeBreak() {
        if (totalBreak >= 0) valid = true;
        else valid = false;
        if (valid) {
            const minutes = Math.floor(totalBreak / 60);
            let seconds = totalBreak % 60;
            seconds = seconds < 10 ? '0' + seconds : seconds;
            countDisplay.innerHTML = `${minutes}:${seconds}`;
            totalBreak--;
        }
    }
}
// This method checks the input values in the timer, with all types of customed inputs;
// It reads the timer to check whether it is the default one or customied, and the timer will be triggered according the input content;
function inputChecker() {
    if (minInput.value == '') {
        myDefaultTimer();
        timeInputSector.style.visibility = 'hidden';
        timeInputSector.style.display = 'none';
        startBtn.addEventListener('click', function(e) {
            clearInterval(myDefaultTimer);
            startBtn.innerHTML = 'Start';
        });
    } else {
        customTimer();
        timeInputSector.style.visibility = 'hidden';
        timeInputSector.style.display = 'none';
        startBtn.addEventListener('click', function(e) {
            clearInterval(customTimer);
            startBtn.innerHTML = 'Start';
        });
    }
}

//# sourceMappingURL=index.f3bd186e.js.map
