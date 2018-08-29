'use strict';

function Game () {
  var self = this;

  this.onGameOverCallback = null;
  this.score = 0;
  this.timeLeft = null;
  this.cards = [1, 2, 5, 7, 8, 13, 6, 12, 3, 11, 4, 10, 9]
  this.step = null;
}

Game.prototype.start = function() {
  var self = this;

  self.gameMain = buildDom(`
  <main class="game container">
      <header>
        <div class="score">
          <span class="label">Score:</span>
          <span class="value"></span>
        </div>
        <div class="timer">
          <span class="label">Time left:</span>
          <span class="value"></span>
        </div>
      </header>
      <div class="deck">
        <div class="card current-card"></div>
        <div class="actions">
          <button disabled class="up">up</button>
          <button disabled class="down">down</button>
        </div>
        <div class="card next-card"></div>
      </div>
      <footer>
        <p>
          <span class="label">Step:</span>
          <span class="step-no"></span> / <span class="total-steps"></span>
        </p>
      </footer>
    </main>
    `);

  self.scoreElement = self.gameMain.querySelector('.score .value');
  self.timeLeftElement = self.gameMain.querySelector('.timer .value');
  
  self.currentCardElement = self.gameMain.querySelector('.current-card');
  self.nextCardElement = self.gameMain.querySelector('.next-card');

  self.buttonUp = self.gameMain.querySelector('.up');
  self.buttonDown = self.gameMain.querySelector('.down');

  self.stepNoElement = self.gameMain.querySelector('.step-no');
  self.totalStepsElement = self.gameMain.querySelector('.total-steps');

  document.body.appendChild(self.gameMain);


  
  self.showFirstCard();
}

Game.prototype.showFirstCard = function () {
  var self = this;
  
  self.totalStepsElement.innerText = self.cards.length - 1;
  
  self.step = 0;
  self.showCard();
  self.startTimer();

  
};

Game.prototype.triggerTimeout = function () {
  var self = this;

  self.score--;
  self.scoreElement.innerText = self.score;
  self.nextCard();
};

Game.prototype.nextCard = function () {
  var self = this;

  self.step++;

  if (self.step === self.cards.length -1) {
    self.onGameOverCallback();
  } else {
    self.showCard();
    self.startTimer();
  }

};

Game.prototype.showCard = function () {
  var self = this;

  var currentCard = self.cards[self.step];
  self.currentCardElement.innerText = currentCard;
  self.nextCardElement.innerText = '?';

  self.stepNoElement.innerText = self.step + 1;

  self.handlerClickUp = function () {
    self.revealNumber(true);
  }
  self.buttonUp.addEventListener('click', self.handlerClickUp);
  self.buttonUp.removeAttribute('disabled');


  self.handlerClickDown = function () {
    self.revealNumber(false);
  };
  self.buttonDown.addEventListener('click', self.handlerClickDown);
  self.buttonDown.removeAttribute('disabled');

};

Game.prototype.startTimer = function () {
  var self = this;
  
  self.timeLeft = 3;
  self.timeLeftElement.innerText = self.timeLeft;
  self.intervalId = window.setInterval(function(){
    self.timeLeft--;
    self.timeLeftElement.innerText = self.timeLeft;
  
    if (self.timeLeft === 0) {
      clearInterval(self.intervalId);
      self.triggerTimeout();
    }
  
  }, 1000);  
};

Game.prototype.revealNumber = function (answerWasUp) {
  var self = this;

  clearInterval(self.intervalId);
  self.buttonUp.removeEventListener('click', self.handleClickUp);
  self.buttonUp.setAttribute('disabled', 'disabled');
  self.buttonDown.removeEventListener('click', self.handleClickDown);
  self.buttonDown.setAttribute('disabled', 'disabled');


  var currentCard = self.cards[self.step];
  var nextCard = self.cards[self.step +1];

  var className = '';

  if (answerWasUp && nextCard > currentCard) {
    self.score++;
    className = 'correct';
  } else if (answerWasUp && nextCard < currentCard) {
    self.score--;
    className = 'incorrect';
  } else if (!answerWasUp && nextCard < currentCard) {
    self.score++;
    className = 'correct';
  } else if (!answerWasUp && nextCard > currentCard) {
    self.score--;
    className = 'incorrect';
  }

  self.scoreElement.innerText = self.score;
  
  self.nextCardElement.classList.add(className);
  self.nextCardElement.innerText = nextCard;

  setTimeout(function () {
    self.nextCardElement.classList.remove(className);
    self.nextCard();
  }, 2000);
};

Game.prototype.onOver = function (callback) {
  var self = this;

  self.onGameOverCallback = callback;
};

Game.prototype.destroy = function() {
  var self = this;

  self.gameMain.remove();
};