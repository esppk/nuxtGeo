<template>
  <section>
    <div class="box" :class="hidechat">
      <!-- pin toggle button -->
      <div class="field">
        <b-tooltip label="You can pin this window"
            :active="active"
            position="is-right"
            always>
          <b-switch v-model="pinSwitch"
            true-value="fixed"
            false-value="float">
            <strong>{{ pinSwitch }}</strong>
          </b-switch>
        </b-tooltip>
      </div>
      <!-- chat message container -->

      <div class="msgcontainer" v-chat-scroll>
          <b-message :title="m.username"
            v-for="(m, i) in msgList" 
            :key="i"
            :type="color[Math.floor(Math.random()*7)]"
              class="is-small">
              <em>{{m.time}}</em> <br>
              <strong>  {{ m.msg }} </strong>    
          </b-message>
      </div>

      <!-- chat input -->
      <div class="control">
        <textarea class="textarea"
          v-model="curMsg"
         type="text" :rows="row"
         @keyup.13="onEnter"
         placeholder="Say Something to the folks"></textarea>
         <button class="button is-fullwidth is-success"
          @click="send"
          :disabled="!islogin"
         >Send</button>
      </div>
    </div>
  </section>
</template>

<script>
import firebase from "firebase";
import db from "@/firebase/init";
import Geohash from "latlon-geohash";
export default {
  name: "chat",
  data() {
    return {
      active: true,
      hidechat: "hidechat",
      pinSwitch: "float",
      color: [
        "is-light",
        "is-dark",
        "is-primary",
        "is-info",
        "is-success",
        "is-warning",
        "is-danger"
      ],
      msgList: [],
      curMsg: "",
      row: 2,
      test: "",
      geoHash: "wecpk",
      geoRaw: ""
    };
  },
  watch: {
    pinSwitch() {
      if (this.pinSwitch === "fixed") {
        this.hidechat = "";
        this.active = false;
      } else {
        this.hidechat = "hidechat";
      }
    },
    geoHash() {
      this.msgList = [];
      db
        .collection("chat")
        .where("geohash", "==", this.geoHash)
        .orderBy("time")
        .onSnapshot(doc => {
          doc.forEach(d => {
            this.msgList.push(d.data());
          });
        });
    }
  },
  computed: {
    displayname() {
      return this.$store.state.displayName;
    },
    islogin() {
      return this.$store.state.islogin;
    }
  },
  mounted() {
    let user = firebase.auth().currentUser;
    /* console.log(user.uid); */
    if (user) {
      db
        .collection("users")
        .where("user_id", "==", user.uid)
        .get()
        .then(res => {
          res.forEach(doc => {
            this.$store.commit("setDisName", doc.data().username);
            this.geoRaw = doc.data().geolocation;
            this.geoHash = Geohash.encode(this.geoRaw.lat, this.geoRaw.lng, 5);
            /* this.test = this.geoHash; */
            /*  console.log(doc.data()); */
          });
        });
    } else {
      this.$toast.open("Not Login, load chat from random place");
    }

    db
      .collection("chat")
      .where("geohash", "==", this.geoHash)
      .orderBy("time")
      .onSnapshot(doc => {
        doc.forEach(d => {
          this.msgList.push(d.data());
        });
      });
  },
  methods: {
    async send() {
      let msg = this.curMsg;
      this.curMsg = "";
      await db.collection("chat").add({
        msg: msg,
        username: this.$store.state.displayName,
        time: Date(),
        geohash: this.geoHash
      });
    },
    onEnter() {
      this.send();
    }
  }
};
</script>

<style scoped>
.box {
  height: 95vh;
  width: 25rem;
}
.box:hover {
  transform: translateX(0);
}
.hidechat {
  transform: translateX(22rem);
  transition: transform 0.2s;
}
.msgcontainer {
  width: 100%;
  height: 73%;
  overflow: auto;
}
.control {
  margin-top: 2rem;
}
.is-fullwidth {
  margin-top: 1rem;
}
</style>
