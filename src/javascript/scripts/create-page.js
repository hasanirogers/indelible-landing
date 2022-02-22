const form = document.querySelector('form#create');

if (form) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const pageType = form.querySelector('indelible-page-type');

    formData.append('mediaType', pageType.mediaType);
    formData.append('mediaURL', pageType.mediaURL);

    for (var [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }

    fetch(form.action, {
      method: 'POST',
      body: JSON.stringify(Object.fromEntries(formData)),
      headers: {
        "Content-Type": "application/json"
      }
    });
  });
}
