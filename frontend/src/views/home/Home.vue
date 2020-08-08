<template>
  <b-container class="home">
    <b-row>
      <h1 class="home-title col-lg-12">Галлерея</h1>
      <ul class="grid-container home-gallery col-lg-12">
        <li class="home-gallery-item" v-for="image in getImages" :key="image.id">
          <b-img-lazy  :src="image.newImg" alt="image" class="home-gallery-img"></b-img-lazy>
          <div class="home-gallery-img-info">
              <h4 class="home-gallery-img-title">Цвет изображения</h4>
              <div class="home-gallery-img-color" :style="{backgroundColor: image.currentColor}"></div>
          </div>
        </li>
      </ul>
    </b-row>
  </b-container>
</template>
<style lang="sass">
  @import "home"
</style>
<script>
import {mapGetters} from "vuex";
import RequestHelper from "@/helper/helper";
const request = new RequestHelper();
export default {
  name: 'Home',
  data(){
    return{

    }
  },
  created(){
    request.getAllImages().then((images)=>{
      this.$store.dispatch('setImages',images);
    }).catch((error)=>{
      console.error(error);
    })
  },
  computed: {
    ...mapGetters([
      'getImages'
    ])
  },
}
</script>
