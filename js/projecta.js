//Global variables
var prev = 0;
var logo = $('.nav li:first-child')[0].outerHTML;
var count = countFunc();
var enabled=false;
var require=false;
//Count
function countFunc() {
  var w = window.innerWidth;
  var x = $('.nav-c > li > a').length;
    return (x)/2;
};
//Closing & Opening Functions
function navClose() {
  $('.nav-c').css('transition', 'right .6s').css('right', -$('.nav-c').width());
  $('.overlay').css('backgroundColor', 'rgba(255, 255, 255, 0)');
  $('body').removeClass('noScroll');
  setTimeout(function() {
    $('.overlay').hide().css('transition', 'background-color .6s');
    $('.nav-c').css('transition', 'none');
  }, 600);
};
function navOpen() {
  $('.nav-c').css('transition', 'right .6s').css('right', '0');
  $('.overlay').show().css('backgroundColor', 'rgba(0, 0, 0, 0.5)');
  $('body').addClass('noScroll');
  setTimeout(function() {
    $('.nav-c').css('transition', 'none');
    $('.overlay').css('transition', 'background-color .6s');
  }, 600);
};
//Resize Function
function resize() {
  var w = window.innerWidth;
  var navHeight = $('.nav').height()+$('.nav-c').height();
  var item_count = $('.nav-c > li > a').length;
  item_width = 100;
  if (w > 1023) {
    navHeight = $('.nav-c').height();
    item_width = 50/item_count;
  };
  if (w <= 435) { //I'm using 436 pixels as the mobile margin
  $('.nav-c').css('right', -$('.nav-c').width());
  $('.content').css('marginTop', $('.nav').height());
  $('body').removeClass('noScroll');
  $('.overlay').hide().css('backgroundColor', 'rgba(255, 255, 255, 0)');
} else {
  if (w < 648) {
    item_width = 100/item_count;
  } else {
    item_width = 80/item_count;
  };
  $('.nav-c').css('right', 0);
  $('.content').css('marginTop', navHeight);
};
  if (w > 1023 && ($('.brand').hasClass('brand-left') === false) && ($('.brand').hasClass('brand-right') === false)) {
  $('.first').css('marginLeft', 0);
  $('.last').css('marginRight', 0);
};
  $('.item').css('width', item_width + '%');
  console.log(item_width);
};
//Navscroll Function
function navScroll(scroll) {
  var w = window.innerWidth;
  var current = $(window).scrollTop();
  var navHeight = $('.nav').height()+1;
  if (w >= 435) {
    var navHeight = navHeight+$('.nav-c').height();
  };
  if(w<1024) {
    if (current > prev) {//Scrolling Down
      if (current < navHeight) {
        $('.nav').css('top', -current + 'px');
      } else {
        $('.nav').css('top', -navHeight + 'px');
      };
    } else {//Scrolling Up
      $('.nav').css('top', 0 + 'px');
    };
  };
  return current;
};
//Logo Thing
function logoMove() {
  //Test Width
  var w = window.innerWidth;
  if(w > 1023) {
    require=true;
  } else {
    require=false;
  };
  var brand_pos = 0;
  var logo_offset = 1;
  if ($('.brand').hasClass('brand-left')) {
    logo_offset = 1;
    brand_pos = 1;
    if (w > 1023) {
      $('.first').css('marginLeft', '25%');
      $('.brand').css('marginRight', 'auto');
      $('.brand').css('marginRight', parseInt($('.brand').css('marginRight'))-10);
    } else {
      $('.first').css('marginLeft', '0');
    }
  } else if ($('.brand').hasClass('brand-right')) {
    logo_offset = 0;
    brand_pos = $('.nav-c > li').length;
    if (w > 1023) {
      $('.last').css('marginRight', '25%');
      $('.brand').css('marginLeft', 'auto');
    } else {
       $('.last').css('marginRight', '0');
     }

  } else {
    brand_pos = count+1;
    if (w < 1024) {
      $('.last').css('marginRight', '0');
      $('.first').css('marginLeft', '0');
    } else {
      $('.last').css('marginRight', '25%');
      $('.first').css('marginLeft', '25%');
    }
  };
  //Enable/Disable
  if(require===true && enabled===false) {
    enabled=true;
    $('.nav > li:first-child').remove(); //taking logo out of nav
    $('.nav-c li:nth-child('+ (brand_pos) + ')').after(logo); //place in nav-c
  } else if(require===false && enabled===true) {
    enabled=false;
    $('.nav > li').before(logo); //place back in nav
    $('.nav-c li:nth-child(' + (brand_pos + logo_offset) + ')').remove();
  };
};

$(document).ready(function() {
  window.addEventListener("orientationchange", function() {}, false);
  //Ready Functions
  $('.overlay').hide();
  resize();
  logoMove();
  //On Resize
  $(window).resize(function() {
    resize();
    logoMove();
  });
  //On Orientation Change
  $(window).on( "orientationchange", function() {
    resize();
  });
  //Clicking on burger function
  $('.nav-t').click(function() {
    navOpen();
  });
  //Close burger navbar function
  $('.close').click(function() {
    navClose();
  });
  //Close by clicking Overlay
  $('.overlay').click(function() {
    navClose();
  });
  //Navbar Slides up or down on scroll
  $(window).scroll(function() {
    prev = navScroll(prev);
  });
});
