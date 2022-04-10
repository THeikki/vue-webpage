<template>
  <div>
    <AlertValues msg="This is alert value page"/>
  </div>
</template>

<script>
// @ is an alias to /src
import AlertValues from '@/components/AlertValues.vue'

export default {
  name: 'AlertView',
  components: {
    AlertValues
  }
}
</script>
