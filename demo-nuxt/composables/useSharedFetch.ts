import { useFetch } from '#app'
import { ref } from 'vue'
import { useStateEffect } from 'vue-use-state-effect'

const sharedFetch = () => {
  const characters = ref<any>([])
  const loading = ref<Boolean>(false)

  const getCharacters: () => void = async () => {
    loading.value = true
    const { data, pending } = await useFetch('https://rickandmortyapi.com/api/character/1,2,3,4,5')
    loading.value = pending.value
    characters.value = data.value
  }

  return {
    loading,
    characters,
    getCharacters,
  }
}

export const useSharedFetch = useStateEffect(sharedFetch, { name: 'sharedFetch', debug: true, destroy: false })
