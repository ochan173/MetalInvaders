$(document).bind('mousemove', function(e) {
  $('#metal').css({
    left: e.pageX + 5,
    top: e.pageY - 40,
  });
});


function genertateNote() {
  var div = document.createElement("div");
  div.innerHTML = "🎵";
  div.className = "double";
  // div.style.cssText = 'left:' + (Math.random() * jQuery(window).width()) + ';';
  div.style.cssText = 'left:300px';

  console.log(div);
  return div;
}
// $('#noteDouble').animate({top: jQuery(window).height() - 65}, 3000);

// $('#noteSimple').animate({top: jQuery(window).height() - 80}, 5000);

// document.createElement('#noteDouble', function(e) {
//   $('#noteDouble').animate({top: jQuery(window).height() - 65}, 3000);
// });

// setInterval(function() {
//   $('body').add($div, function() {
//     $($div).css({
//       left: Math.random() * jQuery(window).width()
//     });
//   }).animate({top: jQuery(window).height() - 65}, 3000);
// }, 1000);

// setInterval(function() {
//   $('body').add(genertateNote()).animate({top: jQuery(window).height() - 65}, 3000);
// }, 1000);

console.log(

  $('body').add(genertateNote()).animate({top: jQuery(window).height() - 65}, 3000)
  );


// setInterval(function() {
// ('#noteDouble', function() {
//     $('#noteDouble').css({
//       left: Math.random() * jQuery(window).width()
//     });
//   }).appendTo('body').animate({top: jQuery(window).height() - 65}, 3000);
// }, 1000);

//  $("body").add('#noteDouble', function() {
//   $('#noteDouble').css({
//     left: (Math.random() * jQuery(window).width()) - 10
//   });
// }).animate({top: jQuery(window).height() - 65}, 3000);

$("body").add('.simple', function() {
  $('#noteSimple').css({
    left: (Math.random() * jQuery(window).width()) - 10
  });
}).animate({top: jQuery(window).height() - 80}, 3000);
