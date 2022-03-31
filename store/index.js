const DEFAULT_SERVERS = [{
  id: 1,
  name: 'Nano Crawler',
  api: 'https://vault.nanocrawler.cc/api/node-api',
  node: '',
  ws: 'wss://ws.nanocrawler.cc',
}, {
  id: 2,
  name: 'Nanos',
  api: 'https://proxy.nanos.cc/proxy',
  node: '',
  ws: 'wss://proxy.nanos.cc/proxy',
}, {
  id: 3,
  name: 'My Nano Ninja',
  api: 'https://mynano.ninja/api/node',
  node: '',
  ws: 'wss://mynano.ninja/api/node',
}]

export const state = () => {
  const currentServer = JSON.parse(
    localStorage.getItem('currentServer') ||
    JSON.stringify(DEFAULT_SERVERS[1])
  )

  return {
    servers: DEFAULT_SERVERS,
    currentServer: currentServer
  }
}

export const mutations = {
  setCurrentServer(state, server) {
    state.currentServer = server

    localStorage.setItem('currentServer', JSON.stringify(server))
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