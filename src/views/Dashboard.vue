<template>
  <ion-page>

    <!-- HEADER -->
    <ion-header>
      <ion-toolbar color="primary">

        <!-- HOME -->
        <ion-buttons slot="start">
          <ion-button color="light" @click="goHome">
            <ion-icon :icon="homeOutline" />
          </ion-button>
        </ion-buttons>

        <ion-title>Dashboard</ion-title>

        <!-- LOGOUT -->
        <ion-buttons slot="end">
          <ion-button color="light" @click="logout">
            Logout
          </ion-button>
        </ion-buttons>

      </ion-toolbar>
    </ion-header>

    <!-- CONTENT -->
    <ion-content class="ion-padding">
      <div class="grid">

        <!-- OPEN INSPECTIONS -->
        <ion-card button @click="goTo('/open-inspections')">
          <ion-card-header>
            <ion-card-title>
              <svg-icon class="card-icon" type="mdi" :path="iconOpen" size="64" />
            </ion-card-title>
          </ion-card-header>

          <ion-card-content>
            Openstaande inspecties
            <p class="count">{{ openCount }}</p>
          </ion-card-content>
        </ion-card>

        <!-- COMPLETED INSPECTIONS -->
        <ion-card button @click="goTo('/completed-inspections')">
          <ion-card-header>
            <ion-card-title>
              <svg-icon class="card-icon" type="mdi" :path="iconCompleted" size="64" />
            </ion-card-title>
          </ion-card-header>

          <ion-card-content>
            Uitgevoerde inspecties
            <p class="count">{{ completedCount }}</p>
          </ion-card-content>
        </ion-card>

        <!-- SETTINGS -->
        <ion-card button @click="goTo('/settings')">
          <ion-card-header>
            <ion-card-title>
              <svg-icon class="card-icon" type="mdi" :path="iconSettings" size="64" />
            </ion-card-title>
          </ion-card-header>

          <ion-card-content>
            Instellingen
          </ion-card-content>
        </ion-card>

        <!-- KNOWLEDGE BASE -->
        <ion-card button @click="goTo('/knowledge-base')">
          <ion-card-header>
            <ion-card-title>
              <svg-icon class="card-icon" type="mdi" :path="iconKnowledge" size="64" />
            </ion-card-title>
          </ion-card-header>

          <ion-card-content>
            Knowledge base
          </ion-card-content>
        </ion-card>

      </div>
    </ion-content>

  </ion-page>
</template>

<script>
import SvgIcon from '@jamescoyle/vue-icon'
import { homeOutline } from 'ionicons/icons'

import {
  mdiFileChart,
  mdiFileChartCheckOutline,
  mdiCogs,
  mdiHomeLightbulb
} from '@mdi/js'

import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonButton,
  IonIcon,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent
} from '@ionic/vue'

export default {
  name: 'DashboardPage',

  components: {
    SvgIcon,
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButtons,
    IonButton,
    IonIcon,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent
  },

  data() {
    return {
      homeOutline,
      iconOpen: mdiFileChart,
      iconCompleted: mdiFileChartCheckOutline,
      iconSettings: mdiCogs,
      iconKnowledge: mdiHomeLightbulb
    }
  },

  computed: {
    openCount() {
      return this.$store.getters['inspections/openCount']
    },
    completedCount() {
      return this.$store.getters['inspections/completedCount']
    }
  },

  mounted() {
    this.$store.dispatch('inspections/loadInspections')
  },

  methods: {
    goTo(route) {
      this.$router.push(route)
    },
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

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.card-icon {
  color: var(--ion-color-secondary);
}

.count {
  margin-top: 0.5rem;
  font-size: 1.6rem;
  font-weight: bold;
  color: var(--ion-color-primary);
}
</style>
