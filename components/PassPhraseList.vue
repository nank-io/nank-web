<template>
  <div class="grid grid-rows-6 grid-flow-col gap-1">
    <div
      v-for="(word, index) in mnemonicArr"
      :key="word"
    >
      <div class="flex items-baseline border-b border-dashed border-gray-500 dark:border-white parent-hover:border-white">
        <div class="ml-1 leading-tight" style="font-size: 10px;">{{ index + 1 }}</div>
        <div class="ml-2 mr-2 leading-tight">{{ word }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PassPhraseList',
  props: ['mnemonic'],
  computed: {
    mnemonicArr() {
      return this.mnemonic?.split(' ') || []
    }
  }
}
</script>
