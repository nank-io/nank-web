<template>
  <Page>
    <div class="p-5">
      <div class="flex justify-between">
        <div class="text-3xl dark:text-white">
          {{$t('accounts')}}
        </div>
      </div>

      <div class="mt-8 mb-6">
        <Button :text="$t('addNewAccount')"/>
      </div>

      <div class="flex sm:hidden rounded-t-lg dark:text-gray-300 bg-gray-200 dark:bg-gray-700 px-4 py-2">{{ $t('account') }}</div>
      <div class="hidden sm:flex rounded-t-lg dark:text-gray-200 bg-gray-200 dark:bg-gray-700 px-4 py-2 border-b border-gray-500">
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
        class="text-lg text-center p-4 bg-gray-100 dark:bg-gray-800 dark:text-gray-300 rounded-b-lg "
      >
        {{ $t('accountsDontHaveText1') }}<button class="text-blue-500 underline" @click="handleCreateNewAccount">{{ $t('accountsDontHaveText2') }}</button>
      </div>

      <div
        v-if="!currentWalletAccounts.length"
        class="my-6 text-lg text-center p-4 bg-gray-100 dark:bg-gray-800 dark:text-gray-300 rounded-lg "
      >
        {{ $t('accountsMissingText1') }}<button class="text-blue-500 underline" to="/configure-wallet">{{ $t('accountsMissingText2') }}</button>{{ $t('accountsMissingText3') }}
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
      walletIsConfigured: 'wallet/isConfigured',
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
    },
    handleCreateNewAccount() {
      if (!this.walletIsConfigured) {
        this.$toast.error('Wallet is not configured', {
          duration: 1000,
          pauseOnHover: false,
          queue: true,
        })
      }
    }
  }
}
</script>
