<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-button @click="goHome" color="light">
            <ion-icon :icon="homeOutline" />
          </ion-button>
        </ion-buttons>

        <ion-title>Open Inspecties</ion-title>

        <ion-buttons slot="end">
          <ion-button @click="logout" color="light">Logout</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">

      <h2>{{ editMode ? 'Inspectie bewerken' : 'Nieuwe Inspectie' }}</h2>

      <!-- BASIS -->
      <ion-item>
        <ion-label position="stacked">Adres</ion-label>
        <ion-input v-model="inspection.adres" placeholder="Bijv. Hoofdstraat 10" />
      </ion-item>

      <ion-item>
        <ion-label position="stacked">Inspecteur</ion-label>
        <ion-input v-model="inspection.inspecteur" placeholder="Naam inspecteur" />
      </ion-item>

      <ion-item>
        <ion-label position="stacked">Datum</ion-label>
        <ion-datetime presentation="date" v-model="inspection.datum" />
      </ion-item>

      <ion-item>
        <ion-label position="stacked">Status</ion-label>
        <ion-select v-model="inspection.status">
          <ion-select-option value="open">Open</ion-select-option>
          <ion-select-option value="completed">Completed</ion-select-option>
        </ion-select>
      </ion-item>

      <ion-accordion-group>

        <!-- 1 SCHADE -->
        <ion-accordion value="schade">
          <ion-item slot="header">
            <ion-label>1. Schade opnemen</ion-label>
          </ion-item>
          <div slot="content">
            <ion-item>
              <ion-label position="stacked">Locatie</ion-label>
              <ion-input v-model="inspection.schade.locatie" />
            </ion-item>

            <ion-item>
              <ion-label>Nieuwe schade</ion-label>
              <ion-radio-group v-model="inspection.schade.nieuw">
                <ion-item><ion-label>Ja</ion-label><ion-radio :value="true" /></ion-item>
                <ion-item><ion-label>Nee</ion-label><ion-radio :value="false" /></ion-item>
              </ion-radio-group>
            </ion-item>

            <ion-item>
              <ion-label position="stacked">Soort schade</ion-label>
              <ion-select v-model="inspection.schade.soort">
                <ion-select-option value="moedwillig">Moedwillig</ion-select-option>
                <ion-select-option value="slijtage">Slijtage</ion-select-option>
                <ion-select-option value="geweld">Geweld</ion-select-option>
                <ion-select-option value="normaal gebruik">Normaal gebruik</ion-select-option>
                <ion-select-option value="calamiteit">Calamiteit</ion-select-option>
                <ion-select-option value="anders">Anders</ion-select-option>
              </ion-select>
            </ion-item>

            <ion-item>
              <ion-label position="stacked">Datum</ion-label>
              <ion-datetime presentation="date" v-model="inspection.schade.datum" />
            </ion-item>

            <ion-item>
              <ion-label>Acute actie vereist</ion-label>
              <ion-radio-group v-model="inspection.schade.acuut">
                <ion-item><ion-label>Ja</ion-label><ion-radio :value="true" /></ion-item>
                <ion-item><ion-label>Nee</ion-label><ion-radio :value="false" /></ion-item>
              </ion-radio-group>
            </ion-item>

            <ion-item>
              <ion-label position="stacked">Omschrijving</ion-label>
              <ion-textarea v-model="inspection.schade.omschrijving" />
            </ion-item>
          </div>
        </ion-accordion>

        <!-- 2 ONDERHOUD -->
        <ion-accordion value="onderhoud">
          <ion-item slot="header">
            <ion-label>2. Achterstallig onderhoud</ion-label>
          </ion-item>
          <div slot="content">
            <ion-item>
              <ion-label position="stacked">Locatie</ion-label>
              <ion-input v-model="inspection.onderhoud.locatie" />
            </ion-item>

            <ion-item>
              <ion-label position="stacked">Soort onderhoud</ion-label>
              <ion-select v-model="inspection.onderhoud.soort">
                <ion-select-option value="schilderwerk">Schilderwerk</ion-select-option>
                <ion-select-option value="houtrot">Houtrot</ion-select-option>
                <ion-select-option value="elektra">Elektra</ion-select-option>
                <ion-select-option value="leidingwerk">Leidingwerk</ion-select-option>
                <ion-select-option value="beglazing">Beglazing</ion-select-option>
              </ion-select>
            </ion-item>

            <ion-item>
              <ion-label>Acute actie vereist</ion-label>
              <ion-radio-group v-model="inspection.onderhoud.acuut">
                <ion-item><ion-label>Ja</ion-label><ion-radio :value="true" /></ion-item>
                <ion-item><ion-label>Nee</ion-label><ion-radio :value="false" /></ion-item>
              </ion-radio-group>
            </ion-item>

            <ion-item>
              <ion-label position="stacked">Kostenindicatie</ion-label>
              <ion-select v-model="inspection.onderhoud.kosten">
                <ion-select-option value="0-500">0-500</ion-select-option>
                <ion-select-option value="500-1500">500-1500</ion-select-option>
                <ion-select-option value="1500+">1500+</ion-select-option>
              </ion-select>
            </ion-item>

            <ion-item>
              <ion-label position="stacked">Opmerkingen</ion-label>
              <ion-textarea v-model="inspection.onderhoud.opmerkingen" />
            </ion-item>
          </div>
        </ion-accordion>

        <!-- 3 INSTALLATIES -->
        <ion-accordion value="installatie">
          <ion-item slot="header">
            <ion-label>3. Technische installaties</ion-label>
          </ion-item>
          <div slot="content">
            <ion-item>
              <ion-label position="stacked">Locatie</ion-label>
              <ion-input v-model="inspection.installatie.locatie" />
            </ion-item>

            <ion-item>
              <ion-label position="stacked">Soort installatie</ion-label>
              <ion-select v-model="inspection.installatie.soort">
                <ion-select-option value="koeling">Koeling</ion-select-option>
                <ion-select-option value="verwarming">Verwarming</ion-select-option>
                <ion-select-option value="luchtverversing">Luchtverversing</ion-select-option>
                <ion-select-option value="elektra">Elektra</ion-select-option>
                <ion-select-option value="beveiliging">Beveiliging</ion-select-option>
              </ion-select>
            </ion-item>

            <ion-item>
              <ion-label position="stacked">Gemelde storingen</ion-label>
              <ion-textarea v-model="inspection.installatie.storingen" />
            </ion-item>

            <ion-item>
              <ion-label position="stacked">Testprocedure (PDF link)</ion-label>
              <ion-input v-model="inspection.installatie.testPdf" />
            </ion-item>

            <ion-item>
              <ion-label>Goedgekeurd</ion-label>
              <ion-radio-group v-model="inspection.installatie.goedgekeurd">
                <ion-item><ion-label>Ja</ion-label><ion-radio :value="true" /></ion-item>
                <ion-item><ion-label>Nee</ion-label><ion-radio :value="false" /></ion-item>
              </ion-radio-group>
            </ion-item>

            <ion-item>
              <ion-label position="stacked">Opmerkingen</ion-label>
              <ion-textarea v-model="inspection.installatie.opmerkingen" />
            </ion-item>
          </div>
        </ion-accordion>

        <!-- 4 MODIFICATIES -->
        <ion-accordion value="modificatie">
          <ion-item slot="header">
            <ion-label>4. Modificaties inventariseren</ion-label>
          </ion-item>
          <div slot="content">
            <ion-item>
              <ion-label position="stacked">Bestaande situatie (PDF link)</ion-label>
              <ion-input v-model="inspection.modificatie.bestaandePdf" />
            </ion-item>

            <ion-item>
              <ion-label position="stacked">Locatie aangetroffen modificatie</ion-label>
              <ion-input v-model="inspection.modificatie.locatie" />
            </ion-item>

            <ion-item>
              <ion-label position="stacked">Uitgevoerd door</ion-label>
              <ion-select v-model="inspection.modificatie.uitgevoerdDoor">
                <ion-select-option value="huurder">Huurder</ion-select-option>
                <ion-select-option value="aannemer">Aannemer</ion-select-option>
                <ion-select-option value="onbekend">Onbekend</ion-select-option>
              </ion-select>
            </ion-item>

            <ion-item>
              <ion-label position="stacked">Beschrijving modificatie</ion-label>
              <ion-textarea v-model="inspection.modificatie.beschrijving" />
            </ion-item>

            <ion-item>
              <ion-label position="stacked">Te ondernemen actie</ion-label>
              <ion-select v-model="inspection.modificatie.actie">
                <ion-select-option value="accepteren">Accepteren</ion-select-option>
                <ion-select-option value="laten keuren">Laten keuren</ion-select-option>
                <ion-select-option value="laten verwijderen">Laten verwijderen</ion-select-option>
                <ion-select-option value="laten aanpassen en keuren">Laten aanpassen en keuren</ion-select-option>
              </ion-select>
            </ion-item>

            <ion-item>
              <ion-label position="stacked">Opmerkingen</ion-label>
              <ion-textarea v-model="inspection.modificatie.opmerkingen" />
            </ion-item>
          </div>
        </ion-accordion>

      </ion-accordion-group>

      <ion-button expand="block" @click="saveInspection">
        {{ editMode ? 'Wijzigingen opslaan' : 'Opslaan' }}
      </ion-button>

      <ion-button v-if="editMode" expand="block" fill="outline" @click="resetForm">
        Annuleren
      </ion-button>

      <h2 class="ion-margin-top">Open inspecties</h2>

      <ion-card v-for="item in openInspections" :key="item.id">
        <ion-card-header>
          <ion-card-title>{{ item.adres || '(Geen adres ingevuld)' }}</ion-card-title>
        </ion-card-header>

        <ion-card-content>
          Inspecteur: {{ item.inspecteur || '-' }} <br />
          Datum: {{ prettyDate(item.datum) }}

          <div style="display:flex; gap:8px; margin-top:12px; flex-wrap: wrap;">
            <ion-button size="small" @click="editInspection(item)">Bewerken</ion-button>
            <ion-button size="small" color="success" @click="markCompleted(item.id)">Mark completed</ion-button>
            <ion-button size="small" color="danger" @click="deleteInspection(item.id)">Verwijderen</ion-button>
          </div>
        </ion-card-content>
      </ion-card>

    </ion-content>
  </ion-page>
