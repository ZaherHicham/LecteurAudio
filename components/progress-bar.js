class ProgressBar extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
        this.setupEventListeners();
    }

    setupEventListeners(audioElement) {

    }


    render() {
        this.shadowRoot.innerHTML = `
            <style>
                /* Styles for the progress bar */
            </style>
        `;
    }
}

customElements.define('progress-bar', ProgressBar);