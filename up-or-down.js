'use strict';

function buildDom(html) {
  var div = document.createElement('div');
  div.innerHTML = html;
  return div.children[0];
}

function main () {

  var splashMain;
  var gameOverMain;

  var game; //instance of Game

  // ----- splash


  var gameMain;

  function buildSplash() {
    splashMain = buildDom(`
      <main>
        <h1>Up or Down</h1>
        <button>Start</button>
      </main>
    `);
    
    document.body.appendChild(splashMain);

    var button = splashMain.querySelector('button');
    button.addEventListener('click', startGame);
  }

  function destroySplash () {
    splashMain.remove();
  }

  

  // ----- game

  function startGame () {
    destroySplash();
    destroyGameOver();

    
    
    game = new Game();
    game.start();
    game.onOver(function(){
      gameOver(game.score);
    });
    
  }


  function destroyGame() {
    game.destroy();
    
  }

  // ----- game over

  function gameOver (score) {
    destroyGame();
    buildGameOver(score);
  }

  function buildGameOver(score) {

    gameOverMain = buildDom(`
      <main>
        <h1>Game Over</h1>
        <p>Your score ` + score + `</p>
        <button>restart</button>
      </main>
    `);

    var button = gameOverMain.querySelector('button');
    button.addEventListener('click', startGame);

    document.body.appendChild(gameOverMain);
  }

  function destroyGameOver() {
    if (gameOverMain) {
      gameOverMain.remove();
    }
  }

  // ----- initialize

  buildSplash();
}

window.addEventListener('load', main)