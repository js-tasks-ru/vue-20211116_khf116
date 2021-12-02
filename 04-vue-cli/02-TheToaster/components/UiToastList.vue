<template>
  <div class="toasts">
    <template v-for="toast in toasts" :key="toast.id">
      <!-- <ui-toast :toast="toast" v-if="toast.visible" /> -->
      <ui-toast :toast="toast" />
    </template>    
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
