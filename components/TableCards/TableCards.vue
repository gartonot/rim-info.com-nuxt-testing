<script lang="ts" setup>
  import { toRefs } from '#imports'
  import { ICharacter } from '~/services/interfaces'

  interface IProps {
    characters: ICharacter[]
  }

  const props = defineProps<IProps>()
  const { characters } = toRefs(props)

  const emit = defineEmits<{
    'view-character': [number]
  }>()
</script>

<template>
  <div class="characters-list">
    <article
      v-for="character in characters"
      :key="character.id"
      class="card"
      @click="emit('view-character', character.id)"
    >
      <div class="field-id">{{ `#${character.id}` }}</div>

      <div class="card__list">
        <div class="field">
          <div class="field__name">Имя</div>
          <div class="field__value">{{ character.name }}</div>
        </div>

        <div class="field">
          <div class="field__name">Статус</div>
          <div class="field__value">{{ character.status }}</div>
        </div>

        <div class="field">
          <div class="field__name">Вид</div>
          <div class="field__value">{{ character.species }}</div>
        </div>

        <div class="field">
          <div class="field__name">Тип</div>
          <div class="field__value">{{ character.type }}</div>
        </div>

        <div class="field">
          <div class="field__name">Пол</div>
          <div class="field__value">{{ character.gender }}</div>
        </div>

        <div class="field">
          <div class="field__name">Происхождение</div>
          <div class="field__value">{{ character.origin.name }}</div>
        </div>

        <div class="field">
          <div class="field__name">Локация</div>
          <div class="field__value">{{ character.location.name }}</div>
        </div>
      </div>
    </article>
  </div>
</template>

<style lang="scss" scoped>
  .characters-list {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  .card {
    background-color: $color-gray;
    color: $color-black;
    padding: 20px;
    border-radius: 8px;
    transition: 0.3s;
    cursor: pointer;

    &:hover {
      background: $color-primary;
      color: $color-white;
    }

    &__list {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
    }
  }
  .field-id {
    font-weight: 600;
    font-size: 20px;
  }
  .field {
    width: 100%;
    flex-grow: 1;
    color: inherit;
    font-size: 16px;
    margin-block: 8px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding-block: 12px;
    border-bottom: 1px solid currentColor;

    @media screen and (min-width: $breakpoint-sm) {
      width: calc(100% / 2 - 12px);
    }

    &__name {
      font-size: 14px;
      opacity: 0.5;
    }
    &__value {
      font-weight: 600;
    }
  }
</style>
