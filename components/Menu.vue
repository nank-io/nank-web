<template>
  <div
    :class="`
      fixed w-full top-14 pr-10 z-40
      transform transition-transform
      overflow-hidden
      ${menuOpened ? 'translate-x-0' : '-translate-x-full'}
    `"
    @click="onClick"
  >
    <div
      class="flex flex-col py-4 px-5 w-full sm:max-w-sm h-screen bg-gray-100 dark:bg-gray-800 shadow-2xl"
    >
      <!-- <div class="px-4 mt-3 mb-5">
        <div>
          Nank
        </div>

        <div class="mt-4">
          <div class="flex justify-between">
            <div>
              Balance
            </div>
            <div>
              $0.00
            </div>
          </div>
          <div>
            {{ currentWallet.balance }}
          </div>
        </div>
      </div> -->

      <div class="pt-4">
        <div class="p-1 bg-gray-200 dark:bg-gray-700 rounded-lg">
          <div class="p-3 dark:text-white border border-dashed border-gray-600 rounded-lg">
            <div class="text-xl">{{ $t('totalBalance') }}</div>
            <div class="mt-4 flex items-baseline">
              <div class="w-12 text-2xl">XNO</div>
              <div class="ml-3 text-3xl font-bold">Ӿ0</div>
            </div>
            <div class="mb-6 flex items-center">
              <div class="w-12 text-right text-xs">~USD</div>
              <div class="ml-3 text-xl font-medium">$0</div>
            </div>
          </div>
        </div>

        <div v-if="!walletIsConfigured" class="pt-4 text-yellow-500">
          <nuxt-link to="/configure-wallet" class="flex">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            Configure Wallet
          </nuxt-link>
        </div>
        <div v-else-if="walletIsLocked" class="flex pt-4 text-yellow-500">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
          </svg>
          <div @click="$modal.show('unlock-wallet')">
            Unlock Wallet
          </div>
        </div>
        <div v-else class="flex pt-4 text-yellow-500">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          <div @click="$store.dispatch('wallet/lockWallet', {
            wallet: currentWallet,
            password: currentWallet.password
          })">
            Lock Wallet
          </div>
        </div>
      </div>

      <div class="pt-4 bg-gray-100 dark:bg-gray-800 dark:text-white flex-1">
        <ul class="list-none">
          <li class="my-2">
            <nuxt-link to="/accounts">Accounts</nuxt-link>
          </li>
          <li class="my-2">
            <nuxt-link to="/receive">Receive</nuxt-link>
          </li>
          <li class="my-2">
            <nuxt-link to="/send">Send</nuxt-link>
          </li>
          <!-- <li class="my-2">Address Book</li> -->
          <li class="my-2">
            <nuxt-link to="/settings">Settings</nuxt-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'Menu',
  computed: {
    ...mapGetters({
      currentWallet: 'wallet/currentWallet',
      walletIsConfigured: 'wallet/isConfigured',
      walletIsLocked: 'wallet/isLocked',
      menuOpened: 'menuOpened',
    })
  },
  methods: {
    ...mapMutations({
      setMenuOpened: 'setMenuOpened'
    }),
    onClick() {
      this.setMenuOpened(false)
    }
  }
}
</script>
