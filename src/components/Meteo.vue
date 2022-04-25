<template>
  <div>
    <md-field>
      <label>Ville</label>
      <md-input v-model="ville"></md-input>
      <md-button v-on:click="getMeteo" class="md-raised">VALIDER</md-button>
    </md-field>
    <md-divider></md-divider>
    <md-content><img v-if="image" :src="image" alt=""></md-content>
    <div>
      <div class="md-layout-item md-layout md-gutter">
        <div class="md-layout-item">
          <p>T°</p>
          <p>{{ temp }} ° C</p>
        </div>
        <div class="md-layout-item">
          <p>H</p>
          <p>{{ humidity }}</p>
        </div>
        <div class="md-layout-item">
          <p>P</p>
          <p>{{ pressure }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
const axios = require("axios").default;

export default {
  name: "meteo",
  created: function () {},
  data: function () {
    return {
      temp: "",
      humidity: "",
      pressure: "",
      image: "",
      ville: "",
      positionX: 0,
      positionY: 0,
      positionCursorStartupX:0,
      positionCursorStartupY:0,
      positionCursorNewX:0,
      positionCursorNewY:0,
      eventUp : false,
      apiKey: "617bb9c9251ca8fe64ff92dd5337d9e4",
      baseApiURL: "https://api.openweathermap.org/data/2.5/weather",
      baseIconURL: "http://openweathermap.org/img/wn/"
    };
  },
  computed: {},
  methods: {
    getMeteo: function () {
      let ville = this.ville === "" ? "Pessac" : this.ville;
      axios
        .get(
          this.baseApiURL + "?q=" +
            ville +
            "&appid=" +
            this.apiKey +
            "&lang=fr&units=metric"
        )
        .then((response) => {
          if (response.data.main && response.data.weather.length > 0) {
            this.image = this.baseIconURL + response.data.weather[0].icon + '@2x.png';
            this.temp = response.data.main.temp;
            this.humidity = response.data.main.humidity;
            this.pressure = response.data.main.pressure;
          }
        });
    },
  },
};
</script>
