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
  const currentProxyServer = JSON.parse(
    localStorage.getItem('currentProxyServer') ||
    JSON.stringify(DEFAULT_SERVERS[0])
  )

  return {
    servers: DEFAULT_SERVERS,
    currentProxyServer: currentProxyServer,
    menuOpened: false
  }
}

export const mutations = {
  setCurrentProxyServer(state, server) {
    console.log('[mutations.server]', server)
    state.currentProxyServer = server

    localStorage.setItem('currentProxyServer', JSON.stringify(server))
  },
  setMenuOpened(state, isOpen) {
    state.menuOpened = isOpen
  }
}

export const actions = {
  setCurrentProxyServer({ commit }, server) {
    commit('setCurrentProxyServer', server)
  }
}

export const getters = {
  servers(state) {
    return [...state.servers]
  },
  currentProxyServer(state) {
    return {...state.currentProxyServer}
  },
  menuOpened(state) {
    return state.menuOpened
  }
}