</template>

<script setup>
import {
  IonPage, IonHeader, IonToolbar, IonTitle,
  IonContent, IonItem, IonLabel, IonInput,
  IonDatetime, IonButton, IonCard,
  IonCardHeader, IonCardTitle, IonCardContent,
  IonButtons, IonIcon, IonSelect, IonSelectOption,
  IonAccordionGroup, IonAccordion, IonRadioGroup, IonRadio,
  IonTextarea
} from '@ionic/vue'

import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { homeOutline } from 'ionicons/icons'
import { useStore } from 'vuex'

const router = useRouter()
const store = useStore()

/* ================= STATE ================= */
const editMode = ref(false)
const editingId = ref(null)

const emptyInspection = () => ({
  id: null,
  adres: '',
  inspecteur: '',
  datum: '',
  status: 'open',
  schade: { locatie: '', nieuw: null, soort: '', datum: '', acuut: null, omschrijving: '' },
  onderhoud: { locatie: '', soort: '', acuut: null, kosten: '', opmerkingen: '' },
  installatie: { locatie: '', soort: '', storingen: '', testPdf: '', goedgekeurd: null, opmerkingen: '' },
  modificatie: { bestaandePdf: '', locatie: '', uitgevoerdDoor: '', beschrijving: '', actie: '', opmerkingen: '' }
})

