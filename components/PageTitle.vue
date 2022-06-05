<template>
  <div>
    <div class="text-3xl dark:text-white">
      {{ title }}
    </div>

    <div class="border-b w-full my-4"></div>
  </div>
</template>

<script>
export default {
  props: ['title']
}
</script>
