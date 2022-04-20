<template>
  <div class="dark:text-white">
    theme: {{theme}}
    <button @click="switchTheme(theme === 'dark' ? 'light' : 'dark')">toggle</button>
  </div>
</template>

<script>
export default {
  name: 'ThemeChanger',
  data() {
    return {
      theme: localStorage.getItem('theme')
    }
  },
  methods: {
    switchTheme(theme) {
      this.theme = theme
      localStorage.theme = theme

      if (theme === 'dark') {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    }
  }
}
</script>
