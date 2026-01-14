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
      <!-- MENU / TEGELS -->
      <div class="grid">
        <ion-card button @click="openFunctie('rapporten')">
          <ion-card-header>
            <ion-card-title>
              <svg-icon class="card-icon" type="mdi" :path="icon1" size="75" />
            </ion-card-title>
          </ion-card-header>
          <ion-card-content>
            Bekijk toegewezen rapportages.
          </ion-card-content>
        </ion-card>

        <ion-card button @click="openFunctie('inspecties')">
          <ion-card-header>
            <ion-card-title>
              <svg-icon class="card-icon" type="mdi" :path="icon2" size="75" />
            </ion-card-title>
          </ion-card-header>
          <ion-card-content>
            Bekijk uitgevoerde inspecties.
          </ion-card-content>
        </ion-card>

        <ion-card button @click="openFunctie('instellingen')">
          <ion-card-header>
            <ion-card-title>
              <svg-icon class="card-icon" type="mdi" :path="icon3" size="75" />
            </ion-card-title>
          </ion-card-header>
          <ion-card-content>
            Instellingen.
          </ion-card-content>
        </ion-card>

        <ion-card button @click="openFunctie('ondersteuning')">
          <ion-card-header>
            <ion-card-title>
              <svg-icon class="card-icon" type="mdi" :path="icon4" size="75" />
            </ion-card-title>
          </ion-card-header>
          <ion-card-content>
            Kennisbank & documentatie.
          </ion-card-content>
        </ion-card>
      </div>

      <!-- INSPECTIES LIJST -->
      <ion-list v-if="inspections.length">
        <ion-list-header>
          <ion-label>Recent Inspections</ion-label>
        </ion-list-header>

        <ion-item
          button
          v-for="inspection in inspections"
          :key="inspection.id"
          @click="selectInspection(inspection)"
        >
          <ion-label>
            <h2>{{ inspection.title }}</h2>
            <p>
              {{ inspection.location }} •
              {{ formatDate(inspection.inspectionDate) }}
            </p>
          </ion-label>

          <ion-badge color="success">
            {{ inspection.score }}%
          </ion-badge>
        </ion-item>
      </ion-list>

      <!-- INSPECTIE DETAILS (ONDER DE LIJST) -->
      <ion-card v-if="selectedInspection" class="inspection-details">
        <ion-card-header>
          <ion-card-title>
            {{ selectedInspection.title }}
          </ion-card-title>
        </ion-card-header>

        <ion-card-content>
          <p><strong>Location:</strong> {{ selectedInspection.location }}</p>
          <p><strong>Inspector:</strong> {{ selectedInspection.inspector }}</p>
          <p><strong>Date:</strong> {{ formatDate(selectedInspection.inspectionDate) }}</p>
          <p><strong>Status:</strong> {{ selectedInspection.status }}</p>
          <p><strong>Score:</strong> {{ selectedInspection.score }}%</p>
        </ion-card-content>
      </ion-card>
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
import SvgIcon from '@jamescoyle/vue-icon'
import {
  mdiFileChart,
  mdiFileChartCheckOutline,
  mdiHomeLightbulb,
  mdiCogs
} from '@mdi/js'

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
  IonList,
  IonListHeader,
  IonItem,
  IonLabel,
  IonBadge
} from '@ionic/vue'

import { getInspections } from '@/services/inspectionService'

export default {
  name: 'DashboardPage',
  components: {
    SvgIcon,
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
    IonList,
    IonListHeader,
    IonItem,
    IonLabel,
    IonBadge
  },
  data() {
    return {
      icon1: mdiFileChart,
      icon2: mdiFileChartCheckOutline,
      icon3: mdiCogs,
      icon4: mdiHomeLightbulb,
      inspections: [],
      selectedInspection: null
    }
  },
  async mounted() {
    const result = await getInspections()

    // sorteer inspecties op datum (nieuwste eerst)
    this.inspections = result.sort(
      (a, b) => new Date(b.inspectionDate) - new Date(a.inspectionDate)
    )
  },
  methods: {
    openFunctie(naam) {
      alert(`Functie geopend: ${naam}`)
    },
    formatDate(date) {
      return new Date(date).toLocaleDateString('nl-NL')
    },
    selectInspection(inspection) {
      this.selectedInspection = inspection
    }
  }
}
</script>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-bottom: 2rem;
}

.card-icon {
  color: var(--ion-color-primary);
}

.inspection-details {
  margin-top: 1rem;
}

ion-page {
  display: flex;
  flex-direction: column;
  height: 100%;
}

ion-content {
  flex: 1 1 auto;
}
</style>
