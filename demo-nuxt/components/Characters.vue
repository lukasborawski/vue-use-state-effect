<template>
  <div>
    <div v-if="!loading && fetchedCharacters.length > 0">
      <ul class="mb-4 font-black text-purple-500">
        <li v-for="{ id, name } of fetchedCharacters" :key="id">{{ name }}</li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Characters',
  inheritAttrs: false,
})
</script>

<script setup lang="ts">
import { useSharedFetch } from '~/composables/useSharedFetch'
import { onMounted, watch } from 'vue'

const props = defineProps({
  stateEffectDestroyLabel: { type: String, default: 'Characters' },
})

const {
  sharedFetch: { loading, characters },
} = useSharedFetch({ destroyLabels: ['CustomLabel'], props })

const fetchedCharacters = ref(characters.value)

/* Called just to show destroyed state effect */
onMounted(() => {
  const {
    sharedFetch: { characters },
  } = useSharedFetch()
  fetchedCharacters.value = characters.value
})
watch(
  () => characters.value,
  (newValue) => {
    fetchedCharacters.value = newValue
  },
)
</script>
