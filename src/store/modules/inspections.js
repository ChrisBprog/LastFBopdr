// src/store/modules/inspections.js
import {
  loadInspections as serviceLoadInspections,
  upsertInspection as serviceUpsertInspection,
  removeInspection as serviceRemoveInspection,
  setInspectionStatus as serviceSetInspectionStatus
} from '@/services/inspectionService'

const state = () => ({
  items: [],
  loading: false,
  error: null
})

const getters = {
  allInspections: (state) => state.items,

  openInspections: (state) =>
    state.items.filter(i => i?.status === 'open'),

  completedInspections: (state) =>
    state.items.filter(i => i?.status === 'completed'),

  openCount: (state, getters) => getters.openInspections.length,
  completedCount: (state, getters) => getters.completedInspections.length
}

const mutations = {
  SET_LOADING(state, value) {
    state.loading = value
  },
  SET_ERROR(state, value) {
    state.error = value
  },
  SET_INSPECTIONS(state, list) {
    state.items = Array.isArray(list) ? list : []
  },
  UPSERT_LOCAL(state, item) {
    const idx = state.items.findIndex(i => i.id === item.id)
    if (idx >= 0) state.items.splice(idx, 1, item)
    else state.items.push(item)
  },
  REMOVE_LOCAL(state, id) {
    state.items = state.items.filter(i => i.id !== id)
  },
  SET_STATUS_LOCAL(state, { id, status }) {
    const idx = state.items.findIndex(i => i.id === id)
    if (idx === -1) return
    state.items.splice(idx, 1, { ...state.items[idx], status })
  }
}

const actions = {
  async loadInspections({ commit }) {
    commit('SET_LOADING', true)
    commit('SET_ERROR', null)
    try {
      const list = await serviceLoadInspections()
      commit('SET_INSPECTIONS', list)
    } catch (e) {
      console.error(e)
      commit('SET_ERROR', e?.message || 'Laden mislukt')
      commit('SET_INSPECTIONS', [])
    } finally {
      commit('SET_LOADING', false)
    }
  },

  async upsertInspection({ commit }, inspection) {
    commit('SET_ERROR', null)
    try {
      const saved = serviceUpsertInspection(inspection)
      commit('UPSERT_LOCAL', saved)
      return saved
    } catch (e) {
      console.error(e)
      commit('SET_ERROR', e?.message || 'Opslaan mislukt')
      throw e
    }
  },

  async removeInspection({ commit }, id) {
    commit('SET_ERROR', null)
    try {
      const next = serviceRemoveInspection(id)
      if (Array.isArray(next)) commit('SET_INSPECTIONS', next)
      else commit('REMOVE_LOCAL', id)
    } catch (e) {
      console.error(e)
      commit('SET_ERROR', e?.message || 'Verwijderen mislukt')
      throw e
    }
  },

  async setStatus({ commit }, { id, status }) {
    commit('SET_ERROR', null)
    try {
      const updated = serviceSetInspectionStatus(id, status)
      if (updated) commit('UPSERT_LOCAL', updated)
      else commit('SET_STATUS_LOCAL', { id, status })
      return updated
    } catch (e) {
      console.error(e)
      commit('SET_ERROR', e?.message || 'Status aanpassen mislukt')
      throw e
    }
  },

  async markCompleted({ dispatch }, id) {
    return dispatch('setStatus', { id, status: 'completed' })
  },

  async markOpen({ dispatch }, id) {
    return dispatch('setStatus', { id, status: 'open' })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}