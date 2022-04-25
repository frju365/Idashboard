<template>
  <div id="app">
    <header>
      <section class="menu-section">
        <div class="main-menu">
          <div class="logo-igoogle"><a href="/">
    <!--        <img src="./assets/google-logo.png" alt="Google logo"> -->
            <img width="60" height="70" src="./assets/logo.png" alt="IDashBoard logo">
            IDashBoard</a></div>
          <div class="menu-container">
            <md-menu md-direction="bottom-start">
              <md-button md-menu-trigger>Widgets</md-button>
              <md-menu-content>
                <md-menu-item  class="button-content-menu" ref="btnWidget" v-for="item in items" :key="item.name" v-on:click="addWidgets"><md-icon :md-src="require('./assets/'+item.iconPath)" />{{ item.name }}</md-menu-item>
              </md-menu-content>
            </md-menu>
          </div>
        </div>
          <md-content><strong>Choisissez une couleur pour vos widgets : </strong><verte :value="colorWidgets" v-on:input="getColor" picker="square" model="rgb"></verte></md-content>
        <div>
          <md-field>
            <label>Rechercher un widget</label>
            <md-input v-on:keypress="$data.searchableWidget = $event.target.value" v-model="searchableWidget"></md-input>
          </md-field>
        </div>
      </section>
    </header>

    <main  class="widgets-space">
      <component
        v-bind:key="component.index"
        v-for="component in widgets"
        :is="component.component" v-bind:visible="component.visible" v-bind:name="component.name" v-bind:cc="component.cc" v-bind:id="'c'+component.keyG" v-bind:keyG="component.keyG" v-bind:protoXY="component.pXY" v-bind:focus="component.focus"></component>
    </main>
    <footer>

    </footer>
  </div>
  
</template>

<script>

//import HeureDate from './components/HeureDate.vue'
import Meteo from './components/Meteo'
import Widget from './components/Widget'
import HeureDate from './components/HeureDate'
import Twitter from './components/Twitter'
import Photos from './components/Photos'
import News from './components/News'
import store from './store/componentsStore'
import GoogleSearch from "@/components/GoogleSearch";
import Maps from "@/components/Maps";
import Verte from 'verte';
import 'verte/dist/verte.css';
import 'leaflet/dist/leaflet.css';



export default {
  name: "App",
  components: {
    Meteo,
    HeureDate,
    Twitter,
    Photos,
    News,
    Widget,
    Verte,
    GoogleSearch,
    Maps
  },
  store,
  data: function () {
    return {
      searchableWidget: "",
      inc: 1,
      localCache: [],
      items: [
        {
          name: "Meteo",
          component: Meteo,
          iconPath: 'thermostat_black_18dp.svg'
        },
        {
          name: "Heure et Date",
          component: HeureDate,
          iconPath: 'access_time_black_18dp.svg'
        },
        {
          name: "Twitter",
          component: Twitter,
          iconPath: 'sms_black_18dp.svg'
        },
        {
          name: "Photos",
          component: Photos,
          iconPath: 'photo_camera_black_18dp.svg'
        },
        {
          name: "News",
          component: News,
          iconPath: 'travel_explore_black_18dp.svg'
        },
        {
          name: "Google Search",
          component: GoogleSearch,
          iconPath: 'search_black_18dp.svg'
        },
        {
          name: "Maps",
          component: Maps,
          iconPath: 'map_black_18dp.svg'
        }
      ],
    };
  },
  computed: {
    colorWidgets: function () {return store.state.colorWidgets},
    widgets: {
      get () {
        return this.$store.state.widgets;
      },
    },
    pXY: {
      get () {
        return this.$store.state.pXYWidget;
      }
    }
  },
  watch: {
    searchableWidget: function () {
      store.commit('filteredWidgets', this.searchableWidget)
    }
  },
  created() {
    if (localStorage.colorWidgets) {
      store.commit("applyColor", localStorage.colorWidgets);
    }
    if (localStorage.localStore) {
     // Parse localStorage
       let self = this;
       let widgetsLocal = JSON.parse(localStorage.localStore);

       widgetsLocal.forEach(x => {
         let widgetComponent = {};
         self.items.forEach(y => {
           if (y.component.name === x.cc.name){
             widgetComponent = y.component
           }
         })
         let widget = {
           cc: widgetComponent,
           name: x.name,
           keyG: self.inc,
           component: Widget,
           pXY: x.pXY,
           // Focus au click
           focus: x.focus,
           // Visible pour filtre
           visible: true
         };
         store.commit('pushWidget', widget);
         self.inc++;
       })
    }
  },
  methods: {
    addWidgets: function (e) {
      let targetElText = e.target.innerText;
      let self = this;
      this.items.map(x => {
        if (x.name === targetElText.trim() ) {
          let localXYDup = {
            x: self.pXY.x,
            y: self.pXY.y
          }
          let widget = {
            cc: x.component,
            name: x.name,
            keyG: self.inc,
            component: Widget,
            visible: true,
            pXY: localXYDup,
            focus: true,
          };

          store.commit('pushWidget',widget);
          this.localCache.push(widget);
          this.inc++;
        }
      });
      // localStorage.localCache = JSON.stringify(this.localCache);
      store.dispatch("updateLocalStorage");
    },
    getColor: function (c) {
      store.commit("applyColor", c);
      store.dispatch("updateColorLocalStorage");
    }
  }
};
</script>

<style lang="scss">
@import "./scss/main";
</style>

