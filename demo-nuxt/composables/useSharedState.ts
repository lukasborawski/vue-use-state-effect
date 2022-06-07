import { ref } from 'vue'
import { useStateEffect } from '../../'

const sharedState = () => {
  const state = ref({
    test: '🚀 Initial state value.',
  })
  const updateState: () => void = () => {
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
