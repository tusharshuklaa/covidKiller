export {};

declare global {
  interface Window {
    __COVID_GAME__: Phaser.Game;
  }

  interface IBox {
    width: number;
    height: number;
  }

  interface IAsset {
    name: string;
    path: string;
  }

  interface IGameObjectInfo extends IBox, IAsset {
    animName?: string;
    velocity?: number;
    delta?: number;
  }

  interface ICovidBallConfig extends IGameObjectInfo {
    min: number;
    max: number;
    health: number;
    scale: number;
  }

  interface ICovidBallsConfig {
    L1?: ICovidBallConfig;
    L2?: ICovidBallConfig;
    L3?: ICovidBallConfig;
  }

  type CovidBallType = 'L1' | 'L2' | 'L3';

  interface IBitmapFontConfig {
    name: string;
    png: string;
    xml: string;
  }

  interface IBitmapFonts {
    primary: IBitmapFontConfig;
    secondary?: IBitmapFontConfig;
    tertiary?: IBitmapFontConfig;
  }

  interface IGameConstants {
    readonly title: string;
    readonly gameContainer: string;
    readonly gameSceneName: string;
    readonly bgImg: IAsset;
    readonly shooter: IGameObjectInfo;
    readonly bullet: IGameObjectInfo;
    readonly covidBalls: ICovidBallsConfig;
    readonly bitMap: IBitmapFonts;
  }
}
