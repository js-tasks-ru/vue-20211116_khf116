<template>
  <div>
    <ui-toast-list :toasts="toasts" />
  </div>
</template>

<script>
import UiToastList from './UiToastList';

const toastHiddingDelay = 5000;

export default {
  name: 'TheToaster',

  data() {
    return {
      toasts: [],
      lastId: 0,
      timerId: null,
    }
  },

  components: { UiToastList },

  methods: {

    addToast(params) {
      var id = ++this.lastId;

      this.toasts.push({
        id: id, 
        type: params.type,
        message: params.message,  
        delay: params.delay || toastHiddingDelay,
      });

      setTimeout(function(arr, id) {
        var index = arr.findIndex(item => item.id === id);
        if (index >= 0) {
          arr.splice(index, 1);
        }         
      }, toastHiddingDelay, this.toasts, id);      
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
