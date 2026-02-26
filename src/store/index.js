// src/store/index.js
import { createStore } from 'vuex'
import auth from './modules/auth'
import inspections from './modules/inspections'

const store = createStore({
  modules: { auth, inspections }
})

store.subscribe((mutation, state) => {
  localStorage.setItem('auth', JSON.stringify(state.auth))
})

export default store