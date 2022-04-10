<template>
  <HeaderComponent />
  <div class="container">
    <h1>{{ msg }}</h1>
  </div>
  <FooterComponent />
</template>

<script>
import HeaderComponent from '@/components/HeaderComponent.vue'
import FooterComponent from '@/components/FooterComponent.vue'

export default {
  name: 'MeasurementValues',
  props: {
    msg: String
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
  position:fixed;
  top:100px;
  bottom:100px;
  background-color:aliceblue;
  width:100%;
  margin:0;
}
h1 {
  text-align: center;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #315a48;
}
</style>
