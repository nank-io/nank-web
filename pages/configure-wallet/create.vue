<template>
  <ConfigureWalletCard>
    <div slot="header" class="text-2xl">
      Set Wallet Password
    </div>
    <div>
      <p class="">
        Choose a wallet password that will be used to unlock this application.
      </p>
      <p class="mt-4">
        While the application is locked, the secret recovery phrase will be encrypted, which prevents sending/receiving funds and managing accounts.
      </p>
      <p class="mt-4">
        For the safety of your funds, use a secure password (the bar should be green).
      </p>

      <div class="mt-8">
        <input
          class="w-full rounded-lg p-2 px-3 dark:bg-gray-900 dark:text-gray-500 border border-gray-900 hover:border-blue-500 outline-none transition-colors"
          type="password"
          placeholder="New Wallet Password"
          v-model="password"
        >
        <div :class="`mx-3 transition-opacity ${password ? 'opacity-100' : 'opacity-0'}`">
          <password v-model="password" :strength-meter-only="true" strengthMeterClass="Password__strength-meter mb-0 mt-4"/>
        </div>
        <div :class="`mt-2 mx-3 transition-opacity ${password ? 'opacity-100' : 'opacity-0'}`">
          <p style="font-size: 10px" class="text-gray-300 leading-4">Short keyboard patterns are easy to guess</p>
          <p style="font-size: 10px" class="text-gray-300 leading-4">Add another word or two. Uncommon words are better.</p>
        </div>

        <input
          class="w-full mt-4 rounded-lg p-2 px-3 dark:bg-gray-900 dark:text-gray-500 border border-gray-900 hover:border-blue-500 outline-none transition-colors"
          type="password"
          placeholder="Confirm Wallet Password"
          v-model="passwordConfirmation"
        >
      </div>
    </div>
    <div slot="footer">
      <button
        :disabled="btnDisabled"
        :class="`px-4 py-2 w-full sm:w-auto rounded-full  text-white uppercase transition-colors ${btnDisabled ? 'bg-gray-800 text-gray-600' : 'bg-blue-500'}`"
      >next</button>
    </div>
  </ConfigureWalletCard>
</template>

<script>
import Password from 'vue-password-strength-meter'

export default {
  name: 'ConfigureWalletCreate',
  components: { Password },
  data() {
    return {
      password: null,
      passwordConfirmation: null,
    }
  },
  computed: {
    btnDisabled() {
      return  !this.password || this.password.length < 6 || this.password !== this.passwordConfirmation
    }
  }
}
</script>
