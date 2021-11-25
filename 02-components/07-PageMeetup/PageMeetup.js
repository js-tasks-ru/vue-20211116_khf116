import { defineComponent } from './vendor/vue.esm-browser.js';
import UiContainer from './UiContainer.js';
import UiAlert from './UiAlert.js';
import { fetchMeetupById } from './meetupService.js';
import MeetupView from '../06-MeetupView/MeetupView.js';

export default defineComponent({
  name: 'PageMeetup',

  components: {
    UiAlert,
    UiContainer,
    MeetupView,
  },

  data() {
    return {
      meetup: null,
      fetchStatus: '',
      fetchError: null,
    }
  },

  props: {
    meetupId: {
      type: Number,
      required: true,
    },
  },

  methods: {
    setMeetupId() {

      if (!this.meetupId)
        return;

      this.fetchStatus = 'load';
      
      fetchMeetupById(this.meetupId).then(
        meetup => { 
          this.fetchStatus = 'done';
          this.meetup = meetup; 
        },
        error => { 
          this.fetchStatus = 'error';
          this.fetchError = error.message;
        }
      );

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

  template: `
    <div class="page-meetup">
      
      <template v-if="fetchStatus === 'done'">
        <meetup-view :meetup="meetup"/>
      </template>

      <ui-container v-else-if="fetchStatus === 'error'">
        <ui-alert>
          Ошибка: {{ fetchError }}
        </ui-alert>
      </ui-container>

      <ui-container v-else>
        <ui-alert>
          Загрузка...
        </ui-alert>
      </ui-container>

    </div>
  `,
});
