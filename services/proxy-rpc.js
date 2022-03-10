
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