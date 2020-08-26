export const getWindowHeight = (): number => {
  return window.innerHeight || 0;
};

export const getWindowWidth = (): number => {
  return window.innerWidth || 0;
};

export const getScreenMidPoint = (): IBox => {
  return {
    width: (window.__COVID_GAME__.config.width as number) / 2,
    height: (window.__COVID_GAME__.config.height as number) / 2,
  };
};

export const enablePhysicsInSprite = (
  scene: Phaser.Scene,
  sprite: Phaser.Physics.Arcade.Sprite,
): void => {
  // Adding sprite to the scene and enabling PHYSICS on it
  scene.add.existing(sprite);
  scene.physics.add.existing(sprite);
};
