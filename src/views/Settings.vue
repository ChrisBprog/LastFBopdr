<template>
  <ion-page>
    <!-- HEADER -->
    <ion-header>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-button color="light" @click="goHome">
            <ion-icon :icon="homeOutline" />
          </ion-button>
        </ion-buttons>

        <ion-title>Instellingen</ion-title>

        <ion-buttons slot="end">
          <ion-button color="light" @click="logout">
            Logout
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <!-- CONTENT -->
    <ion-content class="ion-padding">

      <!-- ACCOUNT INFO -->
      <ion-card class="settings-card">
        <ion-card-header>
          <ion-card-title>Accountgegevens</ion-card-title>
        </ion-card-header>

        <ion-card-content>
          <p class="info-line">
            <strong>Huidig emailadres</strong><br />
            <span>{{ user.email }}</span>
          </p>
        </ion-card-content>
      </ion-card>

      <!-- WIJZIG GEGEVENS -->
      <ion-card class="settings-card">
        <ion-card-header>
          <ion-card-title>Gegevens aanpassen</ion-card-title>
        </ion-card-header>

        <ion-card-content>
          <ion-item>
            <ion-label class="form-item" position="floating">Nieuw emailadres</ion-label>
            <ion-input v-model="email" type="email" />
          </ion-item>

          <ion-item>
            <ion-label class="form-item" position="floating">Nieuw wachtwoord</ion-label>
            <ion-input v-model="password" type="password" />
          </ion-item>

          <ion-button
            expand="block"
            color="primary"
            class="save-button"
            @click="save"
          >
            Opslaan
          </ion-button>
        </ion-card-content>
      </ion-card>

    </ion-content>
  </ion-page>
</template>

<script>
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonButton,
  IonButtons,
  IonIcon,
  IonItem,
  IonLabel,
  IonInput
} from '@ionic/vue'

import { homeOutline } from 'ionicons/icons'

export default {
  name: 'SettingsPage',

  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonButton,
    IonButtons,
    IonIcon,
    IonItem,
    IonLabel,
    IonInput
  },

  setup() {
    return { homeOutline }
  },

  data() {
    return {
      email: this.$store.getters['auth/user'].email,
      password: ''
    }
  },

  computed: {
    user() {
      return this.$store.getters['auth/user']
    }
  },

  methods: {
    goHome() {
      this.$router.push('/dashboard')
    },

    save() {
      if (!this.email || !this.password) {
        alert('Vul een email en wachtwoord in')
        return
      }

      this.$store.dispatch('auth/updateCredentials', {
        email: this.email,
        password: this.password
      })

      this.password = '' // input leegmaken voor veiligheid

      alert('Gegevens succesvol opgeslagen')
    },

    logout() {
      this.$store.dispatch('auth/logout')
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>
.settings-card {
  margin-bottom: 1.5rem;
}

.form-item {
  margin-bottom: 1.5rem;
}

.save-button {
  margin-top: 1.5rem;
}

.info-line {
  font-size: 0.95rem;
  line-height: 1.4;
  color: var(--ion-color-medium);
}

.info-line span {
  color: var(--ion-color-dark);
}
</style>
