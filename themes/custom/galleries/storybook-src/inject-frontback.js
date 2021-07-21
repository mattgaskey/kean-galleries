window.frontback = {
  repo: 'https://gitlab.com/newcity/kean-galleries',
  postUrl: 'https://magicyeti.us/frontback',
};
const script = document.createElement('script');
script.src = frontback.postUrl + '/assets/js/frontback.js';
document.body.appendChild(script);