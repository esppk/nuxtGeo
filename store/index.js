import Vuex from "vuex";

const createStore = () => {
  return new Vuex.Store({
    state: {
      LoginMode: false
    },
    mutations: {
      toLogIn(state) {
        state.LoginMode = true;
      },
      toSignUp(state) {
        state.LoginMode = false;
      }
    }
  });
};

export default createStore;
