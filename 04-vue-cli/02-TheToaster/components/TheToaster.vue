<template>
  <div>
    <ui-toast-list :toasts="toasts" />
  </div>
</template>

<script>
import UiToastList from './UiToastList';

export default {
  name: 'TheToaster',

  data() {
    return {
      toasts: [],
    }
  },

  components: { UiToastList },

  methods: {

    addToast(params) {

      var id = this.toasts.length;
      this.toasts.push({
        // пришлось добавить ключ, чтобы не ругался линтер в UiToastList на строке в <span v-for="toast in toasts" :key="toast.id" class="toast">
        id: id, 
        type: params.type,
        message: params.message,
        visible: true,        
      });

      setTimeout(() => this.toasts[id].visible = false, 5000);
    },

    success(message) {
      this.addToast({
        type: 'success',
        message: message,
      })
    },

    error(message) {
      this.addToast({
        type: 'error',
        message: message,
      })
    },
  },

};
</script>

<style scoped>

@media all and (min-width: 992px) {
  .toasts {
    bottom: 72px;
    right: 112px;
  }
}

</style>
