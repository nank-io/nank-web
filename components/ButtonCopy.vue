<template>
  <button class="px-4 py-2 flex items-center rounded-full border border-gray-400 dark:border-gray-500" @click="event => $emit('click', event)">
    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
      <path stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
    </svg>
    <div class="ml-4 text-lg text-blue-500">{{ text }}</div>
  </button>
</template>

<script>
export default {
  name: 'ButtonCopy',
  props: ['text']
}
</script>
