<script lang="ts" setup>
  import { toRefs } from '#imports'

  interface IProps {
    isShown: boolean
  }

  const props = defineProps<IProps>()
  const { isShown } = toRefs(props)
  const emit = defineEmits<{
    'modal-close': []
  }>()
</script>

<template>
  <div :class="['modal', { 'modal-shown': isShown }]" @click="emit('modal-close')">
    <div class="modal-wrapper" @click.stop>
      <div class="modal-close" @click="emit('modal-close')">&times;</div>
      <slot />
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .modal {
    position: fixed;
    inset: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.57);
    backdrop-filter: blur(10px);
    display: flex;
    justify-content: center;
    align-items: center;
    visibility: hidden;
    opacity: 0;

    &.modal-shown {
      visibility: visible;
      opacity: 1;
    }
    &-close {
      color: red;
      font-size: 40px;
      width: fit-content;
      padding: 10px;
      cursor: pointer;
      margin-left: auto;
    }
    &-wrapper {
      background: $color-white;
      max-width: 500px;
      max-height: 600px;
      overflow-y: auto;
      border-radius: 8px;
      padding: 20px;
    }
  }
</style>
