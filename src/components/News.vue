<template>
  <div>
    <md-field>
      <label>Un sujet d'actualité</label>
      <md-input v-model="query"></md-input>
      <md-button v-on:click="getPhoto" class="md-raised">VALIDER</md-button>
    </md-field>
    <md-divider></md-divider>
    <div>
      <md-content v-bind:key="new_article.index" v-for="new_article in list_article">
        <div class="content-article">
          <div>
            {{ parseDate(new_article.publishedAt) }}<a v-bind:href="new_article.url">{{ new_article.title }}</a>
          </div>
          <div>
            <img v-bind:src="new_article.image" v-bind:alt="new_article.title">
          </div>
        </div>
        <md-divider></md-divider>
      </md-content>
    </div>

  </div>
</template>
<script>
const axios = require("axios").default;

export default {
  name: "news",
  created: function () {},
  data: function () {
    return {
      query: "",
      list_article: [],
      apiKey: "b9d24041a3bc0da47cbd779da811d239"
    };
  },
  computed: {},
  methods: {
    getPhoto: function () {
      let query = this.query === "" ? "Covid19" : this.query;
      axios
        .get("https://gnews.io/api/v4/search?q="+ query +"&token=" + this.apiKey + "&lang=fr")
        .then((response) => {
          if (response.data.articles) {
            this.list_article = response.data.articles
          }
        });
    },
    parseDate:  function (date) {
      let final_date = new Date(date);
      return final_date.toLocaleDateString();
    }
  }
};
</script>
