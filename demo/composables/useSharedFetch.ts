import { useFetch, type AsyncDataRequestStatus } from '#app'
import { ref } from 'vue'
import { useStateEffect } from '../../'

export const useSharedFetch = useStateEffect(
  () => {
    const characters = ref<any>([])
    const loading = ref<Boolean>(false)

    const getCharacters: () => void = async () => {
      if (characters.value.length > 0) return
      loading.value = true
      const { data, status } = await useFetch('https://rickandmortyapi.com/api/character/1,2,3,4,5')
      loading.value = status.value === 'success' || status.value === 'error' ? false : true
      characters.value = data.value
    }

    return {
      loading,
      characters,
      getCharacters: ref(getCharacters),
    }
  },
  { name: 'sharedFetch', debug: true, destroy: 'custom' },
)
