<template>
  <div>
    <a
      href="#"
      v-for="locale in availableLocales"
      :key="locale.code"
      @click.prevent.stop="$i18n.setLocale(locale.code)"
    >{{ locale.name }}</a>
  </div>
</template>

<script>
export default {
  name: 'LocaleChanger',
  computed: {
    availableLocales () {
      return this.$i18n.locales
    }
  },
}
</script>
