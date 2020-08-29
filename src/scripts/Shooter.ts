import GameScene from './GameScene';
import GameConfig from './Constants';
import Bullets from './Bullets';
import { enablePhysicsInSprite } from './Utils';
import CovidBall from './CovidBall';
import VaccineLaser from './VaccineLaser';

export default class Shooter extends Phaser.Physics.Arcade.Sprite {
  private cursorKeys: Phaser.Types.Input.Keyboard.CursorKeys;
  private pauseFiring: boolean;
  private bullets!: Bullets;
  // private allowBulletCollision: boolean;

  constructor(scene: GameScene, x: number) {
    // Make the height of shooter 1/10th of game screen height OR 100px (whichever is higher)
    const shooterHeight = Math.max((window.__COVID_GAME__.config.height as number) / 10, 100);
    const shooterTopOffset = (window.__COVID_GAME__.config.height as number) - shooterHeight / 1.5;

    super(scene, x, shooterTopOffset, GameConfig.shooter.name);

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

    this.hitCovidBalls(1);
  }

  private enableKeyboardMovement(): void {
    this.scene.input.on('pointermove', (pointer: MouseEvent) => {
      this.x = pointer.x;
    });
  }

  hitCovidBalls(count: number): void {
    const scene = this.scene as GameScene;
    // Collide bullets with covid balls
    if (scene.covidBalls) {
      scene.physics.add.collider(this.bullets, scene.covidBalls, (b, cb) => {
        this.bullets.vanish(b as VaccineLaser);
        scene.covidBalls.getWeaker(cb as CovidBall);
        b.active = false;
      });
    } else {
      // Little hack to re-check existence of covidBalls in scene due to rare race condition
      if (count < 5) {
        count++;
        setTimeout(() => {
          this.hitCovidBalls(count);
        }, 0);
      }
    }
  }

  move(): void {
    const _shooterVelocity = GameConfig.shooter.velocity!;
    this.setVelocity(0);
    if (this.cursorKeys?.left?.isDown) {
      this.setVelocityX(-_shooterVelocity);
    }

    if (this.cursorKeys?.right?.isDown) {
      this.setVelocityX(+_shooterVelocity);
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
      }, GameConfig.shooter.delta!);
    }
  }

  shootBullets(): void {
    this.bullets.shoot(this.x, this.y - 50);
  }

  createBulletAnimation(): void {
    const beam = GameConfig.bullet;

    this.scene.anims.create({
      key: beam.animName,
      frames: this.scene.anims.generateFrameNumbers(beam.name, {}),
      frameRate: 10,
      repeat: -1,
    });
  }
}
