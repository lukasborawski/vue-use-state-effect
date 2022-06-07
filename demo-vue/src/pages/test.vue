<template>
  <div class="m-4 font-black">
    <div class="text-lg color-black mb-4">{{ test }}</div>
    <button @click="goToHome" class="p-3 bg-black mr-4 rounded text-white">back to home page</button>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useSharedState } from './../composables/useSharedState'

const router = useRouter()
const {
  sharedState: { state },
} = useSharedState()

const test = ref<any>(state.value.test)

watch([() => state.value], ([newState]) => {
  test.value = newState.test
})
const goToHome = () => {
  return router.push('/')
}
</script>
