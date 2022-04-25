import Vue from 'vue'
import Vuex from "vuex";
const levenshtein = require("levenshtein");

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        widgets: [],
        pXYWidget: {x: 0, y:0},
        colorWidgets: "#FFF"
    },
    getters: {
        getWidgets: function (state) {
            return state.widgets;
        },
        getInc: function (state) {
            let inc = 0;
            state.widgets.forEach(x => {
                if (x.inc > inc) {
                    inc = x.inc
                }
            });
            return inc;
        }
    },
    mutations: {
        pushWidget: (state, widget) => {
            state.widgets.forEach(x => {
                x.focus = false;
            });
            state.widgets.push(widget);

            if (state.widgets.length % 3 === 0) {
                state.pXYWidget.x = 0;
                state.pXYWidget.y += 250;
            }
            else {
                state.pXYWidget.x += 350
            }
        },
        changeFocus: (state, object) => {
            state.widgets.forEach(x => {
                x.focus = false;
            });
            state.widgets.forEach(el => {
                if (el.keyG === object.key) {
                    el.focus = object.focus;
                }
            })
        },
        removeWidget: (state, key) => {

            let target = null
            // On cherche l'index
            state.widgets.forEach((x, i) => {
                if (x.keyG === key) {
                    target = i;
                }
            })
            if (target !== null) state.widgets.splice(target, 1)

            if (state.widgets.length % 3 === 0) {
                state.pXYWidget.x = 0;
                state.pXYWidget.y -= 250;
            }
            else {
                state.pXYWidget.x -= 350
            }

        },
        changePXY: (state, object) => {
            state.widgets.forEach((x) => {
                if (x.keyG === object.key) {
                    x.pXY = object.pXY;
                }
            })



        },
        filteredWidgets: function(state, name){
            state.widgets.forEach(x => {
                let le = new levenshtein(x.name, name);
                // Si la distance de Levenshtein est inférieur ou égal à 5
                x.visible = !(name !== "" && le.distance >= 5);
            })
        },
        applyColor: function(state, color) {
            state.colorWidgets = color;
        }
    },
    actions: {
        updateLocalStorage: (context) => {
            localStorage.localStore = JSON.stringify(context.state.widgets);
        },
        updateColorLocalStorage: (context) => {
            localStorage.colorWidgets = context.state.colorWidgets;
        }
    }
})
