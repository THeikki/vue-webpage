<template>
  <HeaderComponent />
  <div class="container">
    <h1>{{ text }}</h1>
    <div class="table-container">
      <table>
      <thead>
        <tr>
          <th>Time</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="value in savedValues" :key="value._id">
            <td>{{ value.timestamp }}</td>
            <td>{{ value.value}}</td>
            <td>
                <button @click="deleteValue(value._id)">Delete</button>
            </td>
        </tr>
      </tbody>
    </table>
    </div>
  </div>
  <FooterComponent />
</template>

<script>
import HeaderComponent from '@/components/HeaderComponent.vue'
import FooterComponent from '@/components/FooterComponent.vue'

export default {
  name: 'AlertValues',
  props: {
    text: String,
    savedValues: Array,
    deleteValue: Function
  },
  components: {
    HeaderComponent,
    FooterComponent
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.table-container {
  padding: 50px;
}
.container {
  position: fixed;
  top: 100px;
  bottom: 100px;
  width: 100%;
  margin: 0;
  overflow: auto;
}
h1 {
  text-align: center;
}
a {
  color: #315a48;
}
table {
  margin: auto;
  border-collapse: collapse;
  width: fit-content;
}
th,td {
  border: 1px solid black;
  background-color: rgb(245, 199, 114);
  padding: 10px;
}
</style>
