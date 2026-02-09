import { getInspections } from '@/services/inspectionService'

export default {
  namespaced: true,

  state: () => ({
    inspections: [],              
    selectedInspection: null,
    loading: false
  }),

  mutations: {
    SET_INSPECTIONS(state, inspections) {
      state.inspections = inspections
    },
    SET_LOADING(state, value) {
      state.loading = value
    },
    SELECT_INSPECTION(state, inspection) {
      state.selectedInspection = inspection
    }
  },

  actions: {
    async loadInspections({ commit }) {
      commit('SET_LOADING', true)

      const inspections = await getInspections()
      commit('SET_INSPECTIONS', inspections)

      commit('SET_LOADING', false)
    },

    selectInspection({ commit }, inspection) {
      commit('SELECT_INSPECTION', inspection)
    }
  },

  getters: {
  inspections: state => state.inspections,

  sortedInspections: state =>
    [...state.inspections].sort(
      (a, b) =>
        new Date(b.inspectionDate) - new Date(a.inspectionDate)
    ),

  openCount: state =>
    state.inspections.filter(i => i.status === 'open').length,

  completedCount: state =>
    state.inspections.filter(i => i.status === 'completed').length
}
}
