<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <!-- HOME -->
        <ion-buttons slot="start">
          <ion-button color="light" @click="goHome">
            <ion-icon :icon="homeOutline" />
          </ion-button>
        </ion-buttons>

        <ion-title>Uitgevoerde inspecties</ion-title>

        <!-- LOGOUT -->
        <ion-buttons slot="end">
          <ion-button color="light" @click="logout">
            Logout
          </ion-button>
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
              Inspecteur: {{ inspection.inspecteur || inspection.inspector || '-' }}<br />
              Datum: {{ formatDate(inspection.datum || inspection.inspectionDate) }}
            </p>
          </ion-label>

          <ion-badge color="success">Completed</ion-badge>
        </ion-item>
      </ion-list>

      <p v-else class="empty">
        Geen uitgevoerde inspecties
      </p>

      <!-- DETAILS -->
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

import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { homeOutline } from 'ionicons/icons'
import { loadInspections } from '@/services/inspectionService'
import { onIonViewWillEnter } from '@ionic/vue'

const router = useRouter()

const inspections = ref([])
const selectedInspection = ref(null)

const completedInspections = computed(() =>
  inspections.value.filter(i => i?.status === 'completed')
)

function goHome() {
  router.push('/dashboard')
}

function logout() {
  localStorage.removeItem('user')
  router.push('/login')
}

function titleOf(item) {
  return item.adres || item.title || item.location || `Inspectie #${item.id}`
}

function formatDate(value) {
  if (!value) return '-'
  return new Date(value).toLocaleDateString('nl-NL')
}

function safeParse(json, fallback) {
  try {
    return JSON.parse(json)
  } catch {
    return fallback
  }
}

// Netlify/Vite-safe pad
function inspectionsJsonUrl() {
  return `${import.meta.env.BASE_URL}inspections.json`
}

async function loadAll() {
  inspections.value = await loadInspections()
}

function selectInspection(item) {
  selectedInspection.value = item
}

async function refresh(ev) {
  await loadAll()
  ev?.detail?.complete()
}

onMounted(loadAll)
onIonViewWillEnter(loadAll)
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