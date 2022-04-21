<template>
  <ConfigureWalletCard>
    <div>
      <div class="px-10 py-4 border-b bg-white">
        <div>
          If you already have a Nano wallet, you can import it below. When you import a wallet, none of your existing wallets or accounts are affected, and your seed is not stored anywhere besides in your local client. Use the drop down below to select which type of import you want to use.
        </div>
      </div>
      <div class="p-10 bg-white">
        <div
          class="flex justify-between"
        >
          <label class="flex">
            <div class="mr-4">Select Import Type</div>
            <select v-model="imporType">
              <option selected value="seed">Nano Seed</option>
              <option value="mnemonic">Nano Mnemonic Phrase</option>
            </select>
          </label>
        </div>

        <div v-if="imporType === 'seed'">
          <div>Enter your 64 or 128 character seed from any Nano wallet to import it below.</div>
          <input type="text" placeholder="Your nano backup seed" v-model="seed">
        </div>

        <div v-else-if="imporType === 'mnemonic'">
          <div>Enter your wallet mnemonic phrase generated from any Nano wallet to import it below.</div>
          <textarea placeholder="Your nano backup mnemonic phrase" v-model="mnemonic">
          </textarea>
        </div>
      </div>
      <div class="px-10 py-4 border-t bg-white flex justify-end">
        <div
          class="inline-block p-4 bg-blue-500 text-white text-center"
          v-if="imporType === 'seed'"
          @click="handleImportWallet"
        >
          Import from seed
        </div>
        <div
          class="inline-block p-4 bg-blue-500 text-white text-center"
          v-else-if="imporType === 'mnemonic'"
          @click="handleImportWallet"
        >
          Import from mnemonic phrase
        </div>
      </div>
    </div>

    <div
      class="bg-blue-100 text-blue-500 p-4 mt-5"
    >
      <span class="font-medium">ProTip:</span>If you lose your password, you can always restore your wallet using your seed.
    </div>
  </ConfigureWalletCard>
</template>

<script>
import * as nanocurrency from 'nanocurrency-web'
import * as bip from 'bip39'

import { mapGetters } from 'vuex'

export default {
  name: 'ConfigureWalletCreate',
  data() {
    return {
      activeTab: 1,
      activePanel: 1,
      imporType: '',
      seed: '',
      mnemonic: '',
      newWalletMnemonicLines: [],
      walletPasswordConfirmModel: '',
      walletPasswordModel: '',
    }
  },
  mounted() {
  },
  computed: {
    ...mapGetters({
      walletIsConfigured: 'wallet/isConfigured'
    })
  },
  methods: {
    createNewWallet() {
      const wallet = nanocurrency.wallet.generateLegacy()

      const words = wallet.mnemonic.split(' ');

      const lines = [
        words.slice(0, 4),
        words.slice(4, 8),
        words.slice(8, 12),
        words.slice(12, 16),
        words.slice(16, 20),
        words.slice(20, 24),
      ];

      this.wallet = wallet
      this.seed = wallet.seed
      this.newWalletMnemonicLines = lines
      this.activePanel = 3
    },

    confirmNewSeed() {
      this.seed = ''
      this.newWalletMnemonicLines = []
      this.activePanel = 4
    },

    saveWalletPassword() {
      if (this.walletPasswordConfirmModel !== this.walletPasswordModel) {
        return alert(`Password confirmation does not match, try again!`);
      }

      if (this.walletPasswordModel.length < 1) {
        return alert(`Password cannot be empty!`);
      }

      this.$store.dispatch('wallet/lockWallet', {
        wallet: this.wallet,
        password: this.walletPasswordModel
      })

      this.$store.dispatch('wallet/loadCurrentWalletAccountsBalance')

      this.activePanel = 5
    },

    handleActiveTab(tab) {
      this.activeTab = tab

      if (this.activeTab === 1) {
        this.activePanel = 2
      } else if (this.activeTab === 2) {
        this.activePanel = 6
      }
    },

    handleImportWallet() {
      let wallet

      if (this.imporType === 'seed') {
        wallet = nanocurrency.wallet.fromLegacySeed(this.seed)
      } else if (this.imporType === 'mnemonic') {
        wallet = nanocurrency.wallet.fromLegacyMnemonic(this.mnemonic)
      }

      this.wallet = { ...wallet }
      this.$store.dispatch('wallet/setCurrentWallet', { wallet })
      this.$store.dispatch('wallet/loadCurrentWalletAccountsBalance')

      this.activePanel = 4
    }
  }
}
</script>

<style>
.parent:hover .parent-hover\:border-white {
  border-color: #fff;
}
</style>
