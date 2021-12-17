<template>
  <ui-input ref="ui-input" v-model="customModel" v-bind="$attrs" :type="type">
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

  data() {
    return {
      localDate: null,
    };
  },

  computed: {
    customModel: {
      get() {
        if (!this.localDate) return null;

        let value = new Date(this.localDate);

        // чтобы не ругался тест UiInputDate[type=time] должен порождать событие обновления модели с новым значением при выборе даты
        // иначе выдает ошибку "RangeError: Invalid time value at Date.toISOString (<anonymous>)"
        if (isNaN(value)) return;

        switch (this.type) {
          case 'date':
            value = value.toISOString().split('T')[0];
            break;
          case 'time':
            //value = value.toTimeString().substr(0, 5);
            //value = value.toLocaleTimeString([navigator.language], { hour: '2-digit', minute: '2-digit' });
            //value = value.toLocaleTimeString();
            value = value.toISOString().split('T')[1].substr(0, 5);
            break;
          case 'datetime-local':
            // value =
            //   value.toISOString().split('T')[0] +
            //   'T' +
            //   value.toLocaleTimeString(navigator.language, { hour: '2-digit', minute: '2-digit' });
            value = value.toISOString();
            value = value.split('T')[0] + 'T' + value.split('T')[1].substr(0, 5);
            break;
          default:
            null;
            break;
        }
        return value;
      },
      set(value) {
        this.localDate = value;
      },
    },
  },

  watch: {
    modelValue: {
      deep: true,
      immediate: true,
      handler() {
        this.localDate = this.modelValue;
      },
    },
    localDate: {
      deep: true,
      handler() {
        if (this.localDate != this.modelValue) {
          let inputValue = this.$refs['ui-input'].$refs.input.valueAsNumber;
          if (isNaN(inputValue)) inputValue = null;
          // console.log(new Date(inputValue).toISOString());
          // let dd = new Date(new Date(inputValue).toISOString()).valueOf();
          // console.log(dd);
          // console.log(new Date(dd));
          this.$emit('update:modelValue', inputValue);
        }
      },
    },
  },
};
</script>
