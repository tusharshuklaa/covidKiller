import 'phaser';
import Shooter from './Shooter';
import CoronaL3 from './CoronaL3';
import GameConsts from './Constants';
import { getScreenMidPoint } from './Utils';

export default class GameScene extends Phaser.Scene {
  bgImage!: Phaser.GameObjects.TileSprite;
  shooter!: Shooter;
  cursorKeys!: Phaser.Types.Input.Keyboard.CursorKeys;
  coronaL3!: CoronaL3;

  constructor() {
    // The name of this scene is passed as an argument to super
    super({
      key: GameConsts.gameSceneName as string,
    });
  }

  // #region Phaser lifecycle methods

  /**
   * Prelods all assets that are to be used in this scene
   *
   * @memberof GameScene
   */
  preload(): void {
    const bgImg = GameConsts.bgImg as IGameObjectInfo;
    const shooter = GameConsts.shooter as IGameObjectInfo;
    const bullet = GameConsts.bullet as IGameObjectInfo;
    const coronaL3 = GameConsts.coronaL3 as IGameObjectInfo;

    this.load.image(bgImg.name, bgImg.path);

    this.load.spritesheet(shooter.name, shooter.path, {
      frameWidth: shooter.width as number,
      frameHeight: shooter.height as number,
    });

    this.load.spritesheet(bullet.name, bullet.path, {
      frameWidth: bullet.width as number,
      frameHeight: bullet.height as number,
    });

    this.load.spritesheet(coronaL3.name, coronaL3.path, {
      frameWidth: coronaL3.width as number,
      frameHeight: coronaL3.height as number,
    });
  }

  /**
   * This function is called once and is used to create assets and create game objects
   *
   * @memberof GameScene
   */
  create(): void {
    const midPoint = getScreenMidPoint()!;
    this.setBgImage(midPoint);
    this.shooter = new Shooter(this, midPoint.width);
    this.coronaL3 = new CoronaL3(this);
  }

  /**
   * This function runs on evey game frame and updates the scene regularly
   *
   * @memberof GameScene
   */
  update(): void {
    this.shooter.move();
    this.shooter.enableShooting();
    this.initVirusBalls();

    if (this.bgImage) {
      this.bgImage.tilePositionX -= 0.5;
    }
  }

  // #endregion

  // #region Custom methods

  setBgImage(midPoint: IBox): void {
    this.bgImage = this.add
      .tileSprite(0, midPoint.height, 0, 0, (GameConsts.bgImg as IGameObjectInfo).name)
      .setScale(1.26);
  }

  initVirusBalls(): void {
    this.coronaL3.rotate();
  }

  // #endregion
}
