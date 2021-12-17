<template>
  <button @click="click">{{ localCount }}</button>
</template>

<script>
export default {
  name: 'CounterButton',

  props: {
    count: {
      type: Number,
      default: 0,
    },
  },

  emits: ['update:count'],

  data() {
    return {
      localCount: 0,
    };
  },

  watch: {
    count: {
      deep: true,
      immediate: true,
      handler() {
        this.localCount = this.count;
      },
    },
  },

  methods: {
    click() {
      this.$emit('update:count', ++this.localCount);
    },
  },
};
</script>
