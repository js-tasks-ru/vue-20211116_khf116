<template>
  <ui-input ref="ui-input" :model-value="value" v-bind="$attrs" :type="type" @input="handleInput">
    <template v-for="slotName in Object.keys($slots)" #[slotName]>
      <slot :name="slotName" />
    </template>
  </ui-input>
</template>

<script>
import UiInput from './UiInput';

export default {
  name: 'UiInputDate',

  components: { UiInput },

  inheritAttrs: false,

  props: {
    type: {
      type: String,
      default: 'date',
    },
    modelValue: {
      type: Number,
      default: null,
    },
  },

  emits: ['update:modelValue'],

  computed: {
    value() {
      if (!this.modelValue) return null;

      let value = new Date(this.modelValue);

      // чтобы не ругался тест UiInputDate[type=time] должен порождать событие обновления модели с новым значением при выборе даты
      // иначе выдает ошибку "RangeError: Invalid time value at Date.toISOString (<anonymous>)"
      if (isNaN(value)) return;

      switch (this.type) {
        case 'date':
          value = value.toISOString().split('T')[0];
          break;
        case 'time':
          value = value.toISOString().split('T')[1].substr(0, 5);
          break;
        case 'datetime-local':
          value = value.toISOString();
          value = value.split('T')[0] + 'T' + value.split('T')[1].substr(0, 5);
          break;
        default:
          null;
          break;
      }
      return value;
    },
  },

  methods: {
    handleInput($event) {
      let inputValue = $event.target.valueAsNumber;
      if (isNaN(inputValue)) inputValue = null;
      this.$emit('update:modelValue', inputValue);
    },
  },
};
</script>
