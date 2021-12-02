<template>
  <!-- <div :class="toastClass" v-if="isVisible"> -->
  <div class="toast" :class="toastClass">
    <ui-icon class="toast__icon" :icon="toastIcon" />
    <span>{{ toast.message }}</span>
  </div>
</template>

<script>
import UiIcon from './UiIcon';

const toastIcons = {
  success: 'check-circle',
  error: 'alert-circle',
};

const toastClasses = {
  success: 'toast toast_success',
  error: 'toast toast_error',
};


export default {
  name: 'UiToast',

  components: { UiIcon },

  // data () {
  //   return {
  //     isVisible: true,
  //     timerId: null,
  //   }
  // },

  props: {
    toast: {
      type: Object,
      required: true,
    },
  },
  
  // mounted() {
  //   this.startHiding();
  // },

  // methods: {    
  //   startHiding() {
  //     this.timerId = setTimeout(() => this.isVisible = false, this.delayValue);
  //   },

  //   hide() {
  //     this.isVisible = false;
  //     if (this.timerId)
  //       clearTimeout(this.timerId);
  //   }
  // },


  computed: {

    toastIcon() {
      return toastIcons[this.toast.type];
    },

    toastClass() {
      return toastClasses[this.toast.type];
    },

    // delayValue() {
    //   return this.item.delay || 5000;
    // },

  },

};
</script>

<style scoped>


.toast {
  display: flex;
  flex: 0 0 auto;
  flex-direction: row;
  align-items: center;
  padding: 16px;
  background: #ffffff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  font-size: 18px;
  line-height: 28px;
  width: auto;
}

.toast + .toast {
  margin-top: 20px;
}

.toast__icon {
  margin-right: 12px;
}

.toast.toast_success {
  color: var(--green);
}

.toast.toast_error {
  color: var(--red);
}
</style>
