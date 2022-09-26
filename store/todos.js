import { v4 as uuidv4 } from 'uuid'

export const state = () => ({
  todos: [],
})

export const getters = {
  todos(state) {
    return state.todos
  },
}

export const mutations = {
  create(state, { text, color }) {
    state.todos.push({
      id: uuidv4(),
      text,
      color,
      done: false,
    })
  },
  remove(state, todo) {
    state.todos.splice(state.todos.indexOf(todo), 1)
  },
  toggle(state, todo) {
    todo.done = !todo.done
  },
  setTodos(state, todos) {
    state.todos = todos
  },
}

export const actions = {
  create({ commit, state }, todo) {
    commit('create', todo)
  },
  remove({ commit, state }, todo) {
    commit('remove', todo)
  },
  toggle({ commit }, todo) {
    commit('toggle', todo)
  },
}
