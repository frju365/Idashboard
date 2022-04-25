<template>
  <div class="searchWidget">
    <md-field>
      <label>Rechercher un mot sur les sites de l'université</label>
      <md-input v-model="query"></md-input>
    </md-field>
    <div>
      <md-button v-on:click="searchQuery" class="md-raised">VALIDER</md-button>
    </div>
    <div class="items-list">
      <div class="single-item" v-bind:key="item.index" v-for="item in itemsResult">
        <a :href="item.link">{{ item.title }}</a> : {{item.snippet}}
      </div>
    </div>
  </div>
</template>

<script>
const axios = require("axios").default;

export default {
  name: "GoogleSearch.vue",
  data: function () {
    return {
      searchAPI: "AIzaSyCtbZsPMkJjSDEIet0Mc9RWaMNDUCubiGs",
      baseSearchAPI: 'https://www.googleapis.com/customsearch/v1?',
      query: "",
      itemsResult: []
    }
  },
  methods: {
    searchQuery: function () {
      axios
          .get(
              this.baseSearchAPI +
              'key=' +
              this.searchAPI +
              '&cx=25d039b3f8e3fd27c&q=' +
              this.query
          )
          .then((response) => {
            // Réinitialisation du tableau de résultat pour la nouvelle recherche.
            this.itemsResult = []
            for (let item of response.data.items) {
              this.itemsResult.push(item)
            }
          });
    }
  }

}
</script>

<style scoped>

</style>
