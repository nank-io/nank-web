<template>
  <div
  >
    <div class="block sm:hidden">
      <div class="bg-gray-100 dark:bg-gray-800 p-4 border-b dark:border-black">
        <div class="w-20 px-2 bg-gray-500 rounded-lg text-white">{{ $t('index') }} {{ account.accountIndex }}#</div>
        <div class="mt-2 text-blue-500 break-words">{{ account.address }}</div>
        <div class="mt-2 font-semibold text-gray-600 dark:text-white">{{ account.balance }} <span class="text-gray-500 dark:text-gray-300">XNO</span></div>
      </div>
    </div>

    <div
      class="hidden sm:flex bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 p-4"
    >
      <div class="">
        <div class="w-20 px-2 bg-gray-500 rounded-lg text-white">
          {{ $t('index') }} {{ account.accountIndex }}#
        </div>
      </div>
      <div class="w-1/2 px-2 text-blue-500 break-words">{{ account.address }}</div>
      <div class="px-2">{{ account.balance }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    account: {
      type: Object,
      required: true
    }
  }
}
</script>
