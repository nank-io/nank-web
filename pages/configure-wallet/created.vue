<template>
  <div>
    <ConfigureWalletCard>
      <div slot="header" class="text-2xl">
        {{ $t('walletCreated') }}
      </div>
      <div>
        <p class="">
          {{ $t('walletCreatedText1') }}
        </p>
        <p class="mt-4">
          {{ $t('walletCreatedText2') }}
          <span><nuxt-link to="/settings" class="text-blue-500 underline"> {{ $t('walletCreatedLink1') }}</nuxt-link></span>
        </p>
      </div>
      <div slot="footer">
        <button
          @click="$router.push({ path: '/accounts' })"
          :class="`px-4 py-2 w-full sm:w-auto rounded-full  text-white uppercase transition-colors bg-blue-500`"
        >{{ $t('viewAccounts') }}</button>
      </div>
    </ConfigureWalletCard>

    <div class="mt-4">
      <ConfigureWalletCard>
        <div><span class="font-semibold">{{ $t('proTip') }}</span> {{ $t('walletCreatedTip') }}</div>
      </ConfigureWalletCard>
    </div>
  </div>
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
    }
  }
}
</script>
