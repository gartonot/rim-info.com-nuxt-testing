import { useNuxtApp } from '#imports'
import { ICharacter } from '~/services/interfaces'

export default {
  fetchCharacters: async () => {
    const { $http } = useNuxtApp()
    const { data } = await $http.get('/api/character')
    return data.value.results as ICharacter[]
  }
}
