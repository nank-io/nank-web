import * as CryptoJS from 'crypto-js'
import { getAccountsBalances } from '~/services/proxy-rpc'

const defaultCurrentWallet = {
  accounts: []
}

export const state = () => {
  const wallet = JSON.parse(localStorage.getItem('wallet'))

  return {
    currentWallet: wallet || defaultCurrentWallet
  }
}

export const mutations = {
  setCurrentWallet(state, currentWallet) {
    state.currentWallet = currentWallet

    if (!currentWallet.memory) {
      localStorage.setItem('wallet', JSON.stringify(currentWallet))
    }
  }
}

export const actions = {
  setCurrentWallet({ commit }, { wallet }) {
    commit('setCurrentWallet', wallet)
  },
  lockWallet({ commit }, { wallet, password }) {
    const encryptedSeed = CryptoJS.AES.encrypt(wallet.seed, password || '');

    wallet.seed = encryptedSeed.toString();
    wallet.locked = true
    wallet.password = undefined

    commit('setCurrentWallet', wallet)
  },
  unlockWallet({ commit }, { wallet, password }) {
    const decryptedBytes = CryptoJS.AES.decrypt(wallet.seed, password);
    const decryptedSeed = decryptedBytes.toString(CryptoJS.enc.Utf8);

    if (!decryptedSeed || ![64, 128].includes(decryptedSeed.length)) {
      return alert('invalid password')
    };

    wallet.seed = decryptedSeed;
    wallet.locked = false
    wallet.password = password
    wallet.memory = true

    commit('setCurrentWallet', wallet)
  },
  loadCurrentAccountsBalance({ commit, getters, rootGetters }) {
    getAccountsBalances(
      rootGetters.currentServer.api,
      getters.currentAccounts.map(acc => acc.address).filter(Boolean)
    ).then(json => {
      const accountsUpdated = getters.currentAccounts.map(acc => {
        acc.balance = json.balances[acc.address].balance
        return acc
      })
      commit('setCurrentWallet', {
        ...getters.currentWallet,
        accounts: accountsUpdated
      })
    }).catch(error => {
      console.log(error)
    })
  }
}

export const getters = {
  currentWallet(state) {
    return {
      ...state.currentWallet
    }
  },
  currentAccounts(state, getters) {
    return getters.currentWallet.accounts
  },
  isConfigured(state) {
    return !!state.currentWallet.seed
  },
  isLocked(state) {
    return !!state.currentWallet.locked
  }
}