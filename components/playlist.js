class PlaylistBar extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
        this.setupEventListeners();
    }

    setupEventListeners(audioElement) {
        this.playlistItems = this.shadowRoot.querySelectorAll('#playlist li');

        this.playlistItems.forEach((item, index) => {
            item.addEventListener('click', () => {
                audioElement.src = `assets/music/track-${index + 1}.mp3`;
                audioElement.play();
            });
        });
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                /* Styles for the playlist bar */
            </style>
            <ul id="playlist">
                <li>Track 1</li>
                <li>Track 2</li>
                <li>Track 3</li>
            </ul>
        `;
    }
}

customElements.define('playlist-bar', PlaylistBar);