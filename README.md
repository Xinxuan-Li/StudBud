# StudBud
DECO2017 A3

                    <div class="wrapper">
                        <div class="details">
                            <div class="trackProfile"></div>
                            <div class="trackName">Track Name</div>
                            <div class="trackArtist">Artist</div>
                        </div>
                        <div class="sliderContainer">
                            <div class="currentTime">00:00</div>
                            <input type="range" min="1" max="100" value="0" class="trackSlider" onchange="skipTo()">
                            <div class="totalDuration">00:00</div>
                        </div>
                        <!-- <div class="sliderContainer">
                            <i class="fa fa-volume-down"></i>
                            <input type="range" min="1" max="100" value="0" class="volumeControl"
                                onchange="setVolume()">
                            <i class="fa fa-volume-up"></i>
                        </div> -->
                        <div class="musicControlPanel">
                            <div class="randomTrack" onclick="playRandomTrack()">
                                <i class="fa fa-random"></i>
                            </div>
                            <div class="prevTrack" onclick="playPrevTrack()">
                                <i class="fa fa-backward" aria-hidden="true"></i>
                            </div>
                            <div class="pauseTrack" onclick="pauseThisTrack()">
                                <i class="fa fa-pause" aria-hidden="true"></i>
                            </div>
                            <div class="nextTrack" onclick="playNextTrack()">
                                <i class="fa fa-forward" aria-hidden="true"></i>
                            </div>
                            <div class="repeatTrack" onclick="repeatThisTrack()">
                                <i class="fa fa-repeat"></i>
                            </div>
                        </div>
                    </div>