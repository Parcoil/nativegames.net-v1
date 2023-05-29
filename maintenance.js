// make a request to the text file
fetch('maintenance.txt')
  .then(response => response.text())
  .then(text => {
    // check if the text contains the word "true"
    if (text.includes('true')) {
      // redirect to another page
      window.location.href = 'maintenance';
    }
  })
  .catch(error => {
    console.error('Error:', error);
  });
