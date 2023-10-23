<script lang="ts" setup>
  import { useNuxtApp } from '#imports'
  import { ref, computed, reactive } from "vue"
  import TheLogo from '~/components/TheLogo.vue'
  import TableRows from '~/components/TableRows/TableRows.vue'
  import TableCards from '~/components/TableCards/TableCards.vue'
  import SortPanel from '~/components/SortPanel.vue'
  import charactersRepository from '~/services/repositories/characters-repository'
  import { ICharacter } from '~/services/interfaces'
  import AppModal from '~/components/ui/AppModal.vue'
  import CharacterMoreCard from '~/components/CharacterMoreCard.vue'

  interface IColumnSort  {
    type: string
    sort: string
  }

  const { $viewport } = useNuxtApp()
  const isMobile = computed(() => {
    return $viewport.isLessThan('md')
  })
  const modalIsShown = ref(false)
  const currentCharacter = ref<ICharacter | null>(null)
  let characters = reactive([])


  const getPage = async (page: string | null) => {
    if(page){
      const { results, info } =  await charactersRepository.fetchCharacters(page)
      characters.push(...results)
      getPage(info.next)
    }
  }

  getPage('https://rickandmortyapi.com/api/character')

  const sortCallback = (a: ICharacter, b: ICharacter, sort = 'asc') => {
    if (sort === 'asc') {
      return a < b ? -1 : 1
    } else {
      return a > b ? -1 : 1
    }
  }

  const columnSort = ({ type, sort }: IColumnSort) => {
    characters = characters.sort((a: ICharacter, b: ICharacter) => {
      const typeIsOrigin = type === 'origin'
      const currentItem = typeIsOrigin ? a[type].name : a[type]
      const nextItem = typeIsOrigin ? b[type].name : b[type]

      return sortCallback(currentItem, nextItem, sort)
    })
  }

  const modalOpen = () => {
    modalIsShown.value = true
  }
  const modalClose = () => {
    modalIsShown.value = false
  }
  const viewCharacter = (characterId: number) => {
    modalOpen()
    currentCharacter.value = characters.find(({ id }) => id === characterId)
  }
</script>

<template>
  <main class="main">
    <div class="container">
      <the-logo />
      <sort-panel v-if="isMobile" @sorted="columnSort($event)" />
      <div class="main__table">
        <table-cards
          v-if="isMobile"
          :characters="characters"
          @view-character="viewCharacter($event)"
        />
        <table-rows
          v-else
          :characters="characters"
          @sorted="columnSort($event)"
          @view-character="viewCharacter($event)"
        />
      </div>

      <app-modal :is-shown="modalIsShown" @modal-close="modalClose()">
        <character-more-card v-if="currentCharacter" :current-character="currentCharacter" />
      </app-modal>
    </div>
  </main>
</template>

<style lang="scss" scoped>
  .main {
    padding-bottom: 100px;

    &__table {
      margin-top: 50px;
    }
  }
</style>
