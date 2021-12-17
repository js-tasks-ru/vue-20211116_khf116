<template>
  <div>
    <ui-toast-list :toasts="toasts" @toastClick="delToast($event)" />
  </div>
</template>

<script>
import UiToastList from './UiToastList';

const toastHiddingDelay = 5000;

export default {
  name: 'TheToaster',

  components: { UiToastList },

  data() {
    return {
      toasts: [],
      lastId: 0,
      timerId: null,
    };
  },

  methods: {
    addToast(params) {
      const id = ++this.lastId;
      const delay = params['delay'] || toastHiddingDelay;

      this.toasts.push({
        id: id,
        type: params.type,
        message: params.message,
        delay: delay,
      });

      setTimeout(
        function (toasts, id) {
          if (toasts) toasts.delToast(id);
        },
        delay,
        this,
        id,
      );
    },

    delToast(id) {
      let index = this.toasts.findIndex((item) => item['id'] === id);
      if (index >= 0) this.toasts.splice(index, 1);
    },

    success(message) {
      this.addToast({
        type: 'success',
        message: message,
      });
    },

    error(message) {
      this.addToast({
        type: 'error',
        message: message,
      });
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
