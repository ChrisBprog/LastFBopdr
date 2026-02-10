<template>
  <ion-page class="login-page">
    <ion-content class="ion-padding">

      <div class="login-container">
        <h1>RealEstateCare</h1>

        <!-- Login Scherm -->
        <div v-if="!twoFactorRequired">
          <ion-item>
            <ion-label position="floating">Email</ion-label>
            <ion-input
              v-model="email"
              type="email">
            </ion-input>
          </ion-item>

          <ion-item>
            <ion-label position="floating">Password</ion-label>
            <ion-input
              v-model="password"
              type="password">
            </ion-input>
          </ion-item>

          <ion-button expand="block" color="primary" @click="handleLogin">
            Login
          </ion-button>
          <p class="hint">Zie README.md</p>
        </div>

        <!-- 2FA -->
        <div v-else>
          <h2>Two-Factor Authentication</h2>
          <p>Voer de code in die naar je email is gestuurd (simulatie)</p>

          <ion-item class="form-item">
            <ion-label  position="floating">Code</ion-label>
            <ion-input
              type="text"
              v-model="code">
            </ion-input>
          </ion-item>

          <ion-button expand="block" color="success" @click="verifyCode">
            Verify
          </ion-button>
          <ion-button expand="block" color="medium" @click="cancel2FA">
            Cancel
          </ion-button>
          <p class="hint">Simulatiecode: zie README.md</p>
        </div>
      </div>

    </ion-content>
  </ion-page>
</template>

<script setup>
import {
  IonPage,
  IonContent,
  IonItem,
  IonLabel,
  IonInput,
  IonButton
} from '@ionic/vue'

import { ref, computed, watch } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

const store = useStore()
const router = useRouter()

const email = ref('')
const password = ref('')
const code = ref('')

const twoFactorRequired = computed(
  () => store.getters['auth/twoFactorRequired']
)

watch(
  () => store.getters['auth/isAuthenticated'],
  (isAuth) => {
    if (isAuth) {
      router.push('/dashboard')
    }
  }
)

function handleLogin() {
  store.dispatch('auth/login', {
    email: email.value,
    password: password.value
  }).catch(() => {
    alert('Onjuiste email of wachtwoord')
  })
}

function verifyCode() {
  store.dispatch('auth/verify2FA', code.value)
    .catch(() => {
      alert('Verkeerde 2FA code (gebruik 123456)')
    })
}

function cancel2FA() {
  store.dispatch('auth/logout')
  email.value = ''
  password.value = ''
  code.value = ''
}
</script>



<style scoped>
.login-page {
  --background: linear-gradient(
    to bottom,
    rgba(71, 94, 108, 0.12),
    rgba(20, 27, 31, 0.18)
  );
}

.login-container {
  max-width: 400px;
  margin: auto;
  margin-top: 20vh;
  background: #ffffff;
  padding: 2.2rem;
  border-radius: 14px;
  box-shadow: 0 8px 25px rgba(20, 27, 31, 0.15);
  text-align: center;
}

h1 {
  color: var(--ion-color-secondary);
  margin-bottom: 2rem;
  font-weight: 600;
}

ion-item {
  --background: rgba(71, 94, 108, 0.06);
  --border-radius: 10px;
  margin-bottom: 1.4rem;
}

ion-label {
  color: var(--ion-color-secondary);
}

ion-button {
  margin-top: 1.2rem;
}

.hint {
  font-size: 0.85rem;
  color: var(--ion-color-secondary);
  margin-top: 0.75rem;
}
</style>
