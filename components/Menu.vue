<template>
  <div
    :class="`
      fixed w-full pr-10
      transform transition-transform
      overflow-hidden
      bg-black bg-opacity-20
      ${menuOpened ? 'translate-x-0' : '-translate-x-full'}
    `"
    @click="onClick"
  >
    <div
      class="bg-white w-full h-screen flex flex-col"
    >
      <div class="px-4 mt-3 mb-5">
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
      </div>

      <div v-if="!walletIsConfigured" class="px-4 py-2 bg-black text-yellow-500">
        <nuxt-link to="/configure-wallet">Configure Wallet</nuxt-link>
      </div>
      <div v-else-if="walletIsLocked" class="px-4 py-2 bg-black text-yellow-500">
        <div @click="$modal.show('unlock-wallet')">
          Unlock Wallet
        </div>
      </div>
      <div v-else class="px-4 py-2 bg-black text-yellow-500">
        <div @click="$store.dispatch('wallet/lockWallet', {
          wallet: currentWallet,
          password: currentWallet.password
        })">
          Lock Wallet
        </div>
      </div>

      <div class="px-4 py-2 bg-gray-600 text-white flex-1">
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

      <UnlockWallet />
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
