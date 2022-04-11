<template>
  <div v-if="plankPage" class="container">
  </div>
  <div v-else-if="showEmpty" class="container">
    <p>No data to show</p>
  </div>
  <div v-else>
    <AlertValues
      :msg='text'
      :values='values'
      :deleteValue='deleteValue'
      :showEmpty='showEmpty'
      :plankPage='plankPage'
    />
  </div>
</template>

<script>
// @ is an alias to /src
import AlertValues from '@/components/AlertValues.vue'

import axios from 'axios'
// import { mapGetters } from 'vuex'

export default {
  name: 'AlertView',
  components: {
    AlertValues
  },
  data () {
    return {
      text: 'This is alert value page',
      values: [],
      showEmpty: false,
      plankPage: true
    }
  },
  methods: {
    async getValues () {
      await axios
        .get('http://localhost:5000/api/data')
        .then((response) => {
          const resData = response.data
          for (let i = 0; i < resData.length; i++) {
            console.log(resData[i])
            this.values.push(resData[i])
          }
          if (resData.length === 0) {
            this.showEmpty = true
          }
          this.plankPage = false
          return this.values
        })
        .catch(error => {
          console.log(error)
        })
    },
    async deleteValue (id) {
      await axios
        .delete('http://localhost:5000/api/data/delete/' + id)
        .then(res => {
          console.log(res.data)
        })
        .catch(err => {
          console.log(err)
        })
    }
  }, /*
  computed: {
    val () {
      return this.$store.state.values
    }
  }, */
  mounted () {
    this.getValues()
  }
}
</script>
<style scoped>
[v-cloak] {
  display: none;
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
</style>
