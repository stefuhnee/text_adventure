'use strict';

const angular = require('angular');
require('angular-mocks');
require('../app/js/client');

describe('Controller tests', () => {
  let gameCtrl;

  beforeEach(() => {
    angular.mock.module('AdventureApp');
    angular.mock.inject(($controller) => {
      gameCtrl = new $controller('GameController');
    });
  });

  it('should have the property hasWeapon, initialized as false', () => {
    expect(gameCtrl.hasWeapon).toBe(false);
  });

  it('should have the property alive, initialized as true', () => {
    expect(gameCtrl.alive).toBe(true);
  });

  it('should have the property location, initialized as monsterRoom', () => {
    expect(gameCtrl.location).toBe('monsterRoom');
  });

  it('should have a game log property', () => {
    expect(Array.isArray(gameCtrl.gameLog)).toBe(true);
  });

  it('should have an input property', () => {
    expect(typeof gameCtrl.input).toBe('string');
  });

  it('should have an actions property', () => {
    expect(Array.isArray(gameCtrl.actions)).toBe(true);
  });

  it('should have game state properties', () => {
    expect(typeof gameCtrl.weaponRoom).toBe('object');
    expect(typeof gameCtrl.monsterRoom).toBe('object');
  });

  describe('Action method tests', () => {

    it('should respond to empty or unsupported inputs', () => {
      gameCtrl.input = 'test';
      gameCtrl.action();
      expect(gameCtrl.gameLog[0]).toBe('Sorry, that is not a valid command. Enter ? to see the actions available in this room.');
    });

    it('should respond to an ? input with possible actions', () => {
      gameCtrl.input = '?';
      gameCtrl.action();
      expect(gameCtrl.gameLog.length).toBe(5);
    });

    it('should take an input and give a corresponding response via the game log', () => {
      gameCtrl.input = 'call mom';
      gameCtrl.action();
      expect(gameCtrl.gameLog[0]).toBe('You try to express your situation to your mother, but she thinks that you\'ve had too much to drink. Your dependence on your mother annoys the monster and he impales you with a talon.');
    });
  });
});
