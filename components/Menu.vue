<template>
  <div style="width: 250px" class="flex flex-col h-screen">
    <div class="px-4 mt-3 mb-5">
      <div>
        Nank
      </div>

      <div class="mt-4">
        <div class="flex justify-between">
          <div>
            Balance
          </div>
          <div>
            $0.00
          </div>
        </div>
        <div>
          0.00000 NANO
        </div>
      </div>
    </div>

    <div class="px-4 py-2 bg-black text-yellow-500">
      Configure Wallet
    </div>

    <div class="px-4 py-2 bg-gray-600 text-white flex-1">
      <ul class="list-none">
        <li class="my-2">
          <nuxt-link to="/accounts">Accounts</nuxt-link>
        </li>
        <li class="my-2">Send</li>
        <li class="my-2">Address Book</li>
        <li class="my-2">Settings</li>
      </ul>
    </div>
  </div>
</template>