import { createStore } from 'vuex'
import axios from 'axios'
import mqtt from 'mqtt/dist/mqtt'

export default createStore({
  state: {
    datas: [],
    values: [],
    showEmpty: null,
    showValues: null,
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
  },
  getters: {
    savedValues: state => {
      const savedValues = state.values.map(value => {
        return {
          _id: value._id,
          timestamp: value.timestamp,
          value: value.value
        }
      })
      return savedValues
    }
  },
  mutations: {
    deleteValue (state, id) {
      // console.log('poistettu:', id)
      state.values._id = id
    },
    setValues (state, value) {
      state.values = value
    },
    setDatas (state, value) {
      state.datas = value
    }
  },
  actions: {
    async deleteValue ({ commit }, id) {
      await axios
        .delete('http://localhost:5000/api/data/delete/' + id)
        .then(res => {
          console.log(res.data)
          commit('deleteValue', id)
        })
        .catch(error => {
          alert(error, 'Virhe')
          console.log(error)
        })
    },
    async getValues ({ commit }) {
      await axios
        .get('http://localhost:5000/api/data')
        .then((response) => {
          // console.log(response.data)
          if (response.data.length === 0) {
            this.state.showEmpty = true
            this.state.showValues = false
          } else {
            this.state.showValues = true
            this.state.showEmpty = false
          }
          commit('setValues', response.data)
        })
        .catch(error => {
          alert(error, 'Virhe')
          console.log(error)
        })
    },
    async postValue () {
      await axios
        .post('http://localhost:5000/api/data/save', {
          timestamp: this.state.datas[0],
          value: this.state.datas[1]
        })
        .then((response) => {
          console.log(response.data)
        })
        .catch(error => {
          alert(error, 'Virhe')
          console.log(error)
        })
    },
    createConnection ({ commit, dispatch }) {
      const { host, port, endpoint, ...options } = this.state.connection
      const connectUrl = `ws://${host}:${port}${endpoint}`
      try {
        this.state.client = mqtt.connect(connectUrl, options)
      } catch (error) {
        console.log('mqtt.connect error', error)
      }
      this.state.client.on('connect', () => {
        console.log('Connection succeeded!')
        if (this.state.subscribeSuccess === false) {
          dispatch('doSubscribe')
        }
      })
      this.state.client.on('error', error => {
        console.log('Connection failed', error)
      })
      this.state.client.on('message', (topic, message) => {
        const val = JSON.stringify(String.fromCharCode.apply(null, new Uint8Array(message)))
        const test = val.slice(1, -1)
        const t1 = test.split(',')
        commit('setDatas', t1)
        if (t1[1] > 20) {
          dispatch('postValue', t1)
        }
        console.log(t1)
      })
    },
    doSubscribe () {
      const { topic, qos } = this.state.subscription
      this.state.client.subscribe(topic, { qos }, (error, res) => {
        if (error) {
          console.log('Subscribe to topics error', error)
          return
        }
        this.state.subscribeSuccess = true
        console.log('Subscribe to topics res', res)
      })
    }
  },
  modules: {}
})
