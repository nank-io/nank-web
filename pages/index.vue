<template>
  <Page>
    <div class="text-center px-8">
      <div class="dark:text-white py-12">
        <h1 class="text-6xl font-bold">
          {{ $t("app") }}
        </h1>
        <p class="text-2xl mt-4">
          {{ $t("slogan") }}
        </p>
      </div>

      <div class="flex justify-center">
        <nuxt-link
          v-if="!walletIsConfigured"
          to="/configure-wallet"
          class="p-4 w-full sm:w-auto rounded-full bg-blue-500 text-white uppercase"
        >{{ $t('configureWallet') }}</nuxt-link>
        <nuxt-link
          v-else
          to="/accounts"
          class="p-4 w-full sm:w-auto rounded-full bg-blue-500 text-white uppercase"
        >{{ $t('viewAccounts') }}</nuxt-link>
      </div>
    </div>
  </Page>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  name: 'IndexPage',
  computed: {
    ...mapGetters({
      currentWallet: 'wallet/currentWallet',
      walletIsConfigured: 'wallet/isConfigured',
      walletIsLocked: 'wallet/isLocked',
      menuOpened: 'menuOpened',
    })
  },
}
</script>
