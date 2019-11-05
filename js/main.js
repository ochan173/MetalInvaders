pts = 0;
interval = 1000;
intervalId = 0;
initGame();

/**
 * Commence un nouvel intervalle de temps pour ajouter des notes
 */
function startInterval() {
  intervalId = setInterval(notePlayer, interval);
}

/**
 * Permet de déterminer la prochaine note à invoquer
 */
function notePlayer() {
  if (!verifierFinDePartie()) {
    if (Math.random() * 10 + 1 > 9) {
      generateNoteDouble();
    } else {
      generateNoteSimple();
    }
  } else {
    finirPartie();
  }
}

/**
 * Réduit l'intervalle d'apparition des notes
 */
function reduireInterval() {
  if (interval > 100) {
    interval -= 75;
    clearInterval(intervalId);
    startInterval(interval);
  }
}

function finirPartie() {
  $('.simple').stop().unbind(verifierMouseEnter());
  $('.double').stop().unbind(verifierDblClick());
  $('.enJeu').fadeOut(300, function() {
    $('.enJeu').remove();
  });
  afficherGameOver();
}

function afficherGameOver() {
  $('<div class="gameOver>Game Over</div>"').appendTo('body');
}

/**
 * Vérifie si l'élément se fait hover par la souris
 * @param {*} div Élément à vérifier
 */
function verifierMouseEnter(div) {
  $(div).mouseenter(function() {
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

function verifierFinDePartie() {
  return pts < 0;
}

/**
 * Permet de générer une note double sur le tableau de jeu
 */
function generateNoteDouble() {
  div = document.createElement('div');
  div.innerHTML = '🎵';
  div.className = 'double enJeu';
  div.style.cssText = 'left:' + (Math.random() * jQuery(window).width() - 20) + 'px;';
  animerDouble(div);
  $(div).bind(verifierDblClick(div));
}

/**
 * Permet de générer une note simple sur le tableau de jeu
 */
function generateNoteSimple() {
  div = document.createElement('div');
  div.innerHTML = '𝅘𝅥𝅮';
  div.className = 'simple enJeu';
  div.style.cssText = 'left:' + (Math.random() * jQuery(window).width() - 25) + 'px;';
  animerSimple(div);
  $(div).bind(verifierMouseEnter(div));
}

function animerSimple(div) {
  $(div).appendTo('body').animate({top: jQuery(window).height() - 90}, 4000, function() {
    retirerPoints(div.innerHTML);
    $(div).removeClass('enJeu');
    $(div).unbind(verifierMouseEnter(div));
  });
}

function animerDouble(div) {
  $(div).appendTo('body').animate({top: jQuery(window).height() - 80}, 5000, function() {
    retirerPoints(div.innerHTML);
    $(div).removeClass('enJeu');
    $(div).unbind(verifierDblClick(div));
  });
}

/**
 * Génère le texte qui affiche le pointage
 */
function genererPointage() {
  $('#pointage').text(pts);
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
  genererPointage();
}

/**
 * Retire des points au joueur
 * @param {*} note
 */
function retirerPoints(note) {
  if (note == '𝅘𝅥𝅮') {
    pts -= 20;
  } else if (note == '🎵') {
    pts -= 200;
  }
  genererPointage();
}

/**
 * Initialise les paramètres pour le jeu
 */
function initGame() {
  bindMouse();
  remouveRightclickMenu();
  genererPointage();
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
