<template>
  <ion-header>
    <ion-toolbar color="primary">

      <!-- HOME -->
      <ion-buttons slot="start">
        <ion-button router-link="/dashboard" fill="clear">
          <ion-icon :icon="homeOutline" color="light" />
        </ion-button>
      </ion-buttons>

      <!-- TITLE -->
      <ion-title>{{ title }}</ion-title>

      <!-- LOGOUT -->
      <ion-buttons slot="end">
        <ion-button fill="clear" @click="logout">
          <ion-icon :icon="logOutOutline" color="light" />
        </ion-button>
      </ion-buttons>

    </ion-toolbar>
  </ion-header>
</template>

<script setup>
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonIcon
} from '@ionic/vue'

import { homeOutline, logOutOutline } from 'ionicons/icons'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

defineProps({
  title: {
    type: String,
    required: true
  }
})

const store = useStore()
const router = useRouter()

function logout() {
  store.dispatch('auth/logout')
  router.push('/login')
}
</script>
