<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-button color="light" @click="goHome">
            <ion-icon :icon="homeOutline" />
          </ion-button>
        </ion-buttons>

        <ion-title>Uitgevoerde inspecties</ion-title>

        <ion-buttons slot="end">
          <ion-button color="light" @click="logout">Logout</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <ion-refresher slot="fixed" @ionRefresh="refresh">
        <ion-refresher-content />
      </ion-refresher>

      <ion-list v-if="completedInspections.length">
        <ion-item
          v-for="inspection in completedInspections"
          :key="inspection.id"
          button
          @click="selectInspection(inspection)"
        >
          <ion-label>
            <h2>{{ titleOf(inspection) }}</h2>
            <p>
              Inspecteur: {{ inspection.inspecteur || '-' }}<br />
              Datum: {{ formatDate(inspection.datum) }}
            </p>
          </ion-label>

          <ion-badge color="success">Completed</ion-badge>
        </ion-item>
      </ion-list>

      <p v-else class="empty">Geen uitgevoerde inspecties</p>

      <ion-card v-if="selectedInspection" class="details">
        <ion-card-header>
          <ion-card-title>Details</ion-card-title>
        </ion-card-header>

        <ion-card-content>
          <p><strong>Adres:</strong> {{ selectedInspection.adres || '-' }}</p>
          <p><strong>Inspecteur:</strong> {{ selectedInspection.inspecteur || '-' }}</p>
          <p><strong>Datum:</strong> {{ formatDate(selectedInspection.datum) }}</p>
          <p><strong>Status:</strong> {{ selectedInspection.status }}</p>

          <ion-button expand="block" fill="outline" @click="selectedInspection = null">
            Sluiten
          </ion-button>

          <ion-button expand="block" color="medium" @click="markOpen(selectedInspection.id)">
            Zet terug naar open
          </ion-button>
        </ion-card-content>
      </ion-card>
    </ion-content>
  </ion-page>
</template>

<script setup>
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonButtons, IonButton, IonIcon,
  IonList, IonItem, IonLabel, IonBadge,
  IonCard, IonCardHeader, IonCardTitle, IonCardContent,
  IonRefresher, IonRefresherContent
} from '@ionic/vue'

import { ref, computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { homeOutline } from 'ionicons/icons'
import { useStore } from 'vuex'
import { onIonViewWillEnter } from '@ionic/vue'

const router = useRouter()
const store = useStore()

const selectedInspection = ref(null)

const completedInspections = computed(() =>
  store.getters['inspections/completedInspections']
)

async function loadAll() {
  await store.dispatch('inspections/loadInspections')
}

onMounted(loadAll)
onIonViewWillEnter(loadAll)

watch(completedInspections, () => {
  if (!selectedInspection.value) return
  const stillThere = completedInspections.value.some(i => i.id === selectedInspection.value.id)
  if (!stillThere) selectedInspection.value = null
})

function goHome() {
  router.push('/dashboard')
}

function logout() {
  localStorage.removeItem('user')
  router.push('/login')
}

function titleOf(item) {
  return item.adres || `Inspectie #${item.id}`
}

function formatDate(value) {
  if (!value) return '-'
  try {
    const d = new Date(value)
    if (isNaN(d.getTime())) return String(value)
    return d.toLocaleDateString('nl-NL')
  } catch {
    return String(value)
  }
}

function selectInspection(item) {
  selectedInspection.value = item
}

async function refresh(ev) {
  await loadAll()
  ev?.detail?.complete()
}

async function markOpen(id) {
  await store.dispatch('inspections/markOpen', id)
  selectedInspection.value = null
}
</script>

<style scoped>
.empty {
  color: var(--ion-color-secondary);
  margin-top: 1rem;
}

.details {
  margin-top: 1rem;
}
</style>