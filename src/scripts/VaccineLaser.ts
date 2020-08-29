import GameScene from './GameScene';
import GameConfig from './Constants';

export default class VaccineLaser extends Phaser.Physics.Arcade.Sprite {
  constructor(scene: GameScene, x: number, y: number) {
    super(scene, x, y, GameConfig.bullet.name);
  }

  fire(x: number, y: number): void {
    this.body.reset(x, y);
    this.scale = 2;
    this.play(GameConfig.bullet.animName!);
    this.setActive(true);
    this.setVisible(true);
    this.setVelocityY(-GameConfig.bullet.velocity!);
  }

  /**
   * Cleaning up if the bullet crosses the screen
   *
   * @param {number} time
   * @param {number} delta
   * @memberof VaccineLaser
   */
  preUpdate(time: number, delta: number): void {
    super.preUpdate(time, delta);

    if (this.y <= 0) {
      this.setActive(false);
      this.setVisible(false);
    }
  }
}
