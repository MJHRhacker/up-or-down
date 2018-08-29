'use strict';

function main () {

  // ----- splash
  function buildDom(html) {
    var div = document.createElement('div');
    div.innerHTML = html;
    return div.children[0];
  }

  var splashMain;
  var gameMain;
  var gameOverMain;

  function buildSplash() {
    splashMain = document.createElement('splashMain');
    var h1 = document.createElement('h1');
    var button = document.createElement('button');

    button.innerText = 'Start';
    h1.innerText = 'up or down';

    splashMain.appendChild(h1);
    splashMain.appendChild(button);


    document.body.appendChild(splashMain);

    button.addEventListener('click', startGame);
  }

  function destroySplash () {
    splashMain.remove();
  }

  

  // ----- game

  function startGame () {
    destroySplash();
    destroyGameOver();

    // ---- temporary!!
    
    gameMain = buildDom(`
      <main>
        <h1>This is the game</h1>
      </main>
    `);
  
    document.body.appendChild(gameMain);
  
    window.setTimeout(function(){
      gameOver();
    }, 3000);
  }



  function destroyGame() {
    gameMain.remove();
  }

  // ----- game over

  function gameOver () {
    destroyGame();
    buildGameOver();
  }

  function buildGameOver() {
    
    //---- @todo score
    var score = 99;

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