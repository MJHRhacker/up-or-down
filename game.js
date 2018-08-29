'use strict';

function Game () {

}

Game.prototype.start = function() {

  this.gameMain = buildDom(`
  <main class="game container">
    <header>
      <div class="score">
        <span class="label">Score:</span>
        <span class="value">203</span>
      </div>
      <div class="timer">
        <span class="label">Time left:</span>
        <span class="value">3</span>
      </div>
    </header>

    <div class="deck">
      <div class="card current-card">5</div>
      <div class="actions">
        <button class="up">up</button>
        <button class="down">down</button>
      </div>
      <div class="button"></div>
      <div class="card next-card">6</div>
    </div>
    
    <footer>
      <p>
        <span class="label">Step:</span>
        <span class="step-no">1</span> / <span class="total-steps">51</span>
      </p>
    </footer>
  </main>
    `);

  document.body.appendChild(this.gameMain);
}

Game.prototype.destroy = function() {
  this.gameMain.remove();
}