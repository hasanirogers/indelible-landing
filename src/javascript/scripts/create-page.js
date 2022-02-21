const form = document.querySelector('form#create-card');

if (form) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(form);

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
