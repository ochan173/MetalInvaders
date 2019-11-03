initGame();
setInterval(NotePlayer, 3000);

$( '.simple' ).hover(function() {
  retirerNote();
});

/**
 * Permet de déterminer la prochaine note à invoquer
 */
function NotePlayer() {
  if (Math.random() * 10 + 1 > 9) {
    generateNoteDouble();
  } else {
    generateNoteSimple();
  }
}

/**
 * Permet de générer une note double sur le tableau de jeu
 */
function generateNoteDouble() {
  div = document.createElement('div');
  div.innerHTML = '🎵';
  div.className = 'double';
  div.style.cssText = 'left:' + (Math.random() * jQuery(window).width() -15) + 'px;';
  $(div).appendTo('body').animate({top: jQuery(window).height() - 70}, 3000);
}

/**
 * Permet de générer une note simple sur le tableau de jeu
 */
function generateNoteSimple() {
  div = document.createElement('div');
  div.innerHTML = '𝅘𝅥𝅮';
  div.className = 'simple';
  // div.mouseover = retirerNote();
  div.style.cssText = 'left:' + (Math.random() * jQuery(window).width() -10) + 'px;';

  $(div).appendTo('body').animate({top: jQuery(window).height() - 80}, 3000);
}

function retirerNote() {
  $('.simple').fadeOut(200);
}

/**
 * Initialise les paramètres pour le jeu
 */
function initGame() {
  bindMouse();
  remouveRightclickMenu();
}

/**
 * Attache l'élément qui suivra le curseur au curseur
 */
function bindMouse() {
  $(document).bind('mousemove', function(e) {
    $('#metal').css({
      left: e.pageX + 5,
      top: e.pageY - 20,
    });
  });
}

/**
 * Retirer le menu contextuel du click droit de la souris
 */
function remouveRightclickMenu() {
  $(document).contextmenu(function() {
    return false;
  });
}
