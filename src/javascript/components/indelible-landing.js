import { html, css, LitElement } from 'lit';

class IndelibleLanding extends LitElement {
  static get styles() {
    return [
      css`
        :host {
          display: flex;
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
        type: String
      },
      lastName: {
        type: String
      },
      message: {
        type: String
      }
    }
  }


  render() {
    if (this.media === 'audio') {
      return html`
        <audio controls>
          <source src=${this.convertURL(this.url)} type="audio/mpeg">
          Your browser does not support the audio element.
        </audio>
      `;
    }

    return html`
      <video width="320" height="240" controls autoplay>
        <source src=${this.convertURL(this.url)} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    `;
  }

  convertURL(url) {
    return url.replace('?dl=0', '?raw=1');
  }
}

window.customElements.define('indelible-landing', IndelibleLanding);
