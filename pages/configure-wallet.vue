<template>
  <Page>
    <div class="p-5">
      <div class="text-3xl dark:text-white">
        {{ $t('configureWallet') }}
      </div>

      <div class="border-b w-full my-4"></div>

      <div class="sm:flex items-stretch sm:space-y-0 sm:space-x-10 space-y-4 p-4 sm:p-10 rounded-lg bg-gray-200 dark:bg-gray-700 dark:text-white">
        <div class="p-4 border-2 border-blue-500 rounded-lg hover:bg-blue-500 hover:text-white">
          <div class="flex flex-col ">
            <div class="w-20 mx-auto mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="w-20 h-20" fill="currentColor">
                <!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
                <path d="M448 32C465.7 32 480 46.33 480 64C480 81.67 465.7 96 448 96H80C71.16 96 64 103.2 64 112C64 120.8 71.16 128 80 128H448C483.3 128 512 156.7 512 192V416C512 451.3 483.3 480 448 480H64C28.65 480 0 451.3 0 416V96C0 60.65 28.65 32 64 32H448zM416 336C433.7 336 448 321.7 448 304C448 286.3 433.7 272 416 272C398.3 272 384 286.3 384 304C384 321.7 398.3 336 416 336z"/>
              </svg>
            </div>
            <div class="text-2xl text-left font-medium">
              {{ $t('newWallet') }}
            </div>
            <div class="text-lg text-left font-thin">
              {{ $t('generateSeedAndMnemonic') }}
            </div>
          </div>
        </div>

        <div class="p-4 border-2 border-blue-500 rounded-lg hover:bg-blue-500 hover:text-white parent">
          <div class="flex flex-col ">
            <div class="w-1/2 mx-auto mb-4">
              <PassPhraseList />
            </div>
            <div class="text-2xl text-left font-medium">
              {{ $t('importMnemonic') }}
            </div>
            <div class="text-lg text-left font-thin">
              {{ $t('mnemonicsAvailable') }}
            </div>
          </div>
        </div>
      </div>

      <div
        v-if="activePanel === 3"
      >
        <div class="px-10 py-4 border-b bg-white">
          <div class="text-3xl">
            Wallet created!
          </div>
        </div>
        <div class="p-10 bg-white">
          <div>
            Your new Nano wallet has been created! Below is the seed and mnemonic phrase for your wallet, you can use whichever you prefer.
          </div>
          <p class="bg-red-100 text-red-500 p-4 mt-5">
            Make sure to write down your mnemonic phrase/seed or save it somewhere safe, and <span class="font-medium">never share it with anyone!</span>
            It is the master key to all of your accounts, and the only way to recover your funds in an emergency.
          </p>
          <div class="flex">
            <div class="w-1/3">
              Nano Seed
            </div>
            <div class="w-2/3">
              <div>{{ seed }}</div>
              <div class="text-blue-400 hover:underline">Copy seed to clipboard</div>
            </div>
          </div>
          <hr />
          <div class="flex">
            <div class="w-1/3">
              Mnemonic Phrase
              <div class="text-gray-300">
                (Uses BIP39 Standard)
              </div>
            </div>
            <div class="w-2/3">
              <div
                v-for="(lines, index) in newWalletMnemonicLines"
                :key="index"
                class="flex"
              >
                <div
                  v-for="line in lines"
                  :key="line"
                  class="mx-2"
                >{{ line }}</div>
              </div>
              <div class="text-blue-400 hover:underline">Copy seed to clipboard</div>
            </div>
          </div>
        </div>
        <div class="px-10 py-4 border-t bg-white flex justify-start">
          <div
            @click="confirmNewSeed"
            class="inline-block p-4 bg-red-500 text-white text-center"
          >
            I've saved my seed/mnemonic
          </div>
        </div>
      </div>

      <div
        v-if="activePanel === 4"
      >
        <div class="px-10 py-4 border-b bg-white">
          <div class="text-3xl">
            Set wallet password
          </div>
        </div>
        <div class="p-10 bg-white">
          <div>
            The last step is to set a new password for your wallet. Your password is used to encrypt the sensitive parts of your wallet when it is locked, which disables sending, receiving, creating accounts, and other operations.
          </div>
          <div>
            Set your wallet password below:
          </div>
          <div
            class="flex justify-between"
          >
            <input v-model="walletPasswordConfirmModel" type="text" class="w-1/2 p-2 border" placeholder="New wallet password">
            <input v-model="walletPasswordModel" type="text" class="w-1/2 p-2 border" placeholder="Confirm wallet password">
          </div>
        </div>
        <div class="px-10 py-4 border-t bg-white flex justify-start">
          <div
            @click="saveWalletPassword"
            class="inline-block p-4 bg-blue-500 text-white text-center"
          >
            Set wallet password
          </div>
        </div>
      </div>

      <div
        v-if="activePanel === 5"
      >
        <div class="px-10 py-4 border-b bg-white">
          <div class="text-3xl">
            Wallet Configured!
          </div>
        </div>
        <div class="p-10 bg-white">
          <div>
            Your wallet has been configured and you are ready to send and receive Nano!
          </div>
        </div>
        <div class="px-10 py-4 border-t bg-white flex justify-start">
          <nuxt-link
            to="/accounts"
            class="inline-block p-4 bg-blue-500 text-white text-center"
          >
            View accounts
          </nuxt-link>
        </div>
      </div>

      <!-- Tab panel 2 - import -->
      <div
        v-if="activePanel === 6"
      >
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
        v-if="[4, 5].includes(activePanel)"
        class="bg-blue-100 text-blue-500 p-4 mt-5"
      >
        <span class="font-medium">ProTip:</span>If you lose your password, you can always restore your wallet using your seed.
      </div>
    </div>
  </Page>
</template>

<script>
import * as nanocurrency from 'nanocurrency-web'
import * as bip from 'bip39'

import { mapGetters } from 'vuex'

export default {
  name: 'ConfigureWalletPage',
  data() {
    return {
      activeTab: 1,
      activePanel: 2,
      imporType: '',
      seed: '',
      mnemonic: '',
      newWalletMnemonicLines: [],
      walletPasswordConfirmModel: '',
      walletPasswordModel: '',
    }
  },
  mounted() {
    if (this.$route.query.import === '1') {
      this.activeTab = 2
      this.activePanel = 6
    } else {
      this.activeTab = 1
    }
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
