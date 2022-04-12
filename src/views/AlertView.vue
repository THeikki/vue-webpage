<template>
  <div>
    <AlertValues
    :msg='text'
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
    /* showEmpty () {
      return this.$store.state.showEmpty
    },
    plankPage () {
      return this.$store.state.plankPage
    }, */
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
      'deleteValue'
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
</style>
