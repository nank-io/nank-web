const DEFAULT_SERVER = {
  id: 1,
  name: 'Nano Crawler',
  api: 'https://vault.nanocrawler.cc/api/node-api',
  node: '',
  ws: 'wss://ws.nanocrawler.cc',
}

export const state = () => ({
  servers: [DEFAULT_SERVER],
  currentServer: DEFAULT_SERVER
})

export const mutations = {
  setCurrentServer(state, server) {
    state.currentServer = server 
  }
}

export const actions = {
  setCurrentServer({ commit }, server) {
    commit('setCurrentServer', server)
  }
}

export const getters = {
  servers(state) {
    return [...state.servers]
  },
  currentServer(state) {
    return {...state.currentServer}
  }
}