import GameScene from './GameScene';
import VaccineLaser from './VaccineLaser';
import GameConfig from './Constants';

/**
 * Group of 'VaccineLaser' aka bullet/beam
 *
 * @class Bullets
 * @extends {Phaser.Physics.Arcade.Group}
 */
export default class Bullets extends Phaser.Physics.Arcade.Group {
  constructor(scene: GameScene) {
    super(scene.physics.world, scene);

    this.createMultiple({
      classType: VaccineLaser,
      frameQuantity: 50,
      active: false,
      visible: false,
      key: GameConfig.bullet.name,
    });
  }

  shoot(x: number, y: number): void {
    const bullet = this.getFirstDead(false)! as VaccineLaser;

    if (bullet) {
      bullet.fire(x, y);
    }
  }

  vanish(bullet: VaccineLaser): void {
    bullet.setActive(false).setVisible(false);
  }
}
