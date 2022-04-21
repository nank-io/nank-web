<template>
  <div class="flex flex-col w-full h-screen pt-16 bg-white dark:bg-gray-900 overflow-hidden">
    <NavBar />
    <div class="flex-1 overflow-auto">
      <slot/>
    </div>
  </div>
</template>
