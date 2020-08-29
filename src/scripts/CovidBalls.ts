import GameScene from './GameScene';
import CovidBall from './CovidBall';
import GameConfig from './Constants';

/**
 * Group of 'CovidBall' aka bullet/beam
 *
 * @class CovidBalls
 * @extends {Phaser.Physics.Arcade.Group}
 */
export default class CovidBalls extends Phaser.Physics.Arcade.Group {
  constructor(scene: GameScene) {
    super(scene.physics.world, scene);
    let initialTime = 5500;

    setInterval(() => {
      if (initialTime > 1000) {
        initialTime -= 100;
      }
    }, 6000);

    // Add first covid ball to the scene
    this.addCovidVirus(scene);
    // Add covid balls after every 2 seconds
    scene.time.addEvent({
      delay: initialTime,
      loop: true,
      callback: () => {
        this.addCovidVirus(scene);
      },
    });

    scene.physics.add.collider(this, this);
  }

  addCovidVirus(scene: GameScene): void {
    const activeCovidBalls = this.getChildren();
    const max =
      GameConfig.covidBalls.L3!.max + GameConfig.covidBalls.L2!.max + GameConfig.covidBalls.L1!.max;

    if (activeCovidBalls.length < max) {
      const virusType = this.getRandomVirusType(activeCovidBalls);
      const virusBall = new CovidBall(scene, virusType);
      this.add(virusBall);
      virusBall.enableRandomMovement();
    }
  }

  getRandomVirusType(activeCovidBalls: Phaser.GameObjects.GameObject[]): ICovidBallConfig {
    const L1 = GameConfig.covidBalls.L1!;
    const L2 = GameConfig.covidBalls.L2!;
    const L3 = GameConfig.covidBalls.L3!;
    const numOfL3Present = this.getHowManyPresent(activeCovidBalls as CovidBall[], 'L3');
    const numOfL2Present = this.getHowManyPresent(activeCovidBalls as CovidBall[], 'L2');
    let preferred = activeCovidBalls.length ? null : L1;

    const randomNum = Math.random();
    if (randomNum <= 0.4 && numOfL3Present < L3.max) {
      preferred = L3;
    } else if (randomNum <= 0.7 && numOfL2Present < L1.max) {
      preferred = L1;
    } else {
      preferred = L2;
    }

    return preferred;
  }

  getHowManyPresent(activeCovidBalls: CovidBall[], type: CovidBallType): number {
    const covidBall = activeCovidBalls.filter((cb) => {
      return cb.name === GameConfig.covidBalls[type]!.name;
    });

    return (covidBall || []).length;
  }

  updateHealth(): void {
    const kids = this.getChildren();
    if (kids && kids.length) {
      kids.forEach((k) => {
        (k as CovidBall).updateAll();
      });
    }
  }

  getWeaker(covidBall: CovidBall): void {
    if (covidBall) {
      covidBall.takeHit();
    }
  }
}
