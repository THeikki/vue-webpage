import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
  state: {
    values: []
    // showEmpty: false
    // plankPage: true
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
      console.log('poistettu:', id)
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
          // dispatch('getValues')
        })
        .catch(err => {
          console.log(err)
        })
    },
    async getValues ({ commit }) {
      await axios
        .get('http://localhost:5000/api/data')
        .then((response) => {
          // console.log(response.data)
          /* if (response.data.length === 0) {
            this.state.showEmpty = true
          } */
          commit('setValues', response.data)
          // this.state.plankPage = false
        })
        .catch(error => {
          console.log(error)
        })
    }
  },
  modules: {
  }
})
