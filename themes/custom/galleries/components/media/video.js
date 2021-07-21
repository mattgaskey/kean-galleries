const setUpVideo = () => {
  if (!window.jQuery) return;

  const initVideos = () => {
    jQuery(document).ready(() => {
      jQuery('.popup-iframe').magnificPopup({
        // disableOn: 700,
        type: 'iframe',
        mainClass: 'mfp-fade',
        removalDelay: 160,
        preloader: false,
        fixedContentPos: true
      });
    });
  };

  if (jQuery.magnificPopup) {
    initVideos();
  } else {
    const script = document.createElement('script');
    script.src = '//cdnjs.cloudflare.com/ajax/libs/magnific-popup.js/1.1.0/jquery.magnific-popup.min.js';
    script.onload = initVideos;
    document.head.appendChild(script);
  }
};

if (top === self) setUpVideo();

export default setUpVideo;