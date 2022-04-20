<template>
  <div class="fixed w-full top-0 shadow-lg bg-gray-100 sm:bg-gray-200 dark:bg-gray-800 sm:dark:bg-gray-900">
    <div class="p-4 h-16 flex justify-between items-center sm:container sm:mx-auto">
      <div class="flex items-center">
        <button @click="onClick">
          <svg xmlns="http://www.w3.org/2000/svg" class="dark:text-white h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <h1 class="dark:text-white ml-2 text-xl font-bold">{{ $t('app') }}</h1>
      </div>

      <ThemeChanger />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex"
export default {
  name: 'NavBar',
  computed: {
    ...mapGetters({
      menuOpened: 'menuOpened'
    })
  },
  methods: {
    ...mapMutations({
      setMenuOpened: 'setMenuOpened'
    }),
    onClick() {
      this.setMenuOpened(!this.menuOpened)
    }
  }
}
</script>
