<template>
  <div class="bg-gray-200 overflow-hidden w-full h-screen">
    <div class="p-5">
      <div class="text-3xl">
        Configure Wallet
      </div>
      <div class="text-xl my-5">
        Use the options below to import an existing wallet or create a new one.
      </div>

      <div
        class="w-full flex"
        v-if="[2, 6].includes(activePanel)"
      >
        <div
          class="w-1/2 text-center p-4 text-white bg-black"
          :class="{ 'bg-blue-500': activeTab === 1 }"
          @click="handleActiveTab(1)"
        >Create new Wallet</div>
        <div
          class="w-1/2 text-center p-4 text-white bg-black"
          :class="{ 'bg-blue-500': activeTab === 2 }"
          @click="handleActiveTab(2)"
        >Import existing wallet</div>
      </div>

      <div
        v-if="activePanel === 2"
      >
        <div class="p-10 bg-white">
          <div>
            When you create a new wallet, a new Nano seed will be generated which can be used to create brand new accounts on the Nano network. Your Nano seed is the master key to all of your accounts and any money inside of them!
          </div>
          <div class="bg-red-100 text-red-500 p-4 mt-5">
            Make sure you back up your seed, write it down, and keep it incredibly safe! There is NO way to recover it after creation, and all funds inside WILL be lost without it! You have been warned!
          </div>
        </div>
        <div class="px-10 py-4 border-t bg-white flex justify-end">
          <div
            @click="createNewWallet"
            class="inline-block p-4 bg-blue-500 text-white text-center"
          >
            Create Wallet
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
  </div>
</template>

<script>
import * as nanocurrency from 'nanocurrency-web'

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
      const wallet = nanocurrency.wallet.generate()
      
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
        wallet = nanocurrency.wallet.fromSeed(this.seed)
      } else if (this.imporType === 'mnemonic') {
        wallet = nanocurrency.wallet.fromMnemonic(this.mnemonic)
      }

      this.wallet = { ...wallet }
      this.$store.dispatch('wallet/setCurrentWallet', { wallet })
      
      this.activePanel = 4
    }
  }
}
</script>
