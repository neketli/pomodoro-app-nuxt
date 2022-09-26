import Vuex from 'vuex'

export default new Vuex.Store({
  state: () => ({
    counter: 0,
  }),
})

export const state = () => ({
  counter: 0,
})

export const getters = {
  getCounter(state) {
    return state.counter
  },
}

export const mutations = {
  increment(state) {
    state.counter++
  },
}

export const actions = {
  fetchCounter({ state }) {
    const res = { data: 10 }
    state.counter = res.data
    return res.data
  },
}
