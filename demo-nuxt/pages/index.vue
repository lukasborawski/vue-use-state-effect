<template>
  <div>
    <div class="m-4 font-black">
      <div class="text-lg color-black mb-4">{{ test }}</div>
      <button @click="updateState" class="p-3 bg-black mr-4 rounded text-white">update state</button>
      <button @click="goToTest" class="p-3 bg-black mr-4 rounded text-white">go to test page</button>
    </div>
    <div class="m-4">
      <button @click="getCharacters" class="p-3 bg-black mr-4 rounded text-white">
        {{ fetchLoading ? 'loading' : 'fetch Rick & Morty characters' }}
      </button>
      <div v-if="!fetchLoading && fetchedCharacters.length > 0">
        <ul class="mt-4">
          <li v-for="{ id, name } of fetchedCharacters" :key="id">{{ name }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const {
  sharedState: { state, updateState },
} = useSharedState()
const {
  sharedFetch: { loading, characters, getCharacters },
} = useSharedFetch()

const test = computed(() => state.value.test)

const fetchLoading = computed(() => loading.value)
const fetchedCharacters = computed(() => characters.value)

const goToTest = () => {
  return router.push('/test')
}
</script>
