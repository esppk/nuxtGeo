<template>
  <section>
    <div class="container">
      <flux-parallax src="https://images.pexels.com/photos/819087/pexels-photo-819087.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" height="300px" type="relative">
  
          <h1  class="has-text-centered is-size-1" id="about">About</h1>

      </flux-parallax>
    </div>


    <div class="textcontainer is-fluid">
      <p>Chat with people at same region in <strong>real time</strong></p>     
    </div>
  </section>

</template>

<script>
import { FluxParallax } from "vue-flux";

export default {
  components: {
    FluxParallax
  }
};
</script>

<style scoped>
.level {
  width: 100%;
}

p {
  margin-top: 4rem;
  font-family: "Pacifico", cursive;
  font-size: 1.7rem;
}

.textcontainer {
  display: flex;
  justify-content: center;
  align-content: center;
}
#about {
  display: block;
  margin-left: 39vw;
  margin-top: 5rem;
  height: 1.8rem;
  font-family: "Lobster", cursive;
  color: white;
  text-shadow: 0 2px 2px #000;
}
</style>

