let xhr = new XMLHttpRequest();
xhr.open('GET', 'maintenance.txt', true);
xhr.onreadystatechange = function() {
  if (xhr.readyState === 4 && xhr.status === 200) {
    let text = xhr.responseText;
    if (text === 'true') {
      window.location.href = 'maintenance.html';
    }
  }
};
xhr.send();
