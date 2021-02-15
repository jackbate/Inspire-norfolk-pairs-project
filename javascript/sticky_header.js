function makeMediaQuery(on, width, callback) {
  const mediaQuery = window.matchMedia(`(${on}: ${width}px)`);
  // Watch for event and execute code passed in the callback
  mediaQuery.addListener(callback);
}

// Make header sticky and apply box shadow when scrolling
$(document).ready(function() {
  const boxShadow = '1px 1px 5px 1px #555';

  $('#sticker')
    .sticky({topSpacing:0,zIndex:5000})
    .css({
      '-webkit-box-shadow': boxShadow,
      '-moz-box-shadow': boxShadow,
      'box-shadow': boxShadow
    })
});

// Fix bug where changing width causes incorrect adjustment of header height.
makeMediaQuery('min-width', 768, (event) => {

  const stickyWrapper = $('#sticker-sticky-wrapper');

  // Medium breakpoint (~ tablet) or above
  if (event.matches) {
    stickyWrapper.css('height', '95px');
  }
  // Mobile (below medium breakpoint)
  else {
    stickyWrapper.css('height', '130px');
  }
});
