<template>
  <ConfigureWalletCard>
    <div slot="header">
      Set Wallet Password
    </div>
    <div>
      Choose a wallet password that will be used to unlock this application.
    </div>
    <div slot="footer">
      <button>next</button>
    </div>
  </ConfigureWalletCard>
</template>

<script>
export default {
  name: 'ConfigureWalletCreate',
}
</script>
