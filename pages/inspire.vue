<template>
  <section class="columns">
    <div id="signlog" class="column is-half is-offset-one-quarter">

      <b-field label="Email"     
          >
          <b-input type="email"
              v-model="email"
              placeholder="test@gmail.com"
              maxlength="30">
          </b-input>
      </b-field>
      <b-field label="Username"
          :type="isUserOk"
          :message="userMsg">
          <b-input maxlength="30"
            v-model="username"
            placeholder="Your username"
          ></b-input>
      </b-field>

      {{slug}}

      <b-field label="Password">
          <b-input type="password"
              v-model="password"
              placeholder="Your password"
              password-reveal>
          </b-input>
      </b-field>
      <button class="button is-success is-fullwidth" @click="signUp">{{ action }}</button>
    </div>
  </section>
</template>

<script>
import slugify from "slugify";
import db from "@/firebase/init";
import firebase from "firebase";
export default {
  created() {
    if (process.server) {
      this.$router.push("/");
    }
  },
  name: "auth",
  data() {
    return {
      username: "",
      isUserOk: "",
      userMsg: "",
      password: "",
      slug: "",
      email: "",
      action: "Sign Up"
    };
  },
  transition: {
    enterActiveClass: "animated bounceInUp",
    leaveActiveClass: "animated bounceOutDown"
  },
  watch: {
    username() {
      if (this.username) {
        this.isUserOk = "is-success";
        this.userMsg = "";
        this.slug = slugify(this.username, {
          replacement: "-",
          remove: /[$*_+~.()'"!\-:@]/g,
          lower: true
        });
      } else {
        this.isUserOk = "is-danger";
        this.userMsg = "You must enter an UNIQUE username";
      }
    }
  },
  methods: {
    signUp() {
      if (this.username && this.email && this.password) {
        let ref = db.collection("users").doc(this.slug);
        ref.get().then(doc => {
          if (doc.exists) {
            this.userMsg = "This username has been taken";
          }
          firebase
            .auth()
            .createUserWithEmailAndPassword(this.email, this.password)
            .then(({ user }) => {
              console.log(user);
              ref.set({
                username: this.username,
                geolocation: null,
                user_id: user.uid
              });
            })
            .then(() => {
              this.$router.push("/");
            })
            .catch(err => console.log(err));
        });
      } else {
        this.$snackbar.open({
          message: "You must fill out all fields",
          type: "is-danger",
          position: "is-top",
          actionText: "OK"
        });
      }
    }
  }
};
</script>

<style scoped>
.column {
  margin-top: 2rem !important;
}
</style>
