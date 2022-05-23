import { ref } from 'vue'
import { useStateEffect } from 'vue-use-state-effect'

const sharedState = () => {
  const state = ref({
    test: '🚀 Initial state value.',
  })
  const updateState = () => {
    state.value = {
      test: '🌝 Updated state value.',
    }
  }
  return {
    state,
    updateState,
  }
}

export const useSharedState = useStateEffect(sharedState, { name: 'sharedState', debug: true, destroy: false })
