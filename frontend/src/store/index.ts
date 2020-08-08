import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    images: null
  },
  getters: {
    getImages: (state) => {
      return state.images;
    }
  },
  mutations: {
    setImages(state,images){
      state.images = images;
    }
  },
  actions: {
    setImages(content,images){
      content.commit('setImages',images);
    }
  }
})
