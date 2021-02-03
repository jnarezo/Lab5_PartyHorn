// main.js

const audioIcon = document.getElementById('sound-image');
const audio = document.getElementById('horn-sound');

const volIcon = document.getElementById('volume-image');
const volSlider = document.getElementById('volume-slider');
const volInput = document.getElementById('volume-number');

const airHorn = createSound('./assets/media/audio/air-horn.mp3',
                    './assets/media/images/air-horn.svg',
                    document.getElementById('radio-air-horn'));
const carHorn = createSound('./assets/media/audio/car-horn.mp3',
                    './assets/media/images/car.svg',
                    document.getElementById('radio-car-horn'));
const partyHorn = createSound('./assets/media/audio/party-horn.mp3',
                    './assets/media/images/party-horn.svg',
                    document.getElementById('radio-party-horn'));

const playButton = document.getElementById('honk-btn');

volSlider.addEventListener('input', handleSetVol);
volInput.addEventListener('change', handleSetVol);

airHorn.selector.addEventListener('change', () => { changeAudio(airHorn); });
carHorn.selector.addEventListener('change', () => { changeAudio(carHorn); });
partyHorn.selector.addEventListener('change', () => { changeAudio(partyHorn); });

playButton.addEventListener('click', (e) => {
    e.preventDefault();
    audio.play();
});

/* ------------------------------------------------------- */

function createSound(src, img, audioSelector) {
    return {
        src: src,
        img: img,
        selector: audioSelector,
    };
}

function handleSetVol(e) {
    let vol = Number(e.target.value);
    if (vol > volInput.max) vol = volInput.max;
    if (vol < volInput.min) vol = volInput.min;
    audio.volume = vol / 100;
    changeVolIcon(vol);
    volSlider.value = vol;
    volInput.value = vol;
    playButton.disabled = (vol == 0);
}

function changeVolIcon(volume) {
    let iconSrc = './assets/media/icons/volume-level-0.svg';
    if (volume >= 67) {
        iconSrc = './assets/media/icons/volume-level-3.svg';
    } else if (volume >= 34 && volume <= 66) {
        iconSrc = './assets/media/icons/volume-level-2.svg';
    } else if (volume >= 1 && volume <= 33) {
        iconSrc = './assets/media/icons/volume-level-1.svg';
    }
    volIcon.src = iconSrc;
}

function changeAudio(sound) {
    audio.src = sound.src;
    audioIcon.src = sound.img;
}