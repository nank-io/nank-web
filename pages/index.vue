<template>
  <div class="bg-gray-200 overflow-hidden w-full h-screen">
    <div class="text-center">
      <div class="py-20">
        <div class="text-3xl">
          Welcome to Nank!
        </div>
        <div class="text-xl mt-5">
          The "no strings attached" open source wallet for Nano
        </div>
      </div>
      
      <div>
        To get started, choose an option below to configure your wallet
      </div>
      <div class="flex justify-center mt-5">
        <nuxt-link
          to="/configure-wallet"
          class="p-4 bg-blue-500 text-white mr-20"
        >Create a new wallet</nuxt-link>
        <nuxt-link
          to="/configure-wallet?import=1"
          class="p-4 bg-blue-500 text-white"
        >Create a new wallet</nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IndexPage'
}
</script>
