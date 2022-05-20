<template>
  <div>
    <div class="m-4 font-black">
      <div class="text-lg color-black mb-4">{{ test }}</div>
      <button @click="goToHome" class="p-3 bg-black mr-4 rounded text-white">back to home page</button>
    </div>
    <div class="m-4">
      <div v-if="fetchedCharacters.length > 0">
        <ul class="mt-4">
          <li v-for="{ id, name } of fetchedCharacters" :key="id">{{ name }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const test = ref('')
const fetchedCharacters = ref([])

onMounted(() => {
  const {
    sharedState: { state },
  } = useSharedState()
  test.value = state.value.test
  const {
    sharedFetch: { characters },
  } = useSharedFetch()
  fetchedCharacters.value = characters.value
})

const goToHome = () => {
  return router.push('/')
}
</script>
