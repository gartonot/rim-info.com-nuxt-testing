import { useNuxtApp } from '#imports'
import { ICharacterResponse } from '~/services/interfaces'

export default {
  fetchCharacters: async (url: string) => {
    const { $http } = useNuxtApp()
    const { data } = await $http.get(url)
    return data.value as ICharacterResponse
  }
}
