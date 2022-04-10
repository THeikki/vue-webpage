<template>
  <div>
    <AlertValues
      :msg='text'
      :values='values'
      :deleteValue='deleteValue'
    />
  </div>
</template>

<script>
// @ is an alias to /src
import AlertValues from '@/components/AlertValues.vue'

import axios from 'axios'

export default {
  name: 'AlertView',
  components: {
    AlertValues
  },
  data () {
    return {
      text: 'This is alert value page',
      values: []
    }
  },
  methods: {
    async getValues () {
      await axios
        .get('http://localhost:5000/api/data')
        .then((response) => {
          const resData = response.data
          // console.log(this.values.push.length)
          // console.log(typeof resData)
          for (let i = 0; i < resData.length; i++) {
            console.log(resData[i]
            )
            this.values.push(resData[i])
          }
          return this.values
        })
        .catch(error => {
          console.log(error)
          // this.errored = true
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
  },
  mounted () {
    this.getValues()
  }
}
</script>