const inspection = ref(emptyInspection())

function normalizeInspection(raw) {
  const base = emptyInspection()
  return {
    ...base,
    ...raw,
    schade: { ...base.schade, ...(raw?.schade || {}) },
    onderhoud: { ...base.onderhoud, ...(raw?.onderhoud || {}) },
    installatie: { ...base.installatie, ...(raw?.installatie || {}) },
    modificatie: { ...base.modificatie, ...(raw?.modificatie || {}) },
    status: raw?.status ?? base.status
  }
}

/* ================= LOAD FROM VUEX ================= */
onMounted(async () => {
  await store.dispatch('inspections/loadInspections')
})

const openInspections = computed(() => store.getters['inspections/openInspections'])

/* ================= ACTIONS ================= */
async function saveInspection() {
  const normalized = normalizeInspection(inspection.value)
  await store.dispatch('inspections/upsertInspection', normalized)
  resetForm()
}

function editInspection(item) {
  inspection.value = normalizeInspection(JSON.parse(JSON.stringify(item)))
  editingId.value = item.id
  editMode.value = true
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

async function deleteInspection(id) {
  await store.dispatch('inspections/removeInspection', id)
  if (editingId.value === id) resetForm()
}

function resetForm() {
  inspection.value = emptyInspection()
  editMode.value = false
  editingId.value = null
}

async function markCompleted(id) {
  await store.dispatch('inspections/markCompleted', id)
  if (editingId.value === id) resetForm()
}

/* ================= HELPERS ================= */
function prettyDate(v) {
  if (!v) return '-'
  try {
    const d = new Date(v)
    if (isNaN(d.getTime())) return String(v)
    return d.toLocaleDateString('nl-NL')
  } catch {
    return String(v)
  }
}

/* ================= ROUTING ================= */
function goHome() {
  router.push('/dashboard')
}

function logout() {
  localStorage.removeItem('user')
  router.push('/login')
}
</script>