<template>
  <div>
    <md-field>
      <label>Ville</label>
      <md-input v-model="location"></md-input>
      <md-button v-on:click="searchOnMaps" class="md-raised">VALIDER</md-button>
    </md-field>
    <div class="maps">
      <l-map ref="myMap"
          :zoom="zoom"
          :center="center"
          style="height: 190px; width: 100%"
      >
        <l-tile-layer
            :url="url"
            :attribution="attribution"
        />
        <l-marker :lat-lng="marker"></l-marker>
        <l-control
            :position="'bottomleft'"
            class="custom-control-watermark"
        >
          IDashBoard
        </l-control>

      </l-map>
    </div>
  </div>
</template>

<script>
// import L from 'leaflet';
import { latLng } from "leaflet";
import { LMap, LControl, LMarker, LTileLayer} from 'vue2-leaflet';
const axios = require("axios").default;
import { Icon } from 'leaflet';

delete Icon.Default.prototype._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

export default {
  name: "Maps",
  components: {
    LMap,
    LControl,
    LTileLayer,
    LMarker,
  },
  data: function() {
    return {
      zoom: 13,
      center: latLng(48.864716,2.349014),
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution:
          '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      location: "",
      MapQuest: {
        baseURL: 'http://www.mapquestapi.com/geocoding/v1/',
        apiKey: 'XQQix0eKuTEQpz8VAsAytjX9deujFsrc'
      },
      marker: [48.864716,2.349014]
    }
  },
  methods: {
    searchOnMaps: function() {
      axios
          .get(
              this.MapQuest.baseURL +
              'address?key=' +
              this.MapQuest.apiKey +
              '&location=' +
              this.location
          )
          .then((response) => {
            let result = response.data.results;
            // On considère que le premier résultat est le bon
            if (result.length > 0) {
              let latLng = [result[0].locations[0].latLng.lat , result[0].locations[0].latLng.lng]
              this.marker = latLng;
              this.center = this.marker;
            }
          });
    },
  }
}
</script>

<style scoped>

</style>
