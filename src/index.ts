import 'phaser';
import './styles/style.scss';
import GameConfig from './scripts/Constants';
import GameScene from './scripts/GameScene';
import { getWindowHeight, getWindowWidth } from './scripts/Utils';

export class CovidKiller extends Phaser.Game {
  constructor(config: Phaser.Types.Core.GameConfig) {
    super(config);
  }
}

window.onload = () => {
  const winWidth = getWindowWidth();
  const gameWidth = winWidth < 768 ? winWidth : Math.min(600, winWidth / 3);
  const config: Phaser.Types.Core.GameConfig = {
    title: GameConfig.title,
    width: gameWidth,
    height: getWindowHeight() * 0.9,
    parent: GameConfig.gameContainer,
    scene: [GameScene],
    physics: {
      default: 'arcade',
      arcade: {
        debug: false,
        gravity: {
          y: 150,
        },
      },
    },
  };

  window.__COVID_GAME__ = new CovidKiller(config);
};
