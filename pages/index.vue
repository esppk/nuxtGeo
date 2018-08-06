<template>
    <section class="section">
        <div class="google-map" id="map" ref="map"></div>

    </section>
</template>

<script>
export default {
  name: "GMap",
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
    renderMap() {
      const map = new google.maps.Map(this.$refs.map, {
        center: { lat: this.lat, lng: this.lng },
        zoom: 6,
        maxZoom: 15,
        minZoom: 3,
        streetViewControl: false
      });
    }
  },
  mounted() {
    this.$nextTick(this.renderMap);
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
</style>


