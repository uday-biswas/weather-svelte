import replace from '@rollup/plugin-replace';

const production = !process.env.ROLLUP_WATCH;

export default {
  // Other Rollup config options...

  plugins: [
    replace({
      // Replace process.env.WEATHER_API_KEY with the actual value
      'process.env.WEATHER_API_KEY': JSON.stringify(import.meta.env.VITE_WEATHER_API_KEY),
    }),
  ],
};
