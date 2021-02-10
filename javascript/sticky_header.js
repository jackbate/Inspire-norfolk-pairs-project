function changeWidth(event) {
  // Fixes bug where changing width causes incorrect adjustment of header height.

  const stickyWrapper = $('#sticker-sticky-wrapper');

  // Medium breakpoint (~ tablet) or above
  if (event.matches) {
    stickyWrapper.css('height', '95px');
  }
  // Mobile (below medium breakpoint)
  else {
    stickyWrapper.css('height', '130px');
  }
}


// Watch for media query and adjust header sticky wrapper height
const mediaQuery = window.matchMedia('(min-width: 768px)');
mediaQuery.addListener(changeWidth);

// Box shadow to apply when scrolling
const boxShadow = '1px 1px 5px 1px #555';

// Make sticky and apply box shadow
$(document).ready(function(){
  $('#sticker')
    .sticky({topSpacing:0,zIndex:5000})
    .css({
      '-webkit-box-shadow': boxShadow,
      '-moz-box-shadow': boxShadow,
      'box-shadow': boxShadow
    })
});
