<template>
  <div>
    <div class="m-4 p-4 font-black border-2">
      <h5 class="mb-4 font-bold text-gray-400">Static state demo</h5>
      <div class="text-lg color-black mb-4">{{ testState }}</div>
      <button @click="goToHome" class="p-3 bg-black mr-4 rounded text-white">back to home page</button>
    </div>
    <div class="m-4 p-4 border-2">
      <h5 class="mb-4 font-bold text-gray-400">Fetched data state demo</h5>
      <characters />
      <button @click="goToHome" class="p-3 bg-black mr-4 rounded text-white">back to home page</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useSharedState } from '~/composables/useSharedState'
import Characters from '~/components/Characters.vue'

const router = useRouter()
const {
  sharedState: { state },
} = useSharedState()

const testState = ref<any>(state.value.test)

/* Called just to show destroyed state effect */
onMounted(() => {
  const {
    sharedState: { state },
  } = useSharedState()
  testState.value = state.value.test
})
watch([() => state.value], ([newState]) => {
  testState.value = newState.test
})
const goToHome = () => {
  return router.push('/')
}
</script>
