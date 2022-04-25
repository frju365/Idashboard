<template>
  <div class="widget" ref="mtg" :class="{'focused': focus, 'invisible': !visible}"  v-on:click="makeFocus" v-bind:style="{left: this.positionX+'px', top: this.positionY+'px'}">
    <div>
      <div class="bord-haut"></div>
      <div class="bord-bas"></div>
      <div class="bord-droite"></div>
      <div class="bord-gauche"></div>
      <div class="window-title" @mouseout="mouseOut" @mouseup="mouseUpCustom" @mousemove="moveWidget" @mousedown="mouseDownEventWidget">
        {{ this.name }}
        <a v-on:click="removeWidget" href="#"><md-icon :md-src="require('../assets/close_white.svg')" /></a>
      </div>
      <div class="widget-content" v-bind:style="{background: color}">
        <component v-bind:is="widget"></component>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "main-widget",
  props: {
    cc: Object,
    name: String,
    protoXY: Object,
    focus: Boolean,
    keyG: Number,
    visible: Boolean
  },
  created: function () {

  },
  data: function () {
    return {
      positionCursorStartupX:0,
      positionCursorStartupY:0,
      positionCursorNewX:0,
      positionCursorNewY:0,
      eventUp : false
    };
  },
  computed: {
    widget: function () {
      return this.cc;
    },
    positionX: function () {return this.protoXY.x},
    positionY: function () {return this.protoXY.y},
    color: function () {return this.$store.state.colorWidgets;}

  },
  watch: {

  },
  methods: {
    moveWidget: function(e) {
      if (this.eventUp) {
        this.positionCursorNewX = this.positionCursorStartupX - e.clientX;
        this.positionCursorNewY = this.positionCursorStartupY - e.clientY;
        this.positionCursorStartupX = e.clientX;
        this.positionCursorStartupY = e.clientY;
        let positionY = this.$el.offsetTop - this.positionCursorNewY;
        let positionX = this.$el.offsetLeft - this.positionCursorNewX;
        this.$store.commit("changePXY", {key: this.keyG,pXY:{y: positionY, x: positionX}});
        this.$store.dispatch('updateLocalStorage');
      }
    }, 
    mouseDownEventWidget: function (e) {
      this.makeFocus()
      this.positionCursorStartupX = e.clientX;
      this.positionCursorStartupY = e.clientY;
      this.eventUp = true;
    
    },
    mouseUpCustom: function() {
      this.eventUp = false;
    },
    mouseOut: function(e) {
      e.preventDefault();
      this.$refs.mtg.__vue__.moveWidget(e);
    },
    makeFocus: function () {
      // On ne peut mettre qu'un seul argument dans le commit https://vuex.vuejs.org/fr/guide/mutations.html#acter-avec-un-argument-additionnel
      let focusObjectPlayload = {
        key: this.keyG,
        focus: true
      }
      this.$store.commit('changeFocus', focusObjectPlayload)
    },
    removeWidget: function (e) {
      e.preventDefault();
      this.$store.commit('removeWidget', this.keyG)
      this.$store.dispatch("updateLocalStorage")
    }
  },
};
</script>
<style>
.widget {
  background-color: white;
}
.hidden {
  display: none;
}
.focused {
  z-index: 1000;
}

.focused .window-title {
  background: #000000;
}

.focused .bord-haut, .focused .bord-bas, .focused .bord-gauche, .focused .bord-droite {
  background: #000000;
}

.invisible {
  display: none;
}
</style>
