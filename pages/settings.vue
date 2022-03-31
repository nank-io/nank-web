<template>
  <div class="bg-gray-200 overflow-hidden w-full h-screen">
    <div class="p-5">
      <div class="flex justify-between">
        <div class="text-3xl">
          Configure Nank
        </div>
      </div>
      
      <div class="my-4">
        <div class="px-10 py-4 border-b bg-white">
          <div class="text-3xl">
            Server Settings
          </div>
        </div>
        <div class="p-10 bg-white">
          <div
            class="flex justify-between"
          >
            <label class="flex">
              <div>Server Configuration</div>
              <select
                @change="handleChangeServer"
              >
                <option 
                  v-for="server in servers"
                  :key="server.id"
                  :value="server.id"
                >{{ server.name }}</option>
              </select>
            </label>
          </div>
        </div>
        <div>
          <div
            class="inline-block p-4 bg-blue-500 text-white text-center"
            @click="handleClearAllData"
          >
            Clear all data
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'SettingsPage',
  computed: {
    ...mapGetters({
      servers: 'servers'
    })
  },
  methods: {
    handleClearAllData() {
      localStorage.clear()
      this.$store.dispatch('wallet/setCurrentWallet', {
        wallet: {
          accounts: [],
        }
      })
    },
    handleChangeServer(event) {
      const server = this.servers.find(
        server => server.id == event.target.value
      )

      this.$store.dispatch('setCurrentServer', server)
    }
  }
}
</script>