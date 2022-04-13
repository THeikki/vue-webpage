<template>
  <div>
    <MeasurementValues text="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import MeasurementValues from '@/components/MeasurementValues.vue'

export default {
  name: 'HomeView',
  components: {
    MeasurementValues
  }
}
</script>
