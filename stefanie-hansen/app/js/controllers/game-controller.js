'use strict';

module.exports = function(app) {
  app.controller('GameController', GameController);
};

function GameController() {
  this.hasWeapon = false;
  this.alive = true;
  this.location = 'monsterRoom';
  this.gameLog = [];
  this.input = '';
  this.actions = ['hyperventilate', 'pick up weapon', 'leave', 'philosophize', 'whimper', 'poke', 'call mom', 'taunt', 'yolo', 'reason', 'hadouken'];

  this.weaponRoom = {};
  this.weaponRoom.noWeaponActions = {
    'hyperventilate': this.hyperventilate,
    'pick up weapon': this.pickUpWeapon,
    'leave': this.exit
  };
  this.weaponRoom.hasWeaponActions = {
    'philosophize': this.philosophize,
    'leave': this.exit
  };

  this.monsterRoom = {};
  this.monsterRoom.noWeaponActions = {
    'whimper': this.whimper,
    'poke': this.poke,
    'call mom': this.callMom,
    'taunt': this.taunt,
    'leave': this.exit
  };
  this.monsterRoom.hasWeaponActions = {
    'yolo': this.yolo,
    'reason': this.reason,
    'hadouken': this.hadouken,
    'leave': this.exit
  };
}

GameController.prototype.action = function() {
  let input = this.input.toLowerCase();
  console.log(input);
  if (!input || this.actions.indexOf(input) === -1) {
    this.tryAgain();
  }
  else if (this.location === 'monsterRoom') {
    if (this.hasWeapon === false) {
      this.monsterRoom.noWeaponActions[input].call(this);
    }
    this.monsterRoom.hasWeaponActions[input].call(this);
  }
  else if (this.hasWeapon === false) {
    this.weaponRoom.noWeaponActions[input].call(this);
  }
  this.weaponRoom.hasWeaponActions[input].call(this);
};

GameController.prototype.tryAgain = function() {
  this.gameLog.push('Sorry, that is not a valid command. Enter ? to see the actions available in this room.');
};

GameController.prototype.seeActions = function() {
  let location = (this.location === 'monsterRoom') ? this.monsterRoom : this.weaponRoom;
  let actions = (this.hasWeapon === true) ? location.hasWeaponActions : location.noWeaponActions;
  for (let i = 0; i < actions.length; i++) {
    this.gameLog.push(actions[i]);
  }
  return this.gameLog;
};

GameController.prototype.hyperventilate = function() {
  if (this.location === 'weaponRoom' && this.hasWeapon === false) {
    return this.gameLog.push('You get lightheaded and make poor decisions');
  }
  this.tryAgain();
};

GameController.prototype.pickUpWeapon = function() {
  if (this.location === 'weaponRoom' && this.hasWeapon === false) {
    this.hasWeapon === true;
    return this.gameLog.push('You are now in possession of a feral weasel. Congratulations?');
  }
  this.tryAgain();
};

GameController.prototype.philosophize = function() {
  if (this.location === 'weaponRoom' && this.hasWeapon === true) {
    return this.gameLog.push('You consider the moral and ethical implications of killing another lifeform. But you decide that you\'d be doing the monster a favor, as he knows no life beyond those four digital walls.');
  }
  this.tryAgain();
};

GameController.prototype.poke = function() {
  if (this.location === 'monsterRoom' && this.hasWeapon === false) {
    this.alive = false;
    return this.gameLog.push('You edge toward the monster and poke him, then giggle again run away. The monster is furious and decapitates you in one fell chomp.');
  }
  this.tryAgain();
};

GameController.prototype.whimper = function() {
  if (this.location === 'monsterRoom' && this.hasWeapon === false) {
    return this.gameLog.push('You whimper softly in the corner, hoping that the monster will let you live out your days... until you die of starvation. You should probably try to kill the monster so at least you have something to eat.');
  }
  this.tryAgain();
};

GameController.prototype.callMom = function() {
  if (this.location === 'monsterRoom' && this.hasWeapon === false) {
    this.alive = false;
    return this.gameLog.push('You try to express your situation to your mother, but she thinks that you\'ve had too much to drink. Your dependence on your mother annoys the monster and he impales you with a talon.');
  }
  this.tryAgain();
};

GameController.prototype.callMom = function() {
  if (this.location === 'monsterRoom' && this.hasWeapon === false) {
    return this.gameLog.push('You taunt the monster and he is taken aback with your stupidity. He remains lost in thought.');
  }
  this.tryAgain();
};

GameController.prototype.exit = function() {
  this.location === 'monsterRoom' ? this.location = 'weaponRoom' : this.location = 'monsterRoom';
  this.gameLog.push('You walk into the adjacent room.');
};
