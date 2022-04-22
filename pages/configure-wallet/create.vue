<template>
  <ConfigureWalletCard>
    <div slot="header" class="text-2xl">
      {{ $t('setWalletPassword') }}
    </div>
    <div>
      <p class="">
        {{ $t('setWalletPasswordText1') }}
      </p>
      <p class="mt-4">
        {{ $t('setWalletPasswordText2') }}
      </p>
      <p class="mt-4">
        {{ $t('setWalletPasswordText3') }}
      </p>

      <div class="mt-8">
        <div class="relative">
          <input
            class="w-full rounded-lg p-2 px-3 dark:bg-gray-900 dark:text-gray-500 border border-gray-900 hover:border-blue-500 outline-none transition-colors"
            :type="`${showPassword ? 'text' : 'password'}`"
            :placeholder="$t('newWalletPassword')"
            v-model="password"
          >
          <div class="absolute top-0 right-0 m-2" @click="showPassword = !showPassword">
            <svg v-if="!showPassword" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
            </svg>
          </div>
        </div>
        <div class="mx-3 transition-opacity">
          <password v-model="password" :strength-meter-only="true" strengthMeterClass="Password__strength-meter mb-0 mt-4"/>
        </div>
        <div class="mx-3 transition-opacity">
          <p style="font-size: 10px" class="text-gray-300 leading-4">{{ $t('newWalletPasswordText1') }}</p>
          <p style="font-size: 10px" class="text-gray-300 leading-4">{{ $t('newWalletPasswordText2') }}</p>
        </div>
      </div>
    </div>
    <div slot="footer">
      <button
        :disabled="btnDisabled"
        :class="`px-4 py-2 w-full sm:w-auto rounded-full  text-white uppercase transition-colors ${btnDisabled ? 'bg-gray-800 text-gray-600' : 'bg-blue-500'}`"
        @click="generateWallet"
      >{{ $t('next') }}</button>
    </div>
  </ConfigureWalletCard>
</template>

<script>
import * as nanocurrency from 'nanocurrency-web'
import Password from 'vue-password-strength-meter'

export default {
  name: 'ConfigureWalletCreate',
  components: { Password },
  data() {
    return {
      password: null,
      showPassword: false,
    }
  },
  computed: {
    btnDisabled() {
      return  !this.password || this.password.length < 6
    },
    generateWallet() {
      const wallet = nanocurrency.wallet.generateLegacy()

      localStorage.setItem('wallet', JSON.stringify(wallet))
      localStorage.setItem('password', this.password)

      this.$router.push({ path: '/configure-wallet/recovery' })
    }
  }
}
</script>
