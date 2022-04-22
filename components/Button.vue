<template>
  <button class="w-full px-4 py-2 flex items-center rounded-full border border-gray-400 dark:border-gray-500" @click="event => $emit('click', event)">
    <div class="w-full ml-4 text-center text-lg text-blue-500 uppercase">{{ text }}</div>
  </button>
</template>

<script>
export default {
  name: 'Button',
  props: ['text']
}
</script>
