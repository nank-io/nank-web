<template>
  <div class="bg-gray-200 dark:bg-gray-900 overflow-hidden w-full h-screen">
    <NavBar />

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
          to="/configure-wallet"
          class="p-4 w-full max-w-xl rounded-full bg-blue-500 text-white uppercase"
        >{{ $t('configureWallet') }}</nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IndexPage'
}
</script>
