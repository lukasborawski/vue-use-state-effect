import { type Ref, ref, watch } from 'vue'
import { useStateEffect } from '../../'

export const useSharedState = useStateEffect<{ loading: Ref }, { updateState: Ref; state: Ref }>(
  (...args) => {
    const [options] = args
    const state = ref({
      test: '🚀 Initial state value.',
    })

    const updateState: () => void = () => {
      state.value.test = '🌝 Updated state value.'
    }

    watch(
      () => options.addons!.loading.value,
      ($value) => console.log('loading status passed to composable:', $value),
    )

    return {
      state,
      updateState: ref(updateState),
    }
  },
  {
    name: 'sharedState',
    debug: true,
    destroy: false,
  },
)
