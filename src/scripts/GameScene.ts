import 'phaser';
import Shooter from './Shooter';
import CovidBalls from './CovidBalls';
import GameConfig from './Constants';
import { getScreenMidPoint } from './Utils';

export default class GameScene extends Phaser.Scene {
  bgImage!: Phaser.GameObjects.TileSprite;
  shooter!: Shooter;
  cursorKeys!: Phaser.Types.Input.Keyboard.CursorKeys;
  covidBalls!: CovidBalls;

  constructor() {
    // The name of this scene is passed as an argument to super
    super({
      key: GameConfig.gameSceneName,
    });
  }

  // #region Phaser lifecycle methods

  /**
   * Prelods all assets that are to be used in this scene
   *
   * @memberof GameScene
   */
  preload(): void {
    this.loadFonts();
    this.loadSpriteSheets();
  }

  /**
   * This function is called once and is used to create assets and create game objects
   *
   * @memberof GameScene
   */
  create(): void {
    const midPoint = getScreenMidPoint()!;
    this.setBgImage(midPoint);
    this.covidBalls = new CovidBalls(this);
    this.shooter = new Shooter(this, midPoint.width);
  }

  /**
   * This function runs on evey game frame and updates the scene regularly
   *
   * @memberof GameScene
   */
  update(): void {
    this.shooter.move();
    this.shooter.enableShooting();
    this.covidBalls.updateHealth();

    if (this.bgImage) {
      this.bgImage.tilePositionX -= 0.5;
    }
  }

  // #endregion

  // #region Custom methods

  loadFonts(): void {
    this.load.bitmapFont(
      GameConfig.bitMap.primary.name,
      GameConfig.bitMap.primary.png,
      GameConfig.bitMap.primary.xml,
    );

    this.load.bitmapFont(
      GameConfig.bitMap.secondary!.name,
      GameConfig.bitMap.secondary!.png,
      GameConfig.bitMap.secondary!.xml,
    );

    this.load.bitmapFont(
      GameConfig.bitMap.tertiary!.name,
      GameConfig.bitMap.tertiary!.png,
      GameConfig.bitMap.tertiary!.xml,
    );
  }

  loadSpriteSheets(): void {
    const bgImg = GameConfig.bgImg as IGameObjectInfo;
    const shooter = GameConfig.shooter;
    const bullet = GameConfig.bullet;
    const coronaL1 = GameConfig.covidBalls.L1!;
    const coronaL2 = GameConfig.covidBalls.L2!;
    const coronaL3 = GameConfig.covidBalls.L3!;

    this.load.image(bgImg.name, bgImg.path);

    this.load.spritesheet(shooter.name, shooter.path, {
      frameWidth: shooter.width,
      frameHeight: shooter.height,
    });

    this.load.spritesheet(bullet.name, bullet.path, {
      frameWidth: bullet.width,
      frameHeight: bullet.height,
    });

    this.load.spritesheet(coronaL3.name, coronaL3.path, {
      frameWidth: coronaL3.width,
      frameHeight: coronaL3.height,
    });

    this.load.spritesheet(coronaL2.name, coronaL2.path, {
      frameWidth: coronaL2.width,
      frameHeight: coronaL2.height,
    });

    this.load.spritesheet(coronaL1.name, coronaL1.path, {
      frameWidth: coronaL1.width,
      frameHeight: coronaL1.height,
    });
  }

  /**
   * Sets background image for the game scene
   *
   * @param {IBox} midPoint
   * @memberof GameScene
   */
  setBgImage(midPoint: IBox): void {
    this.bgImage = this.add
      .tileSprite(0, midPoint.height, 0, 0, (GameConfig.bgImg as IGameObjectInfo).name)
      .setScale(1.26);
  }

  // #endregion
}
