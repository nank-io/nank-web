<template>
  <div class="bg-gray-200 overflow-hidden w-full h-screen">
    <div class="p-5">
      <div class="flex justify-between">
        <div class="text-3xl">
          Receive Nano
        </div>
      </div>
      <p>
        When someone sends you Nano, you are also in charge of performing a receive block to actually receive the funds.
        If you have the wallet open when you receive a transaction, this will be performed automatically.
        Otherwise, select the account you are expecting to receive from below to search for pending transactions.
      </p>
      <div class="flex py-2 bg-white border-b">
        <div class="w-1/4 px-2">Account</div>
        <div class="w-1/4 px-2">Sending</div>
        <div class="w-1/4 px-2">Amount</div>
        <div class="w-1/4 px-2">Options</div>
      </div>
      <div
        v-for="pending in currentWalletPendings"
        :key="pending.block"
      >
        <Pending :pending="pending" @onReceive="handleReceive" />
      </div>
      <div
        v-if="!currentWalletPendings.length"
        class="text-center p-5 bg-gray-100"
      >
        No pending transaction
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'ReceivePage',
  mounted() {
    this.$store.dispatch('wallet/loadCurrentWalletAccountsPending')
  },
  computed: {
    ...mapGetters({
      currentWalletPendings: 'wallet/currentWalletPendings',
      walletIsLocked: 'wallet/isLocked',
    })
  },
  methods: {
    handleReceive(pending) {
      this.$store.dispatch('wallet/generateReceive', pending)
    }
  }
}
</script>