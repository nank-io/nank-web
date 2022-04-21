<template>
  <div class="rounded-lg bg-gray-200 dark:bg-gray-700 dark:text-white">
    <div v-if="$slots.header" class="p-4 sm:px-10 sm:py-4 border-b border-white dark:border-black">
      <slot name="header"/>
    </div>
    <div class="p-4 sm:p-10">
      <slot/>
    </div>
    <div v-if="$slots.footer" class="p-4 sm:px-10 sm:py-4 border-t border-white dark:border-black">
      <slot name="footer"/>
    </div>
  </div>
</template>

<script>
export default {

}
</script>
