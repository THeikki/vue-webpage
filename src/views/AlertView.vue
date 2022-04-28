<template>
  <div class="container">
    <div v-show="showEmpty" class="hidden">
      <h1>{{text}}</h1>
      <p>No values to show</p>
    </div>
  </div>
  <div v-show="showValues">
    <AlertValues
    :text='text'
    :savedValues='savedValues'
    :deleteValue='deleteValue'
    />
  </div>
</template>

<script>
// @ is an alias to /src
import AlertValues from '@/components/AlertValues.vue'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'AlertView',
  components: {
    AlertValues
  },
  data () {
    return {
      text: 'This is alert value page'
    }
  },
  computed: {
    showValues () {
      return this.$store.state.showValues
    },
    showEmpty () {
      return this.$store.state.showEmpty
    },
    values () {
      return this.$store.state.values
    },
    ...mapGetters([
      'savedValues'
    ])
  },
  methods: {
    ...mapActions([
      'getValues',
      'deleteValue',
      'postValue'
    ])
  },
  mounted () {
    this.$store.dispatch('getValues')
  },
  updated () {
    this.$store.dispatch('getValues')
  }
}
</script>
<style scoped>
.hidden {
  display: contents;
}
.container {
  position: fixed;
  top: 100px;
  bottom: 100px;
  width: 100%;
  margin: 0;
}
p {
  text-align: center;
}
h1 {
  text-align: center;
}
</style>
