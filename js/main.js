initGame();
setInterval(NotePlayer, 1000);

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
 * Vérifie si l'élément se fait hover par la souris
 * @param {*} div Élément à vérifier
 */
function verifierMouseOver(div) {
  $(div).mouseover(function() {
    $(div).stop();
    retirerNote(div);
  });
}

/**
 * Vérifie si l'élément se fait double clique par la souris
 * @param {*} div Élément à vérifier
 */
function verifierDblClick(div) {
  $(div).dblclick(function() {
    $(div).stop();
    retirerNote(div);
  });
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
  $(div).bind(verifierDblClick(div));
}

/**
 * Permet de générer une note simple sur le tableau de jeu
 */
function generateNoteSimple() {
  div = document.createElement('div');
  div.innerHTML = '𝅘𝅥𝅮';
  div.className = 'simple';
  div.style.cssText = 'left:' + (Math.random() * jQuery(window).width() -10) + 'px;';
  $(div).appendTo('body').animate({top: jQuery(window).height() - 80}, 3000);
  $(div).bind(verifierMouseOver(div));
}

function retirerNote(note) {
  $(note).fadeOut(200);
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
      top: e.pageY - 15,
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
