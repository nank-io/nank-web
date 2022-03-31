<template>
  <div class="bg-gray-200 overflow-hidden w-full h-screen">
    <div class="p-5">
      <div class="flex justify-between">
        <div class="text-3xl">
          Accounts
        </div>
        <div
          class="inline-block p-4 bg-blue-500 text-white text-center"
          @click="handleClearAllData"
        >
          Clear all data
        </div>
      </div>
      <div class="flex py-2 bg-white border-b">
        <div class="w-12  px-2">Index</div>
        <div class="w-1/2 px-2">Account</div>
        <div class="w-1/2 px-2">Balance</div>
      </div>
      <div
        v-for="account in currentWalletAccounts"
        :key="account.address"
      >
        <Account :account="account" />
      </div>
      <div
        v-if="!currentWalletAccounts.length"
        class="text-center p-5 bg-gray-100"
      >
        You don't have any accounts yet, <nuxt-link class="text-blue-500 underline" to="/configure-wallet">click here to create one</nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'AccountsPage',
  mounted() {
    this.$store.dispatch('wallet/loadCurrentWalletAccountsBalance')
  },
  computed: {
    ...mapGetters({
      currentWalletAccounts: 'wallet/currentWalletAccounts',
    })
  },
  methods: {
    handleClearAllData() {
      localStorage.clear()
      this.$store.dispatch('wallet/setCurrentWallet', {
        wallet: {
          accounts: [],
        }
      })
    }
  }
}
</script>