<template>
  <HeaderComponent />
  <div class="container">
    <h1>{{ text }}</h1>
    <div class="center">
      <column-chart :data="[[datas[0], datas[1]]]" xtitle="Time" ytitle="Distance / cm"></column-chart>
    </div>
  </div>
  <FooterComponent />
</template>

<script>
import HeaderComponent from '@/components/HeaderComponent.vue'
import FooterComponent from '@/components/FooterComponent.vue'

export default {
  name: 'MeasurementValues',
  props: {
    text: String,
    datas: Array
  },
  components: {
    HeaderComponent,
    FooterComponent
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.center {
  padding: 10px;
}
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
p {
  font-size: 25px;
  text-align: center;
}
</style>
