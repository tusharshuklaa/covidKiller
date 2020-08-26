import GameScene from './GameScene';
import GameConsts from './Constants';

export default class VaccineLaser extends Phaser.Physics.Arcade.Sprite {
  constructor(scene: GameScene, x: number, y: number) {
    super(scene, x, y, (GameConsts.bullet! as IGameObjectInfo).name);
  }

  fire(x: number, y: number): void {
    this.body.reset(x, y);
    this.scale = 2;
    this.play((GameConsts.bullet as IGameObjectInfo).animName!);
    this.setActive(true);
    this.setVisible(true);
    this.setVelocityY(-(GameConsts.bullet as IGameObjectInfo).velocity!);
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
