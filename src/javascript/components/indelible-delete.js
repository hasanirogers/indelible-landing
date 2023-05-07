import { html, css, LitElement } from 'lit';

class IndelibleDelete extends LitElement {
  static get styles() {
    return [
      css`
        :host {
          display: inline-flex;
        }
      `
    ];
  }

  static get properties() {
    return {
      pageID: {
        type: String,
        attribute: 'page-id'
      },
    }
  }

  render() {
    return html`
      <form action="/delete" @submit=${(event) => this.submitForm(event)}>
        <sl-button variant="default" size="large" @click=${() => this.handleClick()}>
          Delete <sl-icon slot="suffix" name="trash"></sl-icon>
        </sl-button>
        <sl-dialog label="Delete this page?">
          Are you sure you want to delete this page?
          <sl-button slot="footer" variant="primary" type="submit">Yes</sl-button>
        </sl-dialog>
        <input type="hidden" name="pageID" value=${this.pageID} />
      </form>
    `;
  }

  handleClick() {
    const dialog = this.shadowRoot.querySelector('sl-dialog');
    dialog.show();
  }

  submitForm(event) {
    event.preventDefault();

    const form = this.shadowRoot.querySelector('form');
    const formData = new FormData(form);

    const config = {
      method: 'POST',
      body: JSON.stringify(Object.fromEntries(formData)),
      headers: {
        "Content-Type": "application/json"
      }
    };

    fetch(form.action, config)
      .then(response => response.text())
      .then(text => {
        try {
          const response = JSON.parse(text);

          if (response.code == 200) {
            window.location.reload();
          } else {
            alert('There was a problem deleting the page.');
          }
        } catch (error) {
          console.error(error);
        }
      })
      .catch(error => {
        console.error(error);
      });
  }
}

window.customElements.define('indelible-delete', IndelibleDelete);
