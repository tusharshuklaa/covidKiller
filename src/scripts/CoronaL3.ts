import GameScene from './GameScene';
import GameConsts from './Constants';
import { enablePhysicsInSprite } from './Utils';

export default class CoronaL3 extends Phaser.Physics.Arcade.Sprite {
  constructor(scene: GameScene, x = 0, y = 0) {
    super(scene, x, y, (GameConsts.coronaL3! as IGameObjectInfo).name);

    enablePhysicsInSprite(scene, this);

    // this.anchor.setTo(0.5, 0.5);

    this.enableRandomMovement();

    this.enableAnimation();

    this.play((GameConsts.coronaL3 as IGameObjectInfo).animName!);
  }

  private enableRandomMovement(): void {
    // Don't let the player leave the screen
    this.setCollideWorldBounds(true);

    this.setVelocity(50, 50);

    //  This sets the image bounce energy for the horizontal  and vertical vectors (as an x,y point). "1" is 100% energy return
    this.setBounce(1);

    this.setGravity(0, 180);
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
    this.angle += 1;
  }
}
