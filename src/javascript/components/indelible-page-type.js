import { html, css, LitElement } from 'lit';
import '@shoelace-style/shoelace/dist/components/radio/radio.js';
import '@shoelace-style/shoelace/dist/components/radio-group/radio-group.js';
import '@shoelace-style/shoelace/dist/components/input/input.js';

class IndeliblePageType extends LitElement {
  static get styles() {
    return [
      css`
        :host {
          display: flex;
        }

        section {
          width: 100%;
          margin: 1rem 0;
          display: grid;
          gap: 2rem;
          align-items: center;
          grid-template-columns: auto 1fr;
        }

        sl-radio {
          display: inline-flex;
          margin: 1rem 1rem 1rem 0;
        }
      `
    ];
  }

  static get properties() {
    return {
      mediaType: {
        type: String
      },
      mediaLabel: {
        type: String
      },
      mediaURL: {
        type: String
      }
    }
  }

  constructor() {
    super();

    this.mediaType = 'audio';
    this.mediaLabel = "Enter a url for the audio track.";
    this.mediaURL = "";
  }

  render() {
    return html`
      <section>
        <sl-radio-group label="Select a media type." fieldset>
          <sl-radio value="audio" @sl-change=${event => this.handleRadio(event)} checked>Audio</sl-radio>
          <sl-radio value="video" @sl-change=${event => this.handleRadio(event)}>Video</sl-radio>
        </sl-radio-group>
        <sl-input name="media" type="url" label=${this.mediaLabel} @sl-change=${event => this.handleInput(event)}></sl-input>
      </section>
    `;
  }

  handleRadio(event) {
    this.mediaType = event.target.value;

    if (this.mediaType === 'audio') this.mediaLabel = "Enter a url for the audio track.";
    if (this.mediaType === 'video') this.mediaLabel = "Enter a url for the video.";
  }

  handleInput(event) {
    this.mediaURL = event.target.value;
  }
}

window.customElements.define('indelible-page-type', IndeliblePageType);
