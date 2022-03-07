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
        v-if="activePanel === 2"
      >
        <div class="w-1/2 text-center p-4 text-white bg-blue-500">Create new Wallet</div>
        <div class="w-1/2 text-center p-4 text-white bg-black">Import existing wallet</div>
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
        <div class="px-10 py-4 border-t bg-white">
          <div
            @click="createNewWallet"
            class="inline-block ml-auto p-4 bg-blue-500 text-white text-center"
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
        <div class="px-10 py-4 border-t bg-white">
          <div
            @click="confirmNewSeed"
            class="inline-block mr-auto p-4 bg-red-500 text-white text-center"
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
            <input v-model="walletPasswordConfirmModel" type="text" class="w-1/2" placeholder="New wallet password">
            <input v-model="walletPasswordModel" type="text" class="w-1/2" placeholder="Confirm wallet password">
          </div>
        </div>
        <div class="px-10 py-4 border-t bg-white">
          <div
            @click="saveWalletPassword"
            class="inline-block mr-auto p-4 bg-blue-500 text-white text-center"
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
        <div class="px-10 py-4 border-t bg-white">
          <nuxt-link
            to="/accounts"
            class="inline-block mr-auto p-4 bg-blue-500 text-white text-center"
          >
            View accounts
          </nuxt-link>
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
import * as CryptoJS from 'crypto-js'

export default {
  name: 'ConfigureWalletPage',
  data() {
    return {
      activePanel: 2,
      seed: '',
      newWalletMnemonicLines: [],
      walletPasswordConfirmModel: '',
      walletPasswordModel: '',
    }
  },
  methods: {
    createNewWallet() {
      const wallet = nanocurrency.wallet.generate()

      console.log(wallet)
      
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

      const encryptedSeed = CryptoJS.AES.encrypt(this.seed, this.walletPasswordModel || '');

      this.wallet.seed = encryptedSeed.toString();

      localStorage.setItem('wallet', JSON.stringify(this.wallet));

      this.activePanel = 5
    }
  }
}
</script>
