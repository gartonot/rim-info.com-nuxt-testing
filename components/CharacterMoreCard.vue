<script lang="ts" setup>
  import { toRefs } from '#imports'
  import { ICharacter } from '~/services/interfaces'

  interface IProps {
    currentCharacter: ICharacter
  }

  const props = defineProps<IProps>()
  const { currentCharacter } = toRefs(props)

  const dataOrEmpty = value => {
    return value ? value : '-'
  }
</script>

<template>
  <article class="card">
    <div class="field-id">{{ `#${currentCharacter.id}` }}</div>

    <img
      :src="currentCharacter.image"
      width="300"
      height="300"
      loading="lazy"
      class="card__image"
      alt="Character image"
    />

    <div class="card__list">
      <div class="field">
        <div class="field__name">Имя</div>
        <div class="field__value">{{ dataOrEmpty(currentCharacter.name) }}</div>
      </div>

      <div class="field">
        <div class="field__name">Статус</div>
        <div class="field__value">{{ dataOrEmpty(currentCharacter.status) }}</div>
      </div>

      <div class="field">
        <div class="field__name">Вид</div>
        <div class="field__value">{{ dataOrEmpty(currentCharacter.species) }}</div>
      </div>

      <div class="field">
        <div class="field__name">Тип</div>
        <div class="field__value">{{ dataOrEmpty(currentCharacter.type) }}</div>
      </div>

      <div class="field">
        <div class="field__name">Пол</div>
        <div class="field__value">{{ dataOrEmpty(currentCharacter.gender) }}</div>
      </div>

      <div class="field">
        <div class="field__name">Происхождение</div>
        <div class="field__value">{{ dataOrEmpty(currentCharacter.origin.name) }}</div>
      </div>

      <div class="field">
        <div class="field__name">Локация</div>
        <div class="field__value">{{ dataOrEmpty(currentCharacter.location.name) }}</div>
      </div>
    </div>

    <ul class="card__episodes">
      <li v-for="(episode, index) in currentCharacter.episode" :key="index">
        <a :href="episode" target="_blank">
          {{ episode }}
        </a>
      </li>
    </ul>
  </article>
</template>

<style lang="scss" scoped>
  .card {
    &__image {
      margin: 20px auto;
      border-radius: 50%;
      max-width: 150px;
      height: auto;
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
    width: calc(100% / 2 - 12px);
    flex-grow: 1;
    color: $color-black;
    font-size: 16px;
    margin-block: 8px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding-block: 12px;
    border-bottom: 1px solid $color-black;

    &__name {
      font-size: 14px;
      opacity: 0.5;
    }
    &__value {
      font-weight: 600;
    }
  }
</style>
