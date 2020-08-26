import GameScene from './GameScene';
import GameConsts from './Constants';
import { enablePhysicsInSprite } from './Utils';

export default class CoronaL3 extends Phaser.Physics.Arcade.Sprite {
  private health: number;

  constructor(scene: GameScene) {
    const randomXPos = Math.random() > 0.5 ? (window.__COVID_GAME__.config.height as number) : 0;
    super(scene, randomXPos, 0, (GameConsts.coronaL3! as IGameObjectInfo).name);

    enablePhysicsInSprite(scene, this);

    this.enableAnimation();

    this.play((GameConsts.coronaL3 as IGameObjectInfo).animName!);

    this.health = 1000;
  }

  enableRandomMovement(): void {
    //  This sets the image bounce energy for the horizontal  and vertical vectors (as an x,y point). "1" is 100% energy return
    this.setBounce(1);

    // Don't let the player leave the screen
    this.setCollideWorldBounds(true);

    this.setVelocity(50, 50);

    this.angle += 1.5;
  }

  private enableAnimation(): void {
    const virusBall = GameConsts.coronaL3 as IGameObjectInfo;

    this.scene.anims.create({
      key: virusBall.animName,
      frames: this.scene.anims.generateFrameNumbers(virusBall.name, {
        first: 0,
        end: 5,
      }),
      frameRate: 5,
      repeat: -1,
    });
  }

  rotate(): void {
    this.angle += 1.5;
  }

  takeHit(): void {
    if (this.health > 0) {
      this.angle += 0.5;
      this.health -= 1;
      this.setVelocityY(30);
    } else {
      // split it into two mini covid balls
    }
  }
}
