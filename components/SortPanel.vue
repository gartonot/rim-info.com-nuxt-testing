<script lang="ts" setup>
  import { reactive } from '#imports'

  interface IHeader {
    id: number
    name: string
    type: string
    sort: string
    isSorted: boolean
  }

  const emit = defineEmits<{
    sorted: [string]
    'view-character': [number]
  }>()

  let headersList = reactive<IHeader[]>([
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

  let headers = headersList.filter(({ isSorted }) => isSorted)
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
  <div class="sort-panel">
    <h2>Сортировка карточек:</h2>
    <ul class="sorted-list">
      <li
        v-for="header in headers"
        :key="header.id"
        :class="[
          'sorted-list__item',
          { sorted: header.isSorted, 'sort-is-asc': header.sort === 'asc' }
        ]"
        @click="sorted(header.isSorted, header.type, header.sort, header.id)"
      >
        <span class="sorted-list__item-text">{{ header.name }}</span>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
  .sorted-list {
    display: flex;
    gap: 20px;
    padding-left: 0;
    margin-inline: auto;
    flex-wrap: wrap;
    margin-top: 12px;

    &__item {
      width: calc(100% / 2 - 20px);
      display: flex;
      flex-grow: 1;
      gap: 4px;
      border: 1px solid $color-black;
      padding: 8px;
      border-radius: 8px;

      &.sorted {
        cursor: pointer;
        padding-right: 24px;
        position: relative;
        user-select: none;

        &::after {
          content: '';
          position: absolute;
          top: 11px;
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
            top: 6px;
          }
        }
      }
      &-text {
        padding-right: 8px;
      }
    }
  }
</style>
