<template>

  <div class="heure-date-widget">
    <div class="date">
      <div> On est le {{ jour }} {{ mois }} {{ annee }}</div>
    </div>
    <div class="heure">
      {{heure}}
    </div>
  </div>
</template>
<script>

export default {
  name: 'HeureDate',
  data: function () {
    return {
      timestamp: '',
      heure: '',
      jour: '',
      mois: '',
      annee: '',
      mois_list: [
          "Janvier",
          "Février",
          "Mars",
          "Avril",
          "Mai",
          "Juin",
          "Juillet",
          "Août",
          "Septembre",
          "Octobre",
          "Novembre",
          "Décembre"
      ]
    }
  },
  created: function () {
    if (this.timestamp === "") {
      this.timestamp = new Date().getTime();
    }
    this.startIntervals();
  },
  watch: {
    timestamp: function () {
      let date_from_timestamp = new Date (this.timestamp);
      this.heure = date_from_timestamp.getHours().toLocaleString(undefined, {minimumIntegerDigits: 2}) + ':' + date_from_timestamp.getMinutes().toLocaleString(undefined, {minimumIntegerDigits: 2}) + ':' + date_from_timestamp.getSeconds().toLocaleString(undefined, {minimumIntegerDigits: 2});
      this.jour = date_from_timestamp.getDay();
      this.annee = date_from_timestamp.getFullYear();
      // Le mois sera toujours entre 1 et 12
      this.mois = this.mois_list[date_from_timestamp.getMonth() - 1];
    }
  },
  methods: {
    startIntervals: function () {
      const self = this
      setInterval(() => {
        self.timestamp += 1000;
      }, 1000);
    }
  }
}
</script>
<style>
.heure {
  padding: 5px 0;
  font-size: 34px;
  font-family: AlfaslabOne, sans-serif;
}

</style>
