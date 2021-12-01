<template>
  <div class="toasts">
    <span v-for="toast in toasts" :key="toast.id">
      <ui-toast :item="toast" v-if="toast.visible" />
    </span>    
  </div>
</template>

<script>
import UiToast from './UiToast';

export default {
  name: 'UiToastList',

  props: {
    toasts: {
      type: Array,
      required: true,
    },
  },

  components: { UiToast },


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
