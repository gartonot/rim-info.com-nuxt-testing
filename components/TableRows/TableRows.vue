<script lang="ts" setup>
  import { ICharacter } from '~/services/interfaces'
  import { toRefs, reactive } from '#imports'

  interface IHeader {
    id: number
    name: string
    type: string
    sort: string
    isSorted: boolean
  }
  interface IProps {
    characters: ICharacter[]
  }
  const props = defineProps<IProps>()
  const { characters } = toRefs(props)
  const emit = defineEmits<{
    sorted: [string]
  }>()

  let headers = reactive<IHeader[]>([
    {
      id: 1,
      name: '#',
      type: 'id',
      sort: 'desc',
      isSorted: false
    },
    {
      id: 2,
      name: 'Имя',
      type: 'name',
      sort: 'desc',
      isSorted: true
    },
    {
      id: 3,
      name: 'Статус',
      type: 'status',
      sort: 'desc',
      isSorted: false
    },
    {
      id: 4,
      name: 'Вид',
      type: 'species',
      sort: 'desc',
      isSorted: false
    },
    {
      id: 5,
      name: 'Пол',
      type: 'gender',
      sort: 'desc',
      isSorted: true
    },
    {
      id: 6,
      name: 'Происхождение',
      type: 'origin',
      sort: 'desc',
      isSorted: true
    }
  ])

  const switchSortById = (headerId: number) => {
    headers = headers.map(item => {
      if (item.id === headerId) {
        item.sort = item.sort === 'desc' ? 'asc' : 'desc'
      }
      return item
    })
  }
  const sorted = (isSorted: boolean, headerType: string, headerSort: string, headerId: number) => {
    switchSortById(headerId)

    if (isSorted) {
      emit('sorted', { type: headerType, sort: headerSort })
    }
  }
</script>

<template>
  <table class="table">
    <thead class="table-head">
      <tr class="table-row">
        <th
          v-for="header in headers"
          :key="header.id"
          :class="[
            'table-header',
            { 'ceil-is-sorted': header.isSorted, 'sort-is-asc': header.sort === 'asc' }
          ]"
          @click="sorted(header.isSorted, header.type, header.sort, header.id)"
        >
          {{ header.name }}
        </th>
      </tr>
    </thead>
    <tbody class="table-body">
      <tr
        v-for="character in characters"
        :key="character.id"
        class="table-row"
        @click="emit('view-character', character.id)"
      >
        <td class="table-data">{{ character.id }}</td>
        <td class="table-data">{{ character.name }}</td>
        <td class="table-data">{{ character.status }}</td>
        <td class="table-data">{{ character.species }}</td>
        <td class="table-data">{{ character.gender }}</td>
        <td class="table-data">{{ character.origin.name }}</td>
      </tr>
    </tbody>
  </table>
</template>

<style lang="scss" scoped>
  table {
    border-collapse: collapse;
    margin-inline: auto;
  }
  table,
  tr,
  th,
  td {
    border: 1px solid $color-black;
  }

  .table-header {
    padding: 12px;
    cursor: default;

    &.ceil-is-sorted {
      cursor: pointer;
      padding-right: 32px;
      position: relative;
      user-select: none;

      &:hover {
        text-decoration: underline;
      }
      &::after {
        content: '';
        position: absolute;
        top: 15px;
        right: 12px;
        display: block;
        border: 5px solid transparent;
        border-top: 10px solid $color-primary;
        transform-origin: center;
        transition: 0.3s;
      }
      &.sort-is-asc {
        &::after {
          transform: scale(1, -1);
          border-top: 10px solid $color-secondary;
          top: 10px;
        }
      }
    }
  }

  .table-body {
    .table-row {
      cursor: pointer;

      &:hover {
        background: $color-primary;
      }
    }
    .table-data {
      padding: 12px;
    }
  }
</style>
