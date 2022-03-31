<template>
  <div
    class="flex"
  >
    <div class="w-1/4 px-2 truncate">{{ pending.account }}</div>
    <div class="w-1/4 px-2 truncate">{{ pending.source }}</div>
    <div class="w-1/4 px-2 truncate">{{ pending.amount }}</div>
    <div class="w-1/4 px-2 truncate">
      <button @click="$emit('onReceive', pending)">Receive</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    pending: {
      type: Object,
      required: true
    }
  }
}
</script>