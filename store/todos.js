import { v4 as uuidv4 } from 'uuid'

export const state = () => ({
  list: [],
})

export const mutations = {
  add(state, text) {
    state.list.push({
      id: uuidv4(),
      text,
      done: false,
    })
  },
  remove(state, { todo }) {
    state.list.splice(state.list.indexOf(todo), 1)
  },
  toggle(state, todo) {
    todo.done = !todo.done
  },
}
