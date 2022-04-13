import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
  state: {
    values: [],
    showEmpty: null,
    showValues: null
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
          timestamp: '666.6.666',
          value: 666
        })
        .then((response) => {
          console.log(response.data)
        })
        .catch(error => {
          alert(error, 'Virhe')
          console.log(error)
        })
    }
  },
  modules: {}
})
