<template>
  <div class="bg-gray-200 overflow-hidden w-full h-screen">
    <div class="p-5">
      <div class="flex justify-between">
        <div class="text-3xl">
          Send Nano
        </div>
      </div>
      
      <div class="my-4">
        <div class="p-10 bg-white">
          <label class="flex">
            <div>From Account</div>
            <select
              @change="handleChangeAccount"
            >
              <option value="">Select an account</option>
              <option 
                v-for="account in currentWalletAccounts"
                :key="account.address"
                :value="account.address"
              >{{ account.address }}</option>
            </select>
          </label>

          <label class="flex">
            <div>To Account</div>
            <input
              type="text"
              placeholder="Account to send nano"
              v-model="toAccount"
              class="w-1/2 p-2 border"
            >
          </label>

          <label class="flex">
            <div>Amount</div>
            <input
              type="text"
              placeholder="Amount of nano to send"
              v-model="amount"
              class="w-1/2 p-2 border"
            >
            <button @click="handleSetMaxAmount" >Max</button>
          </label>
        </div>
        
        <div class="px-10 py-4 border-t bg-white">
          <div
            class="inline-block p-4 bg-blue-500 text-white text-center"
            @click="handleSendNano"
          >
            Send Nano
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'SendPage',
  data() {
    return {
      fromAccount: '',
      toAccount: '',
      amount: 0
    }
  },
  computed: {
    ...mapGetters({
      currentWalletAccounts: 'wallet/currentWalletAccounts'
    })
  },
  methods: {
    handleChangeAccount(event) {
      this.fromAccount = event.target.value
    },
    handleSetMaxAmount() {
      if (this.fromAccount) {
        this.amount = this.currentWalletAccounts.find(acc => acc.address === this.fromAccount).balance
      }
    },
    handleSendNano() {
      
      if (!this.fromAccount) {
        return alert('From account required')
      }

      if (!this.toAccount) {
        return alert('To account required')
      }

      if (!this.amount) {
        return alert('Amount required')
      }

      this.$store.dispatch('wallet/send', {
        toAccount: this.toAccount,
        fromAccount: this.fromAccount,
        amount: this.amount,
      })
    }
  }
}
</script>