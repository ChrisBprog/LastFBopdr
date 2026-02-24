<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>Open Inspecties</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">

      <h2 class="page-title">Nieuwe Rapportage</h2>

      <ion-accordion-group expand="inset">

        <!-- ================= 1. SCHADE ================= -->

        <ion-accordion value="schade">
          <ion-item slot="header">
            <ion-label>1. Schade opnemen</ion-label>
          </ion-item>

          <div slot="content">

            <ion-item>
              <ion-label position="stacked">Locatie</ion-label>
              <ion-input v-model="schade.locatie" />
            </ion-item>

            <ion-item>
              <ion-label position="stacked">Nieuwe schade</ion-label>
              <ion-radio-group v-model="schade.nieuw">
                <ion-item>
                  <ion-label>Ja</ion-label>
                  <ion-radio :value="true" />
                </ion-item>
                <ion-item>
                  <ion-label>Nee</ion-label>
                  <ion-radio :value="false" />
                </ion-item>
              </ion-radio-group>
            </ion-item>

            <ion-item>
              <ion-label position="stacked">Soort schade</ion-label>
              <ion-select v-model="schade.soort">
                <ion-select-option value="moedwillig">Moedwillig</ion-select-option>
                <ion-select-option value="slijtage">Slijtage</ion-select-option>
                <ion-select-option value="geweld">Geweld</ion-select-option>
                <ion-select-option value="normaal">Normaal gebruik</ion-select-option>
                <ion-select-option value="calamiteit">Calamiteit</ion-select-option>
                <ion-select-option value="anders">Anders</ion-select-option>
              </ion-select>
            </ion-item>

            <ion-item>
              <ion-label position="stacked">Datum</ion-label>
              <ion-datetime presentation="date" v-model="schade.datum" />
            </ion-item>

            <ion-item>
              <ion-label position="stacked">Acute actie vereist</ion-label>
              <ion-radio-group v-model="schade.acuut">
                <ion-item>
                  <ion-label>Ja</ion-label>
                  <ion-radio :value="true" />
                </ion-item>
                <ion-item>
                  <ion-label>Nee</ion-label>
                  <ion-radio :value="false" />
                </ion-item>
              </ion-radio-group>
            </ion-item>

            <ion-item>
              <ion-label position="stacked">Omschrijving</ion-label>
              <ion-textarea auto-grow v-model="schade.omschrijving" />
            </ion-item>

          </div>
        </ion-accordion>

        <!-- ================= 2. ONDERHOUD ================= -->

        <ion-accordion value="onderhoud">
          <ion-item slot="header">
            <ion-label>2. Achterstallig onderhoud</ion-label>
          </ion-item>

          <div slot="content">

            <ion-item>
              <ion-label position="stacked">Locatie</ion-label>
              <ion-input v-model="onderhoud.locatie" />
            </ion-item>

            <ion-item>
              <ion-label position="stacked">Soort onderhoud</ion-label>
              <ion-select v-model="onderhoud.soort">
                <ion-select-option value="schilderwerk">Schilderwerk</ion-select-option>
                <ion-select-option value="houtrot">Houtrot</ion-select-option>
                <ion-select-option value="elektra">Elektra</ion-select-option>
                <ion-select-option value="leidingwerk">Leidingwerk</ion-select-option>
                <ion-select-option value="beglazing">Beglazing</ion-select-option>
              </ion-select>
            </ion-item>

            <ion-item>
              <ion-label position="stacked">Acute actie vereist</ion-label>
              <ion-radio-group v-model="onderhoud.acuut">
                <ion-item>
                  <ion-label>Ja</ion-label>
                  <ion-radio :value="true" />
                </ion-item>
                <ion-item>
                  <ion-label>Nee</ion-label>
                  <ion-radio :value="false" />
                </ion-item>
              </ion-radio-group>
            </ion-item>

            <ion-item>
              <ion-label position="stacked">Kostenindicatie</ion-label>
              <ion-select v-model="onderhoud.kosten">
                <ion-select-option value="0-500">0-500</ion-select-option>
                <ion-select-option value="500-1500">500-1500</ion-select-option>
                <ion-select-option value="1500+">1500+</ion-select-option>
              </ion-select>
            </ion-item>

          </div>
        </ion-accordion>

      </ion-accordion-group>

      <ion-button expand="block" size="large" class="save-button" @click="saveInspection">
        Rapportage opslaan
      </ion-button>

      <!-- ================= OVERZICHT ================= -->

      <h2 class="page-title">Opgeslagen Inspecties</h2>

      <ion-card v-for="item in inspections" :key="item.id">
        <ion-card-header>
          <ion-card-title>
            Inspectie #{{ item.id }}
          </ion-card-title>
        </ion-card-header>
        <ion-card-content>
          Datum: {{ formatDate(item.datum) }} <br>
          Status: {{ item.status }}
        </ion-card-content>
      </ion-card>

    </ion-content>
  </ion-page>
</template>

<script setup>
import {
  IonPage, IonHeader, IonToolbar, IonTitle,
  IonContent, IonAccordionGroup, IonAccordion,
  IonItem, IonLabel, IonInput, IonSelect,
  IonSelectOption, IonRadioGroup, IonRadio,
  IonDatetime, IonTextarea, IonButton,
  IonCard, IonCardHeader, IonCardTitle, IonCardContent
} from '@ionic/vue'

import { ref, onMounted } from 'vue'

const API_BASE = "https://my-json-server.typicode.com/ChrisBprog/LastFBopdr/inspections'"

function emptySchade() {
  return {
    locatie: '',
    nieuw: false,
    soort: '',
    datum: '',
    acuut: false,
    omschrijving: ''
  }
}

function emptyOnderhoud() {
  return {
    locatie: '',
    soort: '',
    acuut: false,
    kosten: ''
  }
}

const schade = ref(emptySchade())
const onderhoud = ref(emptyOnderhoud())
const inspections = ref([])

function formatDate(date) {
  if (!date) return "-"
  return new Date(date).toLocaleDateString()
}

async function fetchInspections() {
  try {
    const response = await fetch(`${API_BASE}/inspections`)
    inspections.value = await response.json()
  } catch (error) {
    console.error("Ophalen mislukt:", error)
  }
}

async function saveInspection() {
  try {

    const newInspection = {
      inspecteur: "Demo gebruiker",
      adres: "Onbekend adres",
      datum: new Date().toISOString(),
      status: "open",
      opmerkingAlgemeen: ""
    }

    const inspectionRes = await fetch(`${API_BASE}/inspections`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newInspection)
    })

    const savedInspection = await inspectionRes.json()

    await fetch(`${API_BASE}/damages`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...schade.value,
        inspectionId: savedInspection.id
      })
    })

    await fetch(`${API_BASE}/maintenance`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...onderhoud.value,
        inspectionId: savedInspection.id
      })
    })

    schade.value = emptySchade()
    onderhoud.value = emptyOnderhoud()

    await fetchInspections()

    alert("Inspectie succesvol opgeslagen")

  } catch (error) {
    console.error(error)
    alert("Opslaan mislukt")
  }
}

onMounted(fetchInspections)
</script>

<style scoped>
.page-title {
  margin-top: 2rem;
  margin-bottom: 1rem;
  font-weight: 600;
}

.save-button {
  margin-top: 2rem;
  --background: var(--ion-color-secondary);
  font-weight: 600;
}
</style>