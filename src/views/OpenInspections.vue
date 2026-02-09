<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">

        <ion-buttons slot="start">
          <ion-button color="light" @click="goHome">
            <ion-icon :icon="homeOutline" />
          </ion-button>
        </ion-buttons>

        <ion-title>Openstaande inspecties</ion-title>

        <ion-buttons slot="end">
          <ion-button color="light" @click="logout">
            Logout
          </ion-button>
        </ion-buttons>

      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <ion-list v-if="openInspections.length">
        <ion-item
          v-for="inspection in openInspections"
          :key="inspection.id"
        >
          <ion-label>
            <h2>{{ inspection.title }}</h2>
            <p>{{ inspection.location }}</p>
          </ion-label>

          <ion-badge color="warning">Open</ion-badge>
        </ion-item>
      </ion-list>

      <p v-else>Geen openstaande inspecties</p>
    </ion-content>
  </ion-page>
</template>

<script>
import {
  IonPage, IonHeader, IonToolbar, IonTitle,
  IonContent, IonList, IonItem, IonLabel,
  IonBadge, IonButton, IonButtons, IonIcon
} from '@ionic/vue'
import { homeOutline } from 'ionicons/icons'

export default {
  name: 'OpenInspections',
  components: {
    IonPage, IonHeader, IonToolbar, IonTitle,
    IonContent, IonList, IonItem, IonLabel,
    IonBadge, IonButton, IonButtons, IonIcon
  },
  setup() {
    return { homeOutline }
  },
  computed: {
    openInspections() {
      return this.$store.getters['inspections/inspections']
        .filter(i => i.status === 'open')
    }
  },
  mounted() {
    this.$store.dispatch('inspections/loadInspections')
  },
  methods: {
    goHome() {
      this.$router.push('/dashboard')
    },
    logout() {
      this.$store.dispatch('auth/logout')
      this.$router.push('/login')
    }
  }
}
</script>
