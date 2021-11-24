import { createApp, defineComponent } from './vendor/vue.esm-browser.js';


const API_URL = 'https://course-vue.javascript.ru/api';


function fetchMeetupById(meetupId) {
  return fetch(`${API_URL}/meetups/${meetupId}`).then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      return response.json().then((error) => {
        throw error;
      });
    }
  });
}



const Root = defineComponent({
  name: 'Root',
  // Реактивные данные приложения, его локальное состояние
  data() {
    return {
      meetupId: null,
      meetupTile: '',
    }
  },

  methods: {
    setMeetupId() {

      if (!this.meetupId)
        return;
      
      fetchMeetupById(this.meetupId).then((meetup) => {
        this.meetupTile = meetup.title;
      });

    }
  },


  watch: {
    meetupId: {
      immediate: true,
      handler() {
        this.setMeetupId()
      },
    },
  },

})

// Создаём новое приложение по корневому компоненту
const app = createApp(Root);

// Монтируем приложение на странице
// Возвращается публичный экземпляр корневого компонента
const vm = app.mount('#app');

// Добавляем vm в глобальные переменные для простой отладки в консоли браузера
window.vm = vm;


