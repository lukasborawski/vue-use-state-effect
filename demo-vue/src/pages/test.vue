<template>
  <div class="m-4 font-black">
    <div class="text-lg color-black mb-4">{{ test }}</div>
    <button @click="goToHome" class="p-3 bg-black mr-4 rounded text-white">back to home page</button>
  </div>
</template>

<script setup lang="ts">
import { useSharedState } from './../composables/useSharedState'
import { useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'

const router = useRouter()
const test = ref('')

onMounted(() => {
  const {
    sharedState: { state },
  } = useSharedState()
  test.value = state.value.test
})

const goToHome = () => {
  return router.push('/')
}
</script>
