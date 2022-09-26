<template>
  <v-col>
    <v-row class="mt-16" justify="center" align="center">
      <h2
        :class="`text-h1 ${
          !isTimeBreak ? 'primary' : 'success'
        }--text text--lighten-2`"
      >
        {{ currentTime }}
      </h2>
    </v-row>
    <v-row class="mt-16" justify="center" gap align="center">
      <v-btn
        v-if="!isStarted"
        class="mx-8"
        color="primary"
        elevation="1"
        @click="start"
        >Start</v-btn
      >
      <v-btn v-else class="mx-8" color="primary" elevation="1" @click="pause"
        >Pause</v-btn
      >
      <v-btn class="mx-8" color="secondary" elevation="1" @click="reset"
        >Reset</v-btn
      >
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-card dark>
          <v-card-title class="text-h5"> What we gonna do today? </v-card-title>

          <v-text-field
            v-model="inputField"
            class="pt-2 px-4"
            counter="300"
            label="To do"
            outlined
          />

          <v-card-actions>
            <v-btn text :disabled="!inputField" @click="addTodo">
              Add task
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>

      <v-snackbar v-model="isSnackbarShowing" color="success">
        It's time to relax!
      </v-snackbar>

      <v-col v-for="todo in todos" :key="todo.id" cols="12">
        <v-card :color="`${todo.color} lighten-2`" class="pa-6" dark>
          <v-checkbox
            light
            class="pa-0 ma-0"
            :input-value="todo.done"
            :label="todo.text"
            :color="`${todo.color} darken-4`"
            hide-details
            @change="change(todo)"
          />

          <v-btn class="mt-4" @click="removeTodo(todo)">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </v-card>
      </v-col>
    </v-row>
  </v-col>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'

export default {
  name: 'IndexPage',
  data() {
    return {
      isStarted: false,
      isTimeBreak: false,
      isSnackbarShowing: false,
      audio: null,
      minutes: 25,
      seconds: 0,
      inputField: '',
      interval: {},
    }
  },
  head: {
    title: 'Pomodoro app',
  },
  computed: {
    ...mapGetters({ todos: 'todos/todos' }),
    currentTime() {
      return `${this.minutes.toString().padStart(2, '0')}:${this.seconds
        .toString()
        .padStart(2, '0')}`
    },
  },
  created() {
    if (process.browser) {
      const todos = JSON.parse(localStorage.getItem('todos'))
      this.setTodos(todos)
    }
  },
  mounted() {
    const audioFile = require('@/assets/clock.mp3').default
    this.audio = new Audio(audioFile)
  },
  methods: {
    ...mapActions({
      create: 'todos/create',
      remove: 'todos/remove',
      toggle: 'todos/toggle',
    }),
    ...mapMutations({
      setTodos: 'todos/setTodos',
    }),
    addTodo() {
      this.create({ text: this.inputField, color: this.getRandomColor() })
      this.inputField = ''
      this.updateStorage()
    },
    removeTodo(todo) {
      this.remove(todo)
      this.updateStorage()
    },
    change(todo) {
      this.toggle(todo)
      this.updateStorage()
    },
    getRandomColor() {
      const colors = [
        'red',
        'pink',
        'purple',
        'indigo',
        'blue',
        'cyan',
        'teal',
        'green',
        'amber',
        'orange',
        'grey',
      ]

      return colors[Math.floor(Math.random() * colors.length)]
    },
    start() {
      this.isStarted = true
      this.interval = setInterval(() => {
        if (this.minutes > 0 && this.seconds === 0) {
          this.minutes--
          this.seconds = 60
        }
        this.seconds--

        if (this.minutes + this.seconds === 0) {
          if (this.isTimeBreak) {
            this.reset()
          } else {
            this.timeBreak()
          }
        }
      }, 100)
    },
    reset() {
      this.isSnackbarShowing = false
      this.isStarted = false
      this.isTimeBreak = false
      clearInterval(this.interval)
      this.minutes = 25
      this.seconds = 0
    },
    pause() {
      this.isStarted = false
      clearInterval(this.interval)
    },
    timeBreak() {
      this.audio.play()
      this.isSnackbarShowing = true
      this.pause()
      this.minutes = 5
      this.seconds = 0
      this.isTimeBreak = true
    },
    updateStorage() {
      localStorage.setItem('todos', JSON.stringify(this.todos))
    },
  },
}
</script>
