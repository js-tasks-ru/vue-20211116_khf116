import { createApp, defineComponent } from './vendor/vue.esm-browser.js';


// From https://jsonplaceholder.typicode.com/comments
const fetchEmails = [
  'Eliseo@gardner.biz',
  'Jayne_Kuhic@sydney.com',
  'Nikita@garfield.biz',
  'Lew@alysha.tv',
  'Hayden@althea.biz',
  'Presley.Mueller@myrl.com',
  'Dallas@ole.me',
  'Mallory_Kunze@marie.org',
  'Meghan_Littel@rene.us',
  'Carmen_Keeling@caroline.name',
  'Veronica_Goodwin@timmothy.net',
  'Oswald.Vandervort@leanne.org',
  'Kariane@jadyn.tv',
  'Nathan@solon.io',
  'Maynard.Hodkiewicz@roberta.com',
  'Christine@ayana.info',
  'Preston_Hudson@blaise.tv',
  'Vincenza_Klocko@albertha.name',
  'Madelynn.Gorczany@darion.biz',
  'Mariana_Orn@preston.org',
  'Noemie@marques.me',
  'Khalil@emile.co.uk',
  'Sophia@arianna.co.uk',
  'Jeffery@juwan.us',
  'Isaias_Kuhic@jarrett.net',
];




const Root = defineComponent({
  name: 'Root',
  // Реактивные данные приложения, его локальное состояние
  data() {
    return {
      emails: null,
      searchEmails: '',
    }
  },

  computed: {
    // filteredEmail() {
    //   const searchFilter = (email) =>
    //     email
    //       .toLowerCase()
    //       .includes(this.searchEmails.toLowerCase());

    //   return this.emails.filter(email => searchFilter(email));
    // }


    markedEmails() {

      if (!this.emails) {
        return null;
      } 

      const setMarked = (email) => {
        if (this.searchEmails.length <= 0)
          return false;

        return email
          .toLowerCase()
          .includes(this.searchEmails.toLowerCase());         
      }

      return this.emails.map(
        item => ({
          email: item,
          marked: setMarked(item) 
        })
      );
    }
  },

  mounted() {
    this.emails = fetchEmails;
  },


})

// Создаём новое приложение по корневому компоненту
const app = createApp(Root);

// Монтируем приложение на странице
// Возвращается публичный экземпляр корневого компонента
const vm = app.mount('#app');

// Добавляем vm в глобальные переменные для простой отладки в консоли браузера
window.vm = vm;


