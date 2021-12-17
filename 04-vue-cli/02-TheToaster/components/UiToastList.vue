<template>
  <div class="toasts">
    <ui-toast v-for="toast in toasts" :key="toast.id" :toast="toast" @toastClick="$emit('toastClick', $event)" />
  </div>
</template>

<script>
import UiToast from './UiToast';

export default {
  name: 'UiToastList',

  components: { UiToast },

  props: {
    toasts: {
      type: Array,
      required: true,
    },
  },

  emits: ['toastClick'],
};
</script>

<style scoped>
.toasts {
  position: fixed;
  bottom: 8px;
  right: 8px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  white-space: pre-wrap;
  z-index: 999;
}
</style>
