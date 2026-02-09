export default {
  namespaced: true,

  state: () => ({
    user: {
      email: 'docent@loi.com',
      password: 'coding'
    },

    isAuthenticated: false,
    twoFactorRequired: false,

    twoFactorCode: '123456' // simulatiecode
  }),

  mutations: {
    LOGIN_SUCCESS(state) {
      state.twoFactorRequired = true
    },

    VERIFY_2FA_SUCCESS(state) {
      state.isAuthenticated = true
      state.twoFactorRequired = false
    },

    LOGOUT(state) {
      state.isAuthenticated = false
      state.twoFactorRequired = false
    },

    UPDATE_CREDENTIALS(state, { email, password }) {
      state.user.email = email
      state.user.password = password
    }
  },

  actions: {
    login({ state, commit }, { email, password }) {
    return new Promise((resolve, reject) => {
      if (
        email.trim() === state.user.email &&
        password.trim() === state.user.password
      ) {
        commit('LOGIN_SUCCESS')
        resolve()
      } else {
        reject('Onjuiste login')
      }
    })
  },

  verify2FA({ state, commit }, code) {
    return new Promise((resolve, reject) => {
      if (code === state.twoFactorCode) {
        commit('VERIFY_2FA_SUCCESS')
        resolve()
      } else {
        reject('Ongeldige 2FA code')
      }
    })
    },

    logout({ commit }) {
      commit('LOGOUT')
    },

    updateCredentials({ commit }, payload) {
      commit('UPDATE_CREDENTIALS', payload)
    }
  },

  getters: {
    isAuthenticated: state => state.isAuthenticated,
    twoFactorRequired: state => state.twoFactorRequired,
    user: state => ({ email: state.user.email })
  }
}
