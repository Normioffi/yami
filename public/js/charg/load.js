const p_welc = document.querySelector('p[class="p-welc"]');
const navbar = document.querySelector('nav');
const h1_welc = document.querySelector('h1[class="h1-welc"]');
const footer = document.querySelector('footer[class="site-footer"]');
navbar.style.display = "none";
p_welc.style.display = "none";
h1_welc.style.display = "none";
footer.style.display = "none";
function onReady(callback) {
  var intervalId = window.setInterval(function() {
    if (document.getElementsByTagName('body')[0] !== undefined) {
      window.clearInterval(intervalId);
      callback.call(this);
    
    }
  }, 3000);
}

function setVisible(selector, visible) {
  document.querySelector(selector).style.display = visible ? 'block' : 'none';
}

onReady(function() {
  setVisible('.center', false);
  navbar.style.display = "block";
  p_welc.style.display = "block";
  h1_welc.style.display = "block";
  footer.style.display = "block";
});
