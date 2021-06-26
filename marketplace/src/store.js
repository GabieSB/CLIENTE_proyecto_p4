import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate';


Vue.use(Vuex)

export default new Vuex.Store({

  state: {
    msje: "Hola",
    usuario: null,
    tienda:null,
    producto:null,
    itemsReporteVentas: null,
    resultadoRuleta: "", 
  },
  plugins: [createPersistedState()],
  mutations: {
  },
  actions: {
 
  },
  getters: {
    tiendaSelecionada(state){
      return state.tienda;
    },
    productoSelecionado(state){
      return state.producto;
    }
  },
  
})