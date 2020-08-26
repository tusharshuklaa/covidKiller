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

  interface IGameConstants {
    readonly [propName: string]: string | number | IGameObjectInfo;
  }
}
