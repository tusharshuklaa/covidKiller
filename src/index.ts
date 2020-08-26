import 'phaser';
import './styles/style.scss';
import GameConsts from './scripts/Constants';
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
    title: GameConsts.title as string,
    width: gameWidth,
    height: getWindowHeight() * 0.9,
    parent: GameConsts.gameContainer as string,
    scene: [GameScene],
    physics: {
      default: 'arcade',
      arcade: {
        debug: false,
      },
    },
  };

  window.__COVID_GAME__ = new CovidKiller(config);
};
