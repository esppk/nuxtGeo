import Vuex from "vuex";

const createStore = () => {
  return new Vuex.Store({
    state: {
      LoginMode: false,
      displayName: "",
      curGeo: "",
      islogin: false
    },
    mutations: {
      toLogIn(state) {
        state.LoginMode = true;
      },
      toSignUp(state) {
        state.LoginMode = false;
      },
      setDisName(state, name_) {
        state.displayName = name_;
      },
      setCurGeo(state, geo) {
        state.curGeo = geo;
      },
      loggedin(state) {
        state.islogin = true;
      },
      loggedout(state) {
        state.islogin = false;
      }
    }
  });
};

export default createStore;
