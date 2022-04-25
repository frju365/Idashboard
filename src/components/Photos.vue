<template>
  <div>
    <md-field>
      <label>Une petite photo...</label>
      <md-input v-model="query"></md-input>
      <md-button v-on:click="getPhoto" class="md-raised">VALIDER</md-button>
    </md-field>
    <md-divider></md-divider>
    <md-content><img v-if="imageUrl" :src="imageUrl" alt=""></md-content>
  </div>
</template>
<script>
const axios = require("axios").default;

export default {
  name: "photos",
  created: function () {},
  data: function () {
    return {
      query: "",
      imageUrl: "",
      static_url_photo: "https://live.staticflickr.com/"
    };
  },
  computed: {},
  methods: {
    getPhoto: function () {
      let query = this.query === "" ? "Chat" : this.query;
      axios
          .get(
              "https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=b814e14c2f00a39f4207542b79c7a916&text=" +
              query, {responseType: 'document',}
          )
          .then((response) => {
            // Sur un nombre de résultats énorme, on considère que la moitié (au moins) sont corrects.
            let limit = Math.trunc(response.data.getElementsByTagName('photo').length / 2);
            if (limit > 1) {
              let i = Math.floor((Math.random() * limit - 1));
              let imageContainer = response.data.getElementsByTagName('photo')[i];
              let server = imageContainer.getAttribute('server');
              let photoId = imageContainer.getAttribute('id');
              let secret = imageContainer.getAttribute('secret');
              this.imageUrl = this.static_url_photo + '/' + server + '/' + photoId + '_' + secret + '.jpg';
            }
          });
    },
  }
};
</script>
