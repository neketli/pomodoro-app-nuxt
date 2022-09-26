<template>
  <v-col>
    <v-row class="mt-16" justify="center" align="center">
      <h2 class="text-h1 purple--text text--lighten-2">{{ currentTime }}</h2>
    </v-row>
    <v-row class="mt-16" justify="center" gap align="center">
      <v-btn class="mx-8" color="primary" elevation="1">Start</v-btn>
      <v-btn class="mx-8" color="secondary" elevation="1">Reset</v-btn>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-card dark>
          <v-card-title class="text-h5"> Add todo: </v-card-title>

          <v-text-field
		  class='pt-2 px-4'
		  counter="300"
              label="Outlined"
              placeholder="Placeholder"
              outlined
            ></v-text-field>

          <v-card-actions>
            <v-btn text> Add now </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>

	  <v-col cols="12">
        <v-card dark>
          <v-card-title class="text-h5"> Add todo: </v-card-title>

          <v-card-subtitle
            >Listen to your favorite artists and albums whenever and wherever,
            online and offline.</v-card-subtitle
          >

          <v-card-actions>
            <v-btn text> Listen Now </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-col>
</template>

<script>
export default {
  name: 'IndexPage',
  data() {
    return {
      minutes: 25,
      seconds: 0,
    }
  },
  head: {
    title: 'Pomodoro app',
  },
  computed: {
    currentTime() {
      return `${this.minutes.toString().padStart(2, '0')}:${this.seconds
        .toString()
        .padStart(2, '0')}`
    },
  },
}
</script>
