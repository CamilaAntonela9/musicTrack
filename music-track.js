const template = document.createElement('template');
template.innerHTML = `
  <style>
    @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css');

    :host {
      display: block;
      max-width: 340px;
      font-family: 'Segoe UI', Roboto, sans-serif;
      border-radius: 16px;
      background-color: #181818;
      color: white;
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.4);
      overflow: hidden;
    }

    header {
      background-color: #1db954;
      padding: 10px;
      text-align: center;
      font-weight: bold;
      font-size: 1rem;
    }

    .track {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 1rem;
    }

    .cover-container {
      position: relative;
      width: 100%;
    }

    img {
      width: 100%;
      border-radius: 12px;
    }

    .favorite {
      position: absolute;
      top: 10px;
      right: 10px;
      font-size: 1.3rem;
      color: white;
      cursor: pointer;
    }

    h2 {
      margin: 0.8rem 0 0.2rem;
      font-size: 1.2rem;
      text-align: center;
    }

    p {
      margin: 0;
      color: #b3b3b3;
      font-size: 0.95rem;
      text-align: center;
    }

    .controls {
      display: flex;
      justify-content: space-around;
      align-items: center;
      margin: 1rem 0 0.5rem;
      width: 100%;
    }

    .controls i {
      cursor: pointer;
      font-size: 1.1rem;
      color: #b3b3b3;
      transition: color 0.2s ease;
    }

    .controls i:hover {
      color: white;
    }

    .progress-bar {
      width: 100%;
      height: 4px;
      background: #333;
      border-radius: 2px;
      overflow: hidden;
      margin-bottom: 0.5rem;
    }

    .progress {
      height: 100%;
      background: #1db954;
      width: 0%;
      transition: width 0.2s linear;
    }

    button.play-btn {
      margin-top: 0.5rem;
      padding: 0.5rem 1.2rem;
      background-color: #1db954;
      color: white;
      border: none;
      border-radius: 20px;
      font-weight: bold;
      cursor: pointer;
      font-size: 1rem;
    }

    button.play-btn:hover {
      background-color: #1ed760;
    }

    ::slotted(*) {
      margin-top: 1rem;
      color: #ccc;
    }

    audio {
      display: none;
    }
  </style>

  <header> Componente Reproductor</header>

  <div class="track">
    <div class="cover-container">
      <img id="cover" alt="Portada del álbum" />
      <i class="fa-regular fa-heart favorite" title="Agregar a favoritos"></i>
    </div>
    <h2 id="title"></h2>
    <p id="artist"></p>

    <div class="controls">
      <i class="fa-solid fa-random" title="Aleatorio"></i>
      <i class="fa-solid fa-repeat" title="Repetir"></i>
      <i class="fa-solid fa-ellipsis-vertical" title="Más opciones"></i>
    </div>

    <div class="progress-bar">
      <div class="progress" id="progress"></div>
    </div>

    <button id="play" class="play-btn">▶ Reproducir</button>
    <audio id="audio"></audio>

    <slot></slot>
  </div>
`;

class MusicTrack extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.isPlaying = false;
    this.progressInterval = null;
  }

  static get observedAttributes() {
    return ['title', 'artist', 'cover', 'audio'];
  }

  attributeChangedCallback() {
    this.updateComponent();
  }

  connectedCallback() {
    this.updateComponent();

    const playBtn = this.shadowRoot.querySelector('#play');
    const audio = this.shadowRoot.querySelector('#audio');
    const progress = this.shadowRoot.querySelector('#progress');

    playBtn.addEventListener('click', () => {
      if (!audio.src) return;

      if (this.isPlaying) {
        audio.pause();
        playBtn.textContent = '▶ Reproducir';
        this.isPlaying = false;
        clearInterval(this.progressInterval);
      } else {
        audio.play();
        playBtn.textContent = '⏸ Pausar';
        this.isPlaying = true;

        this.progressInterval = setInterval(() => {
          const percent = (audio.currentTime / audio.duration) * 100;
          progress.style.width = `${percent}%`;
        }, 200);
      }
    });

    audio.addEventListener('ended', () => {
      this.isPlaying = false;
      playBtn.textContent = '▶ Reproducir';
      progress.style.width = '0%';
      clearInterval(this.progressInterval);
    });

    const heart = this.shadowRoot.querySelector('.favorite');
    heart.addEventListener('click', () => {
      heart.classList.toggle('fa-solid');
      heart.classList.toggle('fa-regular');
      heart.style.color = heart.classList.contains('fa-solid') ? '#1db954' : 'white';
    });
  }

  updateComponent() {
    const title = this.getAttribute('title') || 'Título desconocido';
    const artist = this.getAttribute('artist') || 'Artista desconocido';
    const cover = this.getAttribute('cover') || '';
    const audioSrc = this.getAttribute('audio') || '';

    this.shadowRoot.querySelector('#title').textContent = title;
    this.shadowRoot.querySelector('#artist').textContent = artist;
    this.shadowRoot.querySelector('#cover').src = cover;
    this.shadowRoot.querySelector('#cover').alt = `Portada del álbum de ${artist}`;
    this.shadowRoot.querySelector('#audio').src = audioSrc;
  }
}

customElements.define('music-track', MusicTrack);
