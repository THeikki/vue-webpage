<template>
  <div>
    <MeasurementValues
    :text='text'
    :mqttData="mqttData"
    />
  </div>
  <div class="container">
    <p>
      {{ mqttData }}
    </p>
  </div>
</template>

<script>
// @ is an alias to /src
import MeasurementValues from '@/components/MeasurementValues.vue'
import mqtt from 'mqtt/dist/mqtt'

export default {
  name: 'HomeView',
  components: {
    MeasurementValues
  },
  data () {
    return {
      text: 'Welcome to Your Vue.js App',
      connection: {
        host: 'broker.hivemq.com',
        port: 8000,
        endpoint: '/mqtt',
        clean: true,
        connectTimeout: 4000,
        reconnectPeriod: 4000
      },
      subscription: {
        topic: 'arduino/sensor/HC-SR04',
        qos: 0
      },
      client: {
        connected: false
      },
      subscribeSuccess: false,
      mqttData: []
    }
  },
  methods: {
    createConnection () {
      const { host, port, endpoint, ...options } = this.connection
      const connectUrl = `ws://${host}:${port}${endpoint}`
      try {
        this.client = mqtt.connect(connectUrl, options)
      } catch (error) {
        console.log('mqtt.connect error', error)
      }
      this.client.on('connect', () => {
        console.log('Connection succeeded!')
        this.doSubscribe()
      })
      this.client.on('error', error => {
        console.log('Connection failed', error)
      })
      this.client.on('message', (topic, message) => {
        // this.mqttData = this.mqttData.concat(message)
        // console.log(`${message}`)
        const val = JSON.stringify(String.fromCharCode.apply(null, new Uint8Array(message)))
        const test = val.slice(1, -1)
        const t1 = test.split(',')
        this.mqttData = t1
        if (this.mqttData[1] > 20) {
          this.$store.dispatch('postValue', this.mqttData)
        }
        // console.log(this.mqttData)
        console.log(this.mqttData[0])
      })
    },
    doSubscribe () {
      const { topic, qos } = this.subscription
      this.client.subscribe(topic, { qos }, (error, res) => {
        if (error) {
          console.log('Subscribe to topics error', error)
          return
        }
        this.subscribeSuccess = true
        console.log('Subscribe to topics res', res)
      })
    }
  },
  created () {
    this.createConnection()
  }
}
</script>
<style scoped>
.container {
  position: fixed;
  top: 400px;
  bottom: 100px;
  width: 100%;
  margin: 0;
}
</style>
