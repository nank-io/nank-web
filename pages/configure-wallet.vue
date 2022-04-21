<template>
  <Page>
    <div class="p-5">
      <div class="text-3xl dark:text-white">
        {{ $t('configureWallet') }}
      </div>

      <div class="border-b w-full my-4"></div>

      <nuxt-child/>
    </div>
  </Page>
</template>

<script>
export default {
  name: 'ConfigureWalletPage',
}
</script>

