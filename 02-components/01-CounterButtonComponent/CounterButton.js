import { defineComponent } from './vendor/vue.esm-browser.js';

export default defineComponent({
  name: 'CounterButton',

  // Компонент должен иметь входной параметр
  props: {
    count: {
      type: Number,
      default: 0,
    },
  },


  methods: {
    setCount(value) {
      this.$emit('update:count', ++value);
    },
  },

  // Шаблон лучше держать максимально простым, а логику выносить в методы

  // Шаблон потребуется отредактировать
  template: `
    <button 
      type="button"
      @click="setCount(this.count)"
    >
      {{ count }}
    </button>
  `,
});
