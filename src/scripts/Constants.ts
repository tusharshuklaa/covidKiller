const Constants: IGameConstants = {
  title: 'Covid Killer',
  gameContainer: 'killCovidGame',
  gameSceneName: 'GameScene',
  bgImg: {
    name: 'backgroundImage',
    path: '/src/assets/images/bg1.jpg',
  },
  shooter: {
    name: 'shooterImage',
    path: '/src/assets/images/shooter.png',
    width: 835,
    height: 835,
    delta: 100,
    velocity: 500,
  },
  bullet: {
    name: 'covidBeam',
    path: '/src/assets/images/beam.png',
    animName: 'covidBeam__anim',
    velocity: 700,
    width: 16,
    height: 16,
  },
  coronaL3: {
    name: 'coronaL3',
    path: '/src/assets/images/CoronaL3.png',
    animName: 'corona_rotation',
    width: 96,
    height: 100,
  },
  covidBalls: {
    L3: {
      min: 0,
      max: 10,
    },
  },
};

export default Constants;
