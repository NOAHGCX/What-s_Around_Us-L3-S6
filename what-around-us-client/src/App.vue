<template>
  <div class="content">
    <router-view v-slot="{ Component,route }">
      <transition  
        :duration="{ enter: 500, leave: 800 }"
        :enter-active-class=route.meta.enterClass
        :leave-active-class=route.meta.leaveClass
      >
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<style>
  
</style>