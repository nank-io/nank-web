<template>
  <Page>
    <PageTitle :title="$t('settings')"/>

    <div class="flex sm:hidden rounded-t-lg dark:text-gray-300 bg-gray-200 dark:bg-gray-700 px-4 py-2">{{ $t('selectProxyServer') }}</div>
    <div
      class="text-lg text-center p-4 bg-gray-100 dark:bg-gray-800 dark:text-gray-300 rounded-b-lg "
    >
      <label class="flex flex-col items-start">
        <select
          @change="handleChangeServer"
          class="px-4 py-2 rounded-lg text-black"
        >
          <option
            v-for="server in proxyServers"
            :key="server.id"
            :value="server.id"
            :selected="server.selected"
          >{{ server.name }}</option>
        </select>
      </label>
    </div>

    <div class="mt-8 mb-6">
      <Button
        @click="handleSaveSettings"
        :text="$t('saveSettings')"
      />
    </div>

    <div class="mt-8 mb-6">
      <Button
        @click="handleClearAllData"
        :text="$t('clearAllData')"
      />
    </div>
  </Page>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'SettingsPage',
  data() {
    return {
      selectedProxyServer: null
    }
  },
  computed: {
    ...mapGetters({
      servers: 'servers',
      currentProxyServer: 'currentProxyServer'
    }),
    proxyServers() {
      return this.servers.map(server => {
        server.selected = this.selectedProxyServer && this.selectedProxyServer.id === server.id
        return server
      })
    }
  },
  mounted() {
    this.selectedProxyServer = this.currentProxyServer
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
      this.selectedProxyServer = this.servers.find(
        server => server.id == event.target.value
      )

      this.$store.dispatch('setCurrentProxyServer', this.selectedProxyServer)
    },
    handleSaveSettings() {
      this.$store.dispatch('setCurrentProxyServer', this.selectedProxyServer)
    },
    isProxyServerSelected(server) {
      if (this.selectedProxyServer) {
        if (this.selectedProxyServer.if === server.id) {
          return true
        }
      }

      return false
    }
  }
}
</script>
