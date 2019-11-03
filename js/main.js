pts = 0;
interval = 1000;
intervalId = 0;
initGame();

function startInterval() {
  // Store the id of the interval so we can clear it later
  intervalId = setInterval(notePlayer, interval);
}

/**
 * Permet de déterminer la prochaine note à invoquer
 */
function notePlayer() {
  genererPointage();
  if (Math.random() * 10 + 1 > 9) {
    generateNoteDouble();
  } else {
    generateNoteSimple();
  }
}


function reduireInterval() {
  if (interval > 100) {
    interval -= 75;
    clearInterval(intervalId);
    startInterval(interval);
  }
}

/**
 * Vérifie si l'élément se fait hover par la souris
 * @param {*} div Élément à vérifier
 */
function verifierMouseOver(div) {
  $(div).mouseover(function() {
    $(div).stop();
    ajouterPoints(20);
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
    ajouterPoints(50);
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
  div.style.cssText = 'left:' + (Math.random() * jQuery(window).width() - 30) + 'px;';
  $(div).appendTo('body').animate({top: jQuery(window).height() - 80}, 5000);
  $(div).bind(verifierDblClick(div));
}

/**
 * Permet de générer une note simple sur le tableau de jeu
 */
function generateNoteSimple() {
  div = document.createElement('div');
  div.innerHTML = '𝅘𝅥𝅮';
  div.className = 'simple';
  div.style.cssText = 'left:' + (Math.random() * jQuery(window).width() - 25) + 'px;';
  $(div).appendTo('body').animate({top: jQuery(window).height() - 90}, 4000);
  $(div).bind(verifierMouseOver(div));
}

/**
 * Génère le texte qui affiche le pointage
 */
function genererPointage() {
  $('#pointage').text(pts + '   int : ' + interval);
  $('#pointage').css({
    fontSize: 30,
    paddingLeft: 10,
  });
}

/**
 * Retire une note du jeu
 * @param {*} div Note à retirer
 */
function retirerNote(div) {
  $(div).fadeOut(400, function() {
    $(div).remove();
  });
}

/**
 * Ajoute des points au joueur
 * @param {*} points Nombre de points à ajouter
 */
function ajouterPoints(points) {
  pts += points;
}

/**
 * Initialise les paramètres pour le jeu
 */
function initGame() {
  bindMouse();
  remouveRightclickMenu();
  startInterval();
  setInterval(reduireInterval, 3000);
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
