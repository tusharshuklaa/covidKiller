import GameScene from './GameScene';
import CoronaL3 from './CoronaL3';
import GameConsts from './Constants';

/**
 * Group of 'VaccineLaser' aka bullet/beam
 *
 * @class Bullets
 * @extends {Phaser.Physics.Arcade.Group}
 */
export default class CovidBalls extends Phaser.Physics.Arcade.Group {
  constructor(scene: GameScene) {
    super(scene.physics.world, scene);

    scene.time.addEvent({
      delay: 2000,
      loop: true,
      callback: () => {
        this.addCovidVirus(scene);
      },
    });

    scene.physics.add.collider(this, this);
  }

  addCovidVirus(scene: GameScene): void {
    const activeCovidBalls = this.getChildren().length;
    const max = (GameConsts.covidBalls as ICovidBallsConfig).L3?.max || 10;

    if (activeCovidBalls < max) {
      const virusBall = new CoronaL3(scene);
      this.add(virusBall);
      virusBall.enableRandomMovement();
    }
  }

  getWeaker(): void {
    const covidBall = this.getFirstDead(false)! as CoronaL3;

    if (covidBall) {
      covidBall.takeHit();
    }
  }
}
