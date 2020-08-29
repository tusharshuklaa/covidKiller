const mightiestVirusHealth = 500;

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
    animName: '',
    width: 835,
    height: 835,
    delta: 50,
    velocity: 700,
  },
  bullet: {
    name: 'covidBeam',
    path: '/src/assets/images/beam.png',
    animName: 'covidBeam__anim',
    velocity: 700,
    width: 16,
    height: 16,
  },
  covidBalls: {
    L3: {
      min: 0,
      max: 1,
      scale: 1.5,
      health: mightiestVirusHealth,
      name: 'coronaL3',
      path: '/src/assets/images/CoronaL3.png',
      animName: 'L1_rotation',
      width: 96,
      height: 100,
      velocity: 60,
    },
    L2: {
      min: 0,
      max: 3,
      scale: 1.5,
      health: mightiestVirusHealth / 2,
      name: 'coronaL2',
      path: '/src/assets/images/CoronaL2.png',
      animName: 'L2_rotation',
      width: 72,
      height: 76,
      velocity: 80,
    },
    L1: {
      min: 0,
      max: 6,
      scale: 1.5,
      health: mightiestVirusHealth / 4,
      name: 'coronaL1',
      path: '/src/assets/images/CoronaL1.png',
      animName: 'L1_rotation',
      width: 54,
      height: 57,
      velocity: 100,
    },
  },
  bitMap: {
    primary: {
      name: 'atariSmooth',
      png: '/src/assets/fonts/atari-smooth.png',
      xml: 'src/assets/fonts/atari-smooth.xml',
    },
    secondary: {
      name: 'gothic',
      png: '/src/assets/fonts/gothic.png',
      xml: 'src/assets/fonts/gothic.xml',
    },
    tertiary: {
      name: 'shortStack',
      png: '/src/assets/fonts/shortStack.png',
      xml: 'src/assets/fonts/shortStack.xml',
    },
  },
};

export default Constants;
