<template>
  <div>
    <MeasurementValues
    :text='text'
    :datas='datas'
    />
  </div>
</template>

<script>
// @ is an alias to /src
import MeasurementValues from '@/components/MeasurementValues.vue'
import { mapActions } from 'vuex'

export default {
  name: 'HomeView',
  components: {
    MeasurementValues
  },
  data () {
    return {
      text: 'Welcome to Your Vue.js App'
    }
  },
  computed: {
    datas () {
      return this.$store.state.datas
    }
  },
  methods: {
    ...mapActions([
      'postValue',
      'createConnection'
    ])
  },
  mounted () {
    this.$store.dispatch('createConnection')
  }
}
</script>
<style scoped>
.container {
  position: fixed;
  top: 100px;
  bottom: 100px;
  width: 100%;
  margin: 0;
}
p {
  text-align: center;
  padding: 20px;
}
h1 {
  text-align: center;
}
</style>
