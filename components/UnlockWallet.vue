<template>
  <modal name="unlock-wallet">
    <div class="px-10 py-4 border-b bg-white">
      <div class="text-3xl">
        Unlock Wallet
      </div>
    </div>
    <div class="p-10 bg-white">
      <div
        class="flex justify-between"
      >
        <input v-model="walletPassword" type="text" class="w-1/2 p-2 border" placeholder="Enter wallet password">
      </div>
    </div>
    <div class="px-10 py-4 border-t bg-white">
      <div
        @click="handleCancel"
        class="inline-block mr-auto p-4 border text-center"
      >
        Cancel
      </div>
      <div
        @click="handleUnlock"
        class="inline-block mr-auto p-4 bg-blue-500 text-white text-center"
      >
        Unlock
      </div>
    </div>
  </modal>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      walletPassword: ''
    }
  },
  computed: {
    ...mapGetters({
      currentWallet: 'wallet/currentWallet'
    })
  },
  methods: {
    handleCancel() {
      this.$modal.hide('unlock-wallet')
    },
    handleUnlock() {
      this.$store.dispatch('wallet/unlockWallet', {
        wallet: this.currentWallet,
        password: this.walletPassword
      })
      this.handleCancel()
    }
  }
}
</script>