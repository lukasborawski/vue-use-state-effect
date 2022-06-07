<template>
  <div>
    <div class="m-4 p-4 font-black border-2">
      <h5 class="mb-4 font-bold text-gray-400">Static data state demo</h5>
      <div class="text-lg color-black mb-4">{{ testState }}</div>
      <button @click="updateState" class="p-3 bg-black mr-4 rounded text-white">update state</button>
      <button @click="goTo('keep')" class="p-3 bg-black mr-4 rounded text-white">go to keep state page</button>
    </div>
    <div class="m-4 p-4 pb-0 border-2">
      <h5 class="mb-4 font-bold text-gray-400">Fetched data state demo</h5>
      <characters />
      <button @click="getCharacters" class="p-3 bg-black mr-4 mb-4 rounded text-white">
        {{ loading ? 'loading' : 'first fetch Rick & Morty characters' }}
      </button>
      <button @click="goTo('destroy')" class="p-3 bg-black mr-4 mb-4 rounded text-white">then go to destroy state page</button>
      <button @click="goTo('keep')" class="p-3 bg-black mr-4 mb-4 rounded text-white">or go to keep state page</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useSharedState } from '~/composables/useSharedState'
import { useSharedFetch } from '~/composables/useSharedFetch'
import Characters from '~/components/Characters.vue'

const router = useRouter()
const {
  sharedState: { state, updateState },
} = useSharedState()
const {
  sharedFetch: { loading, getCharacters },
} = useSharedFetch()

const testState = computed(() => state.value.test)

const goTo = (name: 'destroy' | 'keep') => {
  return router.push(`/${name}`)
}
</script>
