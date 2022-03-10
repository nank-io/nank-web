<template>
  <div
    class="flex"
  >
    <div class="w-12">{{ account.accountIndex }}</div>
    <div class="w-1/2">{{ account.address }}</div>
    <div class="w-1/2">{{ account.balance }}</div>
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