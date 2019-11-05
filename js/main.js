pts = 0;
interval = 1000;
intervalId = 0;
initGame();

/**
 * Commence un nouvel intervalle de temps pour ajouter des notes
 */
function startInterval() {
  console.log(intervalId);
  if (!verifierFinDePartie()) {
    intervalId = setInterval(notePlayer, interval);
  } else {
    clearInterval(intervalId);
  }
}

/**
 * Permet de déterminer la prochaine note à invoquer
 */
function notePlayer() {
  if (!verifierFinDePartie()) {
    if (Math.random() * 10 + 1 > 9) {
      genererNoteDouble();
    } else {
      genererNoteSimple();
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
  clearInterval(intervalId);
  $('.simple').stop().unbind(verifierMouseEnter());
  $('.double').stop().unbind(verifierDblClick());
  $('.enJeu').fadeOut(300, function() {
    $('.enJeu').remove();
  });
  afficherGameOver();
}

function afficherGameOver() {
  $('<div class="gameOver"><div class="texte">Game Over</div></div>').appendTo('body');
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
function genererNoteDouble() {
  div = document.createElement('div');
  div.innerHTML = '🎵';
  div.className = 'double enJeu';
  div.style.cssText = 'left:' + (Math.random() * window.innerWidth - 25) + 'px;';
  animerDouble(div);
  $(div).bind(verifierDblClick(div));
}

/**
 * Permet de générer une note simple sur le tableau de jeu
 */
function genererNoteSimple() {
  div = document.createElement('div');
  div.innerHTML = '𝅘𝅥𝅮';
  div.className = 'simple enJeu';
  // div.style.cssText = 'left:' + (Math.random() * jQuery(window).width() - 25) + 'px;';
  div.style.cssText = 'left:' + (Math.random() * window.innerWidth - 25) + 'px;';
  animerSimple(div);
  $(div).bind(verifierMouseEnter(div));
}

function genererNoteSimple2() {
  note = $('body').append('<div class="simple enJeu">𝅘𝅥𝅮</div>')
      .css({left: Math.random() * window.innerWidth} + 'px;');
  animerSimple2(note);
}

function animerSimple2(div) {
  div.animate({top: jQuery(window).height() - 90}, 4000, function() {
    retirerPoints(div.innerHTML);
    $(div).removeClass('enJeu');
    $(div).unbind(verifierMouseEnter(div));
  });
}

/**
 * Anime une note simple
 * @param {*} div Note à animer
 */
function animerSimple(div) {
  $(div).appendTo('body').animate({top: jQuery(window).height() - 90}, 4000, function() {
    retirerPoints(div.innerHTML);
    $(div).removeClass('enJeu');
    $(div).unbind(verifierMouseEnter(div));
  });
}

/**
 * Anime une note double
 * @param {*} div Note à animer
 */
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
