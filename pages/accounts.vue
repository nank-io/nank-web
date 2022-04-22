<template>
  <Page>
    <div class="p-5">
      <div class="flex justify-between">
        <div class="text-3xl dark:text-white">
          {{$t('accounts')}}
        </div>
      </div>

      <div class="mt-8 mb-4">
        <Button :text="$t('addNewAccount')"/>
      </div>

      <div class="flex sm:hidden rounded-t-lg dark:text-white bg-gray-200 dark:bg-gray-700 px-4 py-2">{{ $t('account') }}</div>
      <div class="hidden sm:flex rounded-t-lg dark:text-white bg-gray-200 dark:bg-gray-700 px-4 py-2 border-b border-gray-500">
        <div class="w-12  px-2">{{ $t('index') }}</div>
        <div class="w-1/2 px-2">{{ $t('account') }}</div>
        <div class="px-2">{{ $t('balance') }}</div>
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
  </Page>
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
