// Importation de tous les composants nécessaires pour le lecteur audio
import './components/audio-player.js';
import './components/controls.js';
import './components/progress-bar.js';
import './components/stereo-control.js';
import './components/visualizer.js';
import './components/playlist.js';

// Configuration ou logique d'initialisation globale
document.addEventListener('DOMContentLoaded', () => {
    const audioPlayer = document.querySelector('audio-player');
    
    if (audioPlayer) {
        const defaultAudioSrc = './components/music/track-01.mp3';
        audioPlayer.shadowRoot.getElementById('audio').src = defaultAudioSrc;
    }
});
