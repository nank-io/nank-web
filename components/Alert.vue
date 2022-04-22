<template>
  <div :class="`p-4 rounded-lg ${variant === 'danger' ? 'bg-red-500 text-white text-lg' : ''}`">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'Alert',
  props: ['variant']
}
</script>
