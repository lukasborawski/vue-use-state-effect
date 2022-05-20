<template>
  <div class="m-4 font-black">
    <div class="text-lg color-black mb-4">{{ test }}</div>
    <button @click="updateState" class="p-3 bg-black mr-4 rounded text-white">update state</button>
    <button @click="goToTest" class="p-3 bg-black mr-4 rounded text-white">go to test page</button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useSharedState } from './../composables/useSharedState'
import { useRouter } from 'vue-router'

const {
  sharedState: { state, updateState },
} = useSharedState()
const router = useRouter()

const test = computed(() => state.value.test)

const goToTest = () => {
  return router.push('/test')
}
</script>
