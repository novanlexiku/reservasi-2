import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#CBAA5C',
        secondary: '#083759',
        accent: '#8c9eff',
        error: '#b71c1c',
      },
    },
  },
});
