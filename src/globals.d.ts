export {};

declare global {
  interface Window {
    __COVID_GAME__: Phaser.Game;
  }

  interface IBox {
    width: number;
    height: number;
  }

  interface IGameObjectInfo {
    name: string;
    path: string;
    animName?: string;
    velocity?: number;
    width?: number;
    height?: number;
    delta?: number;
  }

  interface ICovidBallConfig {
    min: number;
    max: number;
  }

  interface ICovidBallsConfig {
    L1?: ICovidBallConfig;
    L2?: ICovidBallConfig;
    L3?: ICovidBallConfig;
  }

  interface IGameConstants {
    readonly [propName: string]: string | number | IGameObjectInfo | ICovidBallsConfig;
  }
}
