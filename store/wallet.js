import * as CryptoJS from 'crypto-js'
import { block, tools } from 'nanocurrency-web'
import {
  getAccountInfo,
  getAccountsBalances,
  getAccountsPending,
  getAccountsFrontiers,
  getBlocksInfo,
  doWorkGenerate,
  doReceive,
  doSend,
} from '~/services/proxy-rpc'

const defaultCurrentWallet = {
  accounts: [],
}

export const state = () => {
  const wallet = JSON.parse(localStorage.getItem('wallet'))

  return {
    currentWallet: wallet || defaultCurrentWallet,
    currentWalletPendings: []
  }
}

export const mutations = {
  setCurrentWallet(state, currentWallet) {
    state.currentWallet = currentWallet

    if (!currentWallet.memory) {
      localStorage.setItem('wallet', JSON.stringify(currentWallet))
    }
  },
  setCurrentPendings(state, currentWalletPendings) {
    state.currentWalletPendings = currentWalletPendings
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
  loadCurrentWalletAccountsBalance({ commit, getters, rootGetters }) {
    getAccountsBalances(
      rootGetters.currentServer.api,
      getters.currentWalletAccounts.map(acc => acc.address).filter(Boolean)
    ).then(json => {
      let total = 0
      const accountsUpdated = getters.currentWalletAccounts.map(acc => {
        acc.balance = Number(tools.convert(json.balances[acc.address].balance, 'RAW', 'NANO'))
        total = total + acc.balance
        return {...acc}
      })
      commit('setCurrentWallet', {
        ...getters.currentWallet,
        balance: total,
        accounts: accountsUpdated
      })
    }).catch(error => {
      console.log(error)
    })
  },
  loadCurrentWalletAccountsPending({ commit, dispatch, getters, rootGetters }) {
    getAccountsPending(
      rootGetters.currentServer.api,
      getters.currentWalletAccounts.map(acc => acc.address).filter(Boolean)
    ).then(pending => {
      const pendingBlocks = []

      for (let account in pending.blocks) {
        if (!pending.blocks.hasOwnProperty(account)) continue;

        for (let block in pending.blocks[account]) {
          if (!pending.blocks[account].hasOwnProperty(block)) continue;

          const pendingTx = {
            block: block,
            amount: Number(tools.convert(pending.blocks[account][block].amount, 'RAW', 'NANO')),
            source: pending.blocks[account][block].source,
            account: account,
          };

          pendingBlocks.push(pendingTx);
        }
      }

      commit('setCurrentPendings', pendingBlocks)

      if (pendingBlocks.length) {
        dispatch('loadAccountsFrontiers', { accounts: pendingBlocks.map(acc => acc.source) })
      }
    }).catch(error => {
      console.log(error)
    })
  },
  loadAccountsFrontiers({ commit, getters, rootGetters }, { accounts }) {
    getAccountsFrontiers(
      rootGetters.currentServer.api,
      accounts
    ).then(json => {
      const workPool = []

      if (json && json.frontiers) {
        for (let account in json.frontiers) {
          if (!json.frontiers.hasOwnProperty(account)) continue;
          workPool.push(json.frontiers[account]);
        }
      }
    }).catch(error => {
      console.log(error)
    })
  },
  send({ dispatch, rootGetters, getters }, payload = {}) {
    let fromAccountInfo, toAccountInfo

    if (getters.isLocked) {
      return alert('Wallet locked')
    }

    getAccountInfo(
      rootGetters.currentServer.api,
      payload.fromAccount,
    ).then(json => {
      fromAccountInfo = json

      getAccountInfo(
        rootGetters.currentServer.api,
        payload.toAccount,
      ).then(json => {
        toAccountInfo = json
        const secretKey = getters.currentWalletAccounts.find(acc => acc.address === payload.fromAccount).privateKey
        
        doWorkGenerate(
          rootGetters.currentServer.api,
          fromAccountInfo.frontier
        ).then(json => {
          const { work } = json

          const sendBlock = block.send({
            walletBalanceRaw: tools.convert(payload.amount, 'NANO', 'RAW'),
            amountRaw: tools.convert(payload.amount, 'NANO', 'RAW'),
            fromAddress: payload.fromAccount,
            toAddress: payload.toAccount,
            representativeAddress: fromAccountInfo.representative,
            frontier: fromAccountInfo.frontier,
            work
          }, secretKey)

          doSend(
            rootGetters.currentServer.api,
            sendBlock
          ).then(() => {
            dispatch('loadCurrentWalletAccountsBalance')
            dispatch('loadCurrentWalletAccountsPending')
          }).catch(error => {
            console.log(error)
          })
        })  
      })
    })
  },
  generateReceive({ dispatch, rootGetters, getters }, { account, block: sourceBlock }) {
    if (getters.isLocked) {
      return alert('Wallet locked')
    }

    const secretKey = getters.currentWalletAccounts.find(acc => acc.address === account).privateKey
    
    getAccountInfo(
      rootGetters.currentServer.api,
      account,
    ).then(accountInfo => {
      getBlocksInfo(
        rootGetters.currentServer.api,
        [sourceBlock]
      ).then(json => {
        const blockInfo = json.blocks[sourceBlock]
        
        doWorkGenerate(
          rootGetters.currentServer.api,
          accountInfo.frontier
        ).then(({ work }) => {
          const receiveBlock = block.receive({
            walletBalanceRaw: accountInfo.balance,
            toAddress: account,
            transactionHash: sourceBlock,
            frontier: accountInfo.frontier,
            representativeAddress: accountInfo.representative,
            amountRaw: blockInfo.amount,
            work
          }, secretKey)

          doReceive(
            rootGetters.currentServer.api,
            receiveBlock
          ).then(() => {
            dispatch('loadCurrentWalletAccountsBalance')
            dispatch('loadCurrentWalletAccountsPending')
          })
        })
      })
    })
  }
}

export const getters = {
  currentWallet(state) {
    return JSON.parse(JSON.stringify(state.currentWallet))
  },
  currentWalletAccounts(state) {
    return JSON.parse(JSON.stringify(state.currentWallet.accounts))
  },
  currentWalletPendings(state) {
    return JSON.parse(JSON.stringify(state.currentWalletPendings))
  },
  isConfigured(state) {
    return !!state.currentWallet.seed
  },
  isLocked(state) {
    return !!state.currentWallet.locked
  }
}