<template>
    <section class="section">
        <div class="google-map" id="map" ref="map"></div>
        <div class="chatcontainer">
          <Chat />
        </div>      
    </section>
</template>

<script>
import firebase from "firebase";
import db from "@/firebase/init";
import Chat from "~/components/Chat";
export default {
  name: "GMap",
  components: {
    Chat
  },
  data() {
    return {
      lat: 54,
      lng: -2
    };
  },
  transition: {
    enterActiveClass: "bounceInUp",
    leaveActiveClass: "bounceOutDown"
  },
  methods: {
    renderMap(zoom_ = 6) {
      const map = new google.maps.Map(this.$refs.map, {
        center: { lat: this.lat, lng: this.lng },
        zoom: zoom_,
        maxZoom: 15,
        minZoom: 3,
        streetViewControl: false
      });

      db
        .collection("users")
        .get()
        .then(users => {
          users.docs.forEach(doc => {
            let data = doc.data();
            if (data.geolocation && this.$store.state.islogin) {
              let marker = new google.maps.Marker({
                position: {
                  lat: data.geolocation.lat,
                  lng: data.geolocation.lng
                },
                map
              });
              //add click event to marker
              marker.addListener("click", () => {
                this.$toast.open({
                  message: "You can now talk to people near you!",
                  type: "is-success"
                });
              });
            }
          });
        });
    }
  },
  mounted() {
    /* this.$nextTick(this.renderMap); */
    let user = firebase.auth().currentUser;
    if (!user) {
      this.$toast.open({
        message: "Please log in to Chat!",
        type: "is-danger"
      });
      this.renderMap(3);
    } else if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        pos => {
          this.lat = pos.coords.latitude;
          this.lng = pos.coords.longitude;
          this.renderMap();
          db
            .collection("users")
            .where("user_id", "==", user.uid)
            .get()
            .then(snapshot => {
              snapshot.forEach(doc => {
                db
                  .collection("users")
                  .doc(doc.id)
                  .update({
                    geolocation: {
                      lat: pos.coords.latitude,
                      lng: pos.coords.longitude
                    }
                  });
              });
            });
        },
        err => {
          this.renderMap();
        },
        { maximumAge: 60000, timeout: 3000 }
      );
    } else {
      this.$toast.open({
        message: "Fail to read GEO info, using default",
        type: "is-warning"
      });
      this.renderMap();
    }

    /*     firebase.auth().onAuthStateChanged(() => {
      console.log(firebase.auth().currentUser);
    }); */
  }
};
</script>

<style scoped>
.google-map {
  width: 100%;
  min-height: 90vh;
  margin: 0 auto;
  background: #fff;
  position: absolute;
  top: 0;
  left: 0;
}

.chatcontainer {
  position: absolute;
  top: 0;
  right: 0;
}
</style>


