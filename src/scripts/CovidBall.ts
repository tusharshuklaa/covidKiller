import GameScene from './GameScene';
import GameConfig from './Constants';
import { enablePhysicsInSprite } from './Utils';

export default class CovidBall extends Phaser.Physics.Arcade.Sprite {
  private healthText!: Phaser.GameObjects.BitmapText;
  private health!: number;
  private virusInfo: ICovidBallConfig;
  name: string;

  constructor(scene: GameScene, virus: ICovidBallConfig) {
    const randomXPos = Math.random() >= 0.5 ? (window.__COVID_GAME__.config.height as number) : 0;

    super(scene, randomXPos, 0, virus.name);
    this.virusInfo = virus;
    this.name = virus.name;

    enablePhysicsInSprite(scene, this);
    this.enableAnimation();
    this.createHealth(randomXPos);
  }

  private createHealth(xPos: number): void {
    this.health = this.virusInfo.health;
    this.healthText = this.scene.add.bitmapText(
      xPos,
      0,
      GameConfig.bitMap.primary.name,
      `${this.virusInfo.health}`,
      (this.virusInfo.width - 30) / 6,
      1,
    );
    this.healthText.setOrigin(0.5);
  }

  private enableAnimation(): void {
    const virusBall = this.virusInfo;

    this.body.setCircle(virusBall.width / 2);
    this.setScale(virusBall.scale);

    this.scene.anims.create({
      key: virusBall.animName,
      frames: this.scene.anims.generateFrameNumbers(virusBall.name, {
        first: 0,
        end: 1,
      }),
      frameRate: 5,
      repeat: -1,
    });

    this.play(this.virusInfo.animName!);
  }

  takeHit(): void {
    if (this.health > 0) {
      this.angle -= 0.5;
      this.health--;
    } else {
      this.kill();
    }
  }

  private kill(): void {
    this.destroy();
    this.healthText.destroy();
  }

  enableRandomMovement(): void {
    //  This sets the image bounce energy for the horizontal  and vertical vectors (as an x,y point). "1" is 100% energy return
    this.setBounce(1);

    this.setImmovable(true);

    // Don't let the player leave the screen
    this.setCollideWorldBounds(true);

    const vel = this.virusInfo.velocity!;
    this.setVelocity(vel / 2, vel);
  }

  updateAll(): void {
    if (this.healthText) {
      this.healthText.setPosition(this.x, this.y);
      this.healthText.setText(`${this.health}`);
    }

    this.angle += 1.5;
  }
}
