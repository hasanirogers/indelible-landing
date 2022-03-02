const form = document.querySelector('form');

if (form) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const pageType = form.querySelector('indelible-page-type');
    const message = form.querySelector('.message');

    formData.append('mediaType', pageType.mediaType);
    formData.append('mediaURL', pageType.mediaURL);

    const resetMessage = () => {
      setTimeout(() => {
        message.classList.remove('message--error');
        message.classList.remove('message--success');
        message.innerHTML = '';
      }, 3000);
    };

    const config = {
      method: 'POST',
      body: JSON.stringify(Object.fromEntries(formData)),
      headers: {
        "Content-Type": "application/json"
      }
    };

    for (var [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }

    fetch(form.action, config)
      .then(response => response.text())
      .then(text => {
        try {
          const response = JSON.parse(text);

          if (response.code == 200) {
            message.classList.add('message--success');
            message.innerHTML = 'Saved successfully!';
            resetMessage();
          } else {
            message.classList.add('message--error');
            message.innerHTML = 'The server returned a 500 while trying to save. Please make sure all form fields are filled out correctly.';
          }
        } catch (error) {
          message.classList.add('message--error');
          message.innerHTML = 'The data sent back from the server was not JSON. Check the console for details.';
          console.error(error);
        }
      })
      .catch(error => {
        message.classList.add('message--error');
        message.innerHTML = 'A network error was encountered';
        console.error(error);
      });
  });
}
