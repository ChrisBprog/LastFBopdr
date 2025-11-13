<template>
  <ion-page>
    <!-- HEADER -->
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>Mijn Dashboard</ion-title>
      </ion-toolbar>
    </ion-header>

    <!-- CONTENT -->
    <ion-content class="ion-padding">
      <div class="grid">
        <!-- Kaart 1 -->
        <ion-card button @click="openFunctie('rapporten')">
          <ion-card-header>
            <ion-card-title><svg-icon type="mdi" :path="icon1" size="75" /></ion-card-title>
          </ion-card-header>
          <ion-card-content>
            Bekijk toegewezen rapportages.
          </ion-card-content>
        </ion-card>

        <!-- Kaart 2 -->
        <ion-card button @click="openFunctie('gebruikers')">
          <ion-card-header>
            <ion-card-title><svg-icon type="mdi" :path="icon2" size="75" /></ion-card-title>
          </ion-card-header>
          <ion-card-content>
            Bekijk uitgevoerde rapportages.
          </ion-card-content>
        </ion-card>

        <!-- Kaart 3 -->
        <ion-card button @click="openFunctie('instellingen')">
          <ion-card-header>
            <ion-card-title><svg-icon type="mdi" :path="icon3" size="75" /></ion-card-title>
          </ion-card-header>
          <ion-card-content>
            Instellingen.
          </ion-card-content>
        </ion-card>

        <!-- Kaart 4 -->
        <ion-card button @click="openFunctie('ondersteuning')">
          <ion-card-header>
            <ion-card-title><svg-icon type="mdi" :path="icon4" size="75" /></ion-card-title>
          </ion-card-header>
          <ion-card-content>
            Bekijk de kennisbase/documentatie.
          </ion-card-content>
        </ion-card>
      </div>
    </ion-content>

    <!-- FOOTER -->
    <ion-footer>
      <ion-toolbar color="medium">
        <ion-title size="small">© 2025 RealEstateCare</ion-title>
      </ion-toolbar>
    </ion-footer>
  </ion-page>
</template>

<script>
import SvgIcon from '@jamescoyle/vue-icon';
import { 
  mdiFileChart,
  mdiFileChartCheckOutline,
  mdiHomeLightbulb, 
  mdiCogs, 

} from '@mdi/js';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonFooter,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
} from '@ionic/vue'

export default {
  name: 'DashboardPage',
  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonFooter,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
  },
  name: "my-cool-component",

	components: {
		SvgIcon
	},

	data() {
		return {
	  		icon1: mdiFileChart, 
            icon2: mdiFileChartCheckOutline,
            icon3: mdiCogs,
            icon4: mdiHomeLightbulb,

		}
    },
  methods: {
    openFunctie(naam) {
      // Voor nu: een alert. Later kun je router.push gebruiken.
      alert(`Functie geopend: ${naam}`)
    },
  },
}
</script>

<style scoped>
/* 2x2 grid voor de vier functies */
.grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-top: 1rem;
}
ion-page {
  display: flex;
  flex-direction: column;
  height: 100%;
}

ion-content {
  flex: 1 1 auto; /* zorgt dat content de ruimte tussen header en footer vult */
}

</style>
