import { createApp, defineComponent } from './vendor/vue.esm-browser.js';

// Создайте Vue приложение

const Root = defineComponent({
  name: 'Root',
  // Реактивные данные приложения, его локальное состояние
  data() {
    return {
      firstNumber: 0,
      secondNumber: 0,
      operation: null,      
      // decision: 0,

    }
  },

  computed: {
    // Вычислим отфильтрованный список митапов
    decision() {

      var div = (firstNumber, secondNumber) => {
        try {
          var result = firstNumber / secondNumber;
        } catch (error) {
          return 'error: ' + error.message;
        }

        if (isNaN(result))
          return 'bad numbers (NAN)';
        else if (!isFinite(result))
          return 'bad denominator (Infinity)';
        else 
          return result;
      }

      
      if (this.operation === 'sum')
        return this.firstNumber + this.secondNumber;
      else if (this.operation === 'subtract')
        return this.firstNumber - this.secondNumber;
      else if (this.operation === 'multiply')
        return this.firstNumber * this.secondNumber;
      else if (this.operation === 'divide')
        return div(this.firstNumber, this.secondNumber);
      else 
        return 'select operation';
      
      
    }
  }

})

// Создаём новое приложение по корневому компоненту
const app = createApp(Root);

// Монтируем приложение на странице
// Возвращается публичный экземпляр корневого компонента
const vm = app.mount('#app');

// Добавляем vm в глобальные переменные для простой отладки в консоли браузера
window.vm = vm;