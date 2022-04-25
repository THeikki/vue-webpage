<template>
  <div>
    <MeasurementValues
    :text='text'
    />
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
      subscribeSuccess: false
    }
  },
  methods: {
    createConnection () {
      const { host, port, endpoint, ...options } = this.connection
      const connectUrl = `ws://${host}:${port}${endpoint}`
      try {
        this.client = mqtt.connect(connectUrl, options)
      } catch (error) {
        console.log('Ei toimi')
        // console.log('mqtt.connect error', error)
      }
      this.client.on('connect', () => {
        console.log('Connection succeeded!')
      })
      this.client.on('error', error => {
        console.log('Connection failed', error)
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
  mounted () {
    this.createConnection()
  }
}
</script>
