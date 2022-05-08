var container = document.querySelector('container');
function showTimer() {
    var timer = document.getElementById('timer');
    var music = document.getElementById('music');
    timer.style.display = 'block';
    music.style.display = 'none';
}
function showMusicPlayer() {
    var timer = document.getElementById('timer');
    var music = document.getElementById('music');
    music.style.display = 'block';
    timer.style.display = 'none';
}
function hideMusicPlayer() {
    var music = document.getElementById('music');
    music.style.display = 'none';
}
function hideTimer() {
    var timer = document.getElementById('timer');
    timer.style.display = 'none';
}
function cancelCreateNew() {}

//# sourceMappingURL=index.d0a6c712.js.map
