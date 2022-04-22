<template>
  <ConfigureWalletCard>
    <div slot="header" class="text-2xl">
      {{ $t('recoveryNewWallet') }}
    </div>
    <div>
      <p class="mb-8">
        {{ $t('recoveryNewWalletText1') }}
      </p>

      <Alert variant="danger">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto sm:mx-0 sm:mr-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M20.618 5.984A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016zM12 9v2m0 4h.01" />
        </svg>
        <p class="mt-2">
          {{ $t('recoveryNewWalletAlert1') }}
        </p>
        <p class="mt-4">
          {{ $t('recoveryNewWalletAlert2') }}
        </p>
      </Alert>

      <div class="mt-8">
        <div class="text-lg my-4">{{ $t('secretRecoverySeed') }}</div>
        <div class="text-lg my-4 break-words">{{ seed }}</div>
        <ButtonCopy @click="() => handleCopy(seed)" :text="$t('secretRecoverySeedCopy')" />

        <div class="text-lg my-4">{{ $t('secretRecoveryMnemonic') }}</div>
        <div class="w-full mb-4 border border-gray-400 dark:border-black">
          <div class="border-8 dark:border-gray-700 overflow-auto ">
            <PassPhraseList :mnemonic="mnemonic" />
          </div>
        </div>
        <ButtonCopy @click="() => handleCopy(mnemonic)" :text="$t('secretRecoveryMnemonicCopy')" />

        <div class="mt-4">
          <label>
            <div class="word-break"><input type="checkbox" v-model="check"> {{ $t('secretRecoveryCheck') }}</div>
          </label>
        </div>
      </div>
    </div>
    <div slot="footer">
      <button
        @click="handleCreateWallet"
        :disabled="btnDisabled"
        :class="`px-4 py-2 w-full sm:w-auto rounded-full  text-white uppercase transition-colors ${btnDisabled ? 'bg-gray-800 text-gray-600' : 'bg-blue-500'}`"
      >{{ $t('createWallet') }}</button>
    </div>
  </ConfigureWalletCard>
</template>

<script>
export default {
  name: 'ConfigureWalletRecovery',
  data() {
    return {
      check: null,
      seed: null,
      mnemonic: null,
      newWalletMnemonicLines: []
    }
  },
  mounted() {
    const hasWallet = localStorage.getItem('wallet')

    if (hasWallet) {
      const wallet = JSON.parse(hasWallet)

      this.seed = wallet.seed
      this.mnemonic = wallet.mnemonic
    }
  },
  computed: {
    btnDisabled() {
      return  !this.check
    }
  },
  methods: {
    handleCopy(text) {
      navigator.clipboard.writeText(text);
      this.$toast.success('Copiado com sucesso', {
        duration: 1000,
        pauseOnHover: false,
        queue: true,
      })
    },
    handleCreateWallet() {
      this.$router.push({ path: '/accounts' })
    }
  }
}
</script>
