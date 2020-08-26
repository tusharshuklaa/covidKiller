import GameScene from './GameScene';
import GameConsts from './Constants';
import Bullets from './Bullets';
import { enablePhysicsInSprite } from './Utils';

export default class Shooter extends Phaser.Physics.Arcade.Sprite {
  private cursorKeys: Phaser.Types.Input.Keyboard.CursorKeys;
  private pauseFiring: boolean;
  private bullets!: Bullets;

  constructor(scene: GameScene, x: number) {
    // Make the height of shooter 1/10th of game screen height OR 100px (whichever is higher)
    const shooterHeight = Math.max((window.__COVID_GAME__.config.height as number) / 10, 100);
    const shooterTopOffset = (window.__COVID_GAME__.config.height as number) - shooterHeight / 1.5;

    super(scene, x, shooterTopOffset, (GameConsts.shooter! as IGameObjectInfo).name);

    enablePhysicsInSprite(scene, this);

    this.displayHeight = shooterHeight;
    // Scale the shooter width w.r.t to it's height
    this.scaleX = this.scaleY;

    this.cursorKeys = scene.input.keyboard.createCursorKeys();
    // Don't let the player leave the screen
    this.setCollideWorldBounds(true);

    this.enableKeyboardMovement();

    this.createBulletAnimation();

    this.bullets = new Bullets(scene);

    this.pauseFiring = false;
  }

  private enableKeyboardMovement(): void {
    this.scene.input.on('pointermove', (pointer: MouseEvent) => {
      this.x = pointer.x;
    });
  }

  move(): void {
    this.setVelocity(0);
    if (this.cursorKeys?.left?.isDown) {
      this.setVelocityX(-GameConsts.shooterVelocity);
    }

    if (this.cursorKeys?.right?.isDown) {
      this.setVelocityX(+GameConsts.shooterVelocity);
    }
  }

  enableShooting(): void {
    const scene = this.scene;
    const spaceBarKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    const pointer = scene.input.activePointer;

    if ((spaceBarKey.isDown || pointer.isDown) && !this.pauseFiring) {
      this.pauseFiring = true;
      this.shootBullets();
      // Firing less bullets in continuous fire by causing a delay
      setTimeout(() => {
        this.pauseFiring = false;
      }, 100);
    }
  }

  shootBullets(): void {
    this.bullets.shoot(this.x, this.y - 50);
  }

  createBulletAnimation(): void {
    const beam = GameConsts.bullet as IGameObjectInfo;

    this.scene.anims.create({
      key: beam.animName,
      frames: this.scene.anims.generateFrameNumbers(beam.name, {}),
      frameRate: 10,
      repeat: -1,
    });
  }
}
