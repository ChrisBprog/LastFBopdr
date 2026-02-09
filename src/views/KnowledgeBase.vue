<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">

        <ion-buttons slot="start">
          <ion-button color="light" @click="goHome">
            <ion-icon :icon="homeOutline" />
          </ion-button>
        </ion-buttons>

        <ion-title>Knowledge Base</ion-title>

        <ion-buttons slot="end">
          <ion-button color="light" @click="logout">
            Logout
          </ion-button>
        </ion-buttons>

      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">

      <ion-card v-for="(item, index) in faq" :key="index">
        <ion-card-header>
          <ion-card-title>{{ item.question }}</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          {{ item.answer }}
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
  IonIcon
} from '@ionic/vue'
import { homeOutline } from 'ionicons/icons'

export default {
  name: 'KnowledgeBasePage',
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
    IonIcon
  },
  setup() {
    return { homeOutline }
  },
  data() {
    return {
      faq: [
        {
          question: 'Wat is een inspectie?',
          answer:
            'Een inspectie is een controle van een locatie of object om de veiligheid en kwaliteit te beoordelen.'
        },
        {
          question: 'Wat is het verschil tussen open en voltooide inspecties?',
          answer:
            'Open inspecties zijn nog niet afgerond. Voltooide inspecties zijn volledig uitgevoerd en beoordeeld.'
        },
        {
          question: 'Hoe werkt het dashboard?',
          answer:
            'Het dashboard geeft een overzicht van het aantal openstaande en voltooide inspecties en biedt snelle navigatie.'
        },
        {
          question: 'Hoe werkt Two-Factor Authentication (2FA)?',
          answer:
            'Na het inloggen met email en wachtwoord moet een extra verificatiecode worden ingevoerd voor extra beveiliging.'
        },
        {
          question: 'Kan ik mijn accountgegevens aanpassen?',
          answer:
            'Ja, in de instellingenpagina kun je je emailadres en wachtwoord aanpassen.'
        }
      ]
    }
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
