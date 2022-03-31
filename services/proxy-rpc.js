
export const getAccountsBalances = (url, accounts) => {
  return fetch(url, {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      "accounts": accounts,
      "action": "accounts_balances"
    })
  }).then(res => res.json())
}

export const getAccountInfo = (url, account) => {
  return fetch(url, {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      account,
      action: "account_info",
      pending: true,
      representative: true,
      weight: true,
    })
  }).then(res => res.json())
}

export const getBlocksInfo = (url, blocks) => {
  return fetch(url, {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      action: "blocks_info",
      hashes: blocks,
      pending: true,
      source: true,
    })
  }).then(res => res.json())
}

export const doWorkGenerate = (url, hash) => {
  return fetch(url, {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      action: 'work_generate',
      hash,
    })
  }).then(res => res.json())
}

export const doSend = (url, blockData) => {
  return fetch(url, {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      action: 'process',
      json_block: true,
      subtype: 'send',
      block: blockData
    })
  }).then(res => res.json())
}

export const doReceive = (url, blockData) => {
  return fetch(url, {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      action: 'process',
      json_block: true,
      subtype: 'receive',
      block: blockData
    })
  }).then(res => res.json())
}

export const getAccountsPending = (url, accounts) => {
  return fetch(url, {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      "accounts": accounts,
      "action": "accounts_pending",
      "source": true
    })
  }).then(res => res.json())
}

export const getAccountsFrontiers = (url, accounts) => {
  return fetch(url, {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      "accounts": accounts,
      "action": "accounts_frontiers"
    })
  }).then(res => res.json())
}
