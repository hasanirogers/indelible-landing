import { html, css, LitElement } from 'lit';

class IndelibleLanding extends LitElement {
  static get styles() {
    return [
      css`
        :host {
          display: flex;
          min-height: 100vh;
        }

        p {
          text-align: center;
          padding: 2rem;
        }

        audio {
          width: 100%;
          position: fixed;
          bottom: 0;
        }

        video {
          width: 100%;
          height: 100%;
          aspect-ratio: 16 / 9;
        }

        h1 {
          font-size: 1rem;
          line-height: 1.2;
          text-align: center;
        }

        img {
          margin: 3rem 0;
          opacity: 0;
          pointer-events: none;
          transition: opacity 1s ease;
        }

        img.show {
          opacity: 1;
        }

        .video img {
          margin: 0;
          max-width: 20vh;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%,-50%);
        }

        h1 div {
          font-size: clamp(1.5rem, 4vw, 2.5rem);
        }

        h1 span {
          font-size: 1.25rem;
        }

        main > section {
          position: relative;
        }

        main.audio {
          display: flex;
          flex-direction: column;
          margin: auto;
          min-height: 100vh;
          align-items: center;
          justify-content: center;
        }

        main.video {
          display: grid;
          grid-template-rows: 1fr auto;
          align-items: center;
          justify-content: center;
          margin: auto;
          width: 100%;
        }

        .link {
          position: fixed;
          top: 2rem;
          right: 2rem;
          z-index: 1;
          text-decoration: none;
        }
      `
    ];
  }

  static get properties() {
    return {
      url: {
        type: String,
      },
      media: {
        type: String,
      },
      email: {
        type: String
      },
      firstName: {
        type: String,
        attribute: 'first-name'
      },
      lastName: {
        type: String,
        attribute: 'last-name'
      },
      message: {
        type: String
      },
      showLogo: {
        type: Boolean
      },
      websiteLink: {
        type: String,
        attribute: 'website-link',
      },
      websiteLinkLabel: {
        type: String,
        attribute: 'website-link-label'
      },
    }
  }

  firstUpdated() {
    if (this.media === 'video') {
      const video = this.shadowRoot.querySelector('video');

      video.addEventListener('ended', () => {
        this.showLogo = true;
      });

      video.addEventListener('play', () => {
        this.showLogo = false;
      });
    }
  }


  render() {
    if (this.media === 'audio') {
      return html`
        <main class="audio">
          ${this.websiteLink ? html`<a href="${this.websiteLink}" class="link">${this.websiteLinkLabel}</a>` : null}
          <audio controls autoplay>
            <source src=${this.convertURL(this.url)} type="audio/mpeg">
            Your browser does not support the audio element.
          </audio>
          <h1>
            <span>Thank you for allowing</span>
            <div>Indelible Impressions & Designs</div>
            to assist with sharing this memory.
          </h1>
          <img class="show" src="/assets/images/logo.png" alt="Indelible Impression & Designs"/>
          ${this.makeMessage()}
        </main>
      `;
    }

    return html`
      <main class="video">
        ${this.websiteLink ? html`<a href="${this.websiteLink}" class="link">${this.websiteLinkLabel}</a>` : null}
        <section>
          <video width="1920" height="1080" controls autoplay>
            <source src=${this.convertURL(this.url)} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <img class="${this.showLogo ? 'show' : ''}" src="/assets/images/logo.png" alt="Indelible Impression & Designs"/>
        </section>
        <section>
          <h1>
            <span>Thank you for allowing</span>
            <div>Indelible Impressions & Designs</div>
            to assist with sharing this memory.
          </h1>
          ${this.makeMessage()}
        </section>
      </main>
    `;
  }

  convertURL(url) {
    return url.replace('?dl=0', '?raw=1');
  }

  makeMessage() {
    if (this.message) {
      return html`<p>${this.message}</p>`;
    }

    return null;
  }
}

window.customElements.define('indelible-landing', IndelibleLanding);
