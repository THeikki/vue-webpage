<template>
  <HeaderComponent />
  <div class="container">
    <h1>{{ text }}</h1>
  </div>
  <FooterComponent />
</template>

<script>
import HeaderComponent from '@/components/HeaderComponent.vue'
import FooterComponent from '@/components/FooterComponent.vue'

export default {
  name: 'MeasurementValues',
  props: {
    text: String
  },
  components: {
    HeaderComponent,
    FooterComponent
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
  position: fixed;
  top: 100px;
  bottom: 100px;
  width: 100%;
  margin: 0;
}
h1 {
  text-align: center;
}
a {
  color: #315a48;
}
</style>
