let quickHideEnabled = true;
document.addEventListener('keydown', function(event) {
console.log(event)
if((event.key == "q" || event.key == "Q") && event.altKey) {
  event.preventDefault();
  quickHideEnabled = !quickHideEnabled
} else if ((event.key == "q" || event.key == "Q") && quickHideEnabled == true) {
  document.write()
  window.location = "https://clever.com"
}
})


