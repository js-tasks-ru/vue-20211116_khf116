import { defineComponent } from './vendor/vue.esm-browser.js';
import UiAlert from './UiAlert.js';
import UiContainer from './UiContainer.js';
import MeetupDescription from '../02-MeetupDescription/MeetupDescription.js';
import MeetupCover from '../03-MeetupCover/MeetupCover.js';
import MeetupInfo from '../04-MeetupInfo/MeetupInfo.js';
import MeetupAgenda from '../05-MeetupAgenda/MeetupAgenda.js';


export default defineComponent({
  name: 'MeetupView',

  components: {
    UiAlert,
    UiContainer,
    MeetupDescription,
    MeetupCover,
    MeetupInfo,
    MeetupAgenda,
  },

  props: {
    meetup: {
      type: Object,
      required: true,
    },
  },

  template: `
    <div>
      <ui-container>
        <meetup-cover :title="meetup.title" :image="meetup.image"/>

        <div class="meetup">
          <div class="meetup__content">          
            <h3>Описание</h3>

            <meetup-description :description="meetup.description"/>

            <h3>Программа</h3>

            <template v-if="meetup.agenda.length">
              <meetup-agenda :agenda="meetup.agenda"/>
            </template>
            <ui-alert v-else>
              Программа пока пуста...
            </ui-alert>
            
          </div>
          <div class="meetup__aside">

            <meetup-info :organizer="meetup.organizer" :place="meetup.place" :date="meetup.date"/>

          </div>
        </div>
      </ui-container>
    </div>
  `,
});
