module.exports = {
  plugins: [
    require('autoprefixer'),
    require('cssnano')({
      preset: 'default',
    }),
  ],
  browsers: ['> 0.25%', 'ie >= 11']
};
