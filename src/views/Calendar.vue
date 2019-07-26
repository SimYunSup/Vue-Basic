<template>
  <background
    routing="Calendar"
  >
    <div class="calendar">
      <div class="calendar__main">
        <div class="calendar__table">
          <calendar
            :selected-date-string="selectedDateString"
            :events="events"
            @selectDate="selectedDate"
          />
        </div>
      </div>
      <div class="calendar__rightsidebar">
        <div class="calendar__selecteddate">
          {{selectedDateString}}
        </div>
        <div class="calendar__events">
          <transition-group
            name="plus"
          >
            <div
              :class="{'calendar__event': true}"
              v-for="event in selectedEvent"
              :key="event.name"
            >
              <div class="calendar__eventname">
                {{event.name}}
              </div>
              <div class="calendar__eventexlpanation">
                {{event.explain}}
              </div>
              <button
                :class="removeeventDarkMode"
                @click="minusEvent(event)"
              >
                Remove
              </button>
            </div>
          </transition-group>
          <div class="calendar__addevent">
            <div class="calendar__addeventinputs">
              <input
                type="text"
                :class="inputDarkMode"
                v-model="eventName"
                placeholder="eventName"
              >
              <input
                type="text"
                :class="inputDarkMode"
                v-model="eventExplain"
                placeholder="eventExplain"
              >
            </div>
            <button
              :class="addeventDarkMode"
              @click="plusEvent"
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  </background>
</template>

<script>
  import background from '../components/sharing/Background'
  import calendar from '../components/calendar/Calendar'
  import { mapState } from 'vuex'

  export default {
    name: "Calendar",
    data() {
      return {
        // event for plusEvent
        eventName: '',
        eventExplain: '',
        // prop to the Calendar
        selectedDateString: this.nowDateString(),
        events: [{
            dateString: '2019. 08. 30.',
            name: 'Yunsup\'s Singum',
            explain: 'Military'
          },
          {
            dateString: '2019. 08. 03.',
            name: '19-2 FrontEnd Meeting',
            explain: 'Everyone come'
          },
          {
            dateString: '2019. 07. 20.',
            name: 'Go to Toronto',
            explain: 'at 7 AM'
          }
        ]
      }
    },
    methods: {
      //if calendar component emit select event
      selectedDate(date){
        this.selectedDateString = date
      },
      plusEvent(){
        if(!(this.eventName === '')){
          this.events.push({
            dateString: this.selectedDateString,
            name: this.eventName,
            explain: this.eventExplain
          })
          this.eventName = ''
          this.eventExplain = ''
        } else {
          alert('Event 이름을 입력해주세요')
        }
      },
      minusEvent(event){
        let index = this.events.indexOf(event)
        this.events.splice(index, 1)
      },
      nowDateString() {
        let nowDate = new Date()
        const YEAR_OPTIONS = {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit'
        }
        return new Intl.DateTimeFormat('ko-KR', YEAR_OPTIONS).format(nowDate)
      }
    },
    computed: {
      ...mapState(
        'sharing',
        {
          isDarkMode: 'darkMode'
      }),
      selectedEvent(){
        return this.events.filter(
          (el) => {
            return el.dateString === this.selectedDateString
          }
        )
      },
      addeventDarkMode(){
        return{
          'calendar__event--dark': this.isDarkMode,
          'calendar__event--light': !this.isDarkMode,
          'calendar__addeventbutton': true
        }
      },
      removeeventDarkMode(){
        return{
          'calendar__event--dark': this.isDarkMode,
          'calendar__event--light': !this.isDarkMode,
          'calendar__removeeventbutton': true
        }
      },
      inputDarkMode(){
        return{
          'calendar__event--dark': this.isDarkMode,
          'calendar__event--light': !this.isDarkMode,
          'calendar__addeventinput': true
        }
      }
    },
    components: {
      background,
      calendar
    }
  }
</script>

<style scoped>
  .calendar{
    display: flex;
    flex-direction: row;
    width: 100%
  }
  /* For main area include datetable */
  .calendar__main{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-top: 50px;
    padding-bottom: 50px;
    width: 70%;
  }
  /* calendar component */
  .calendar__table{
    margin-left: auto;
    margin-right: auto;
  }
  /* For event Array */
  .calendar__rightsidebar{
    width: 30%;
    height: fit-content;
  }

  .calendar__selecteddate{
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 30px;
    font-weight: bold;
    margin-left: 10%;
    margin-right: 10%;
    margin-top: 5%;
    margin-bottom: 5%;
    padding-bottom: 5%;
    border-bottom: 1px gray solid;
    height: 15%
  }

  .calendar__event{
    display: flex;
    flex-direction: column;
    justify-content: center;
    overflow: hidden;
    margin-top: 10px;
    margin-bottom: 10px;
  }
  .plus-enter-active, .plus-leave-active{
    transition: all 1s;
  }
  .plus-enter, .plus-leave-to{
    opacity: 0;
    transform: translateX(100px);
  }

  .calendar__eventname{
    font-size: 25px;
    margin-right: auto;
    margin-left: auto;
  }
  .calendar__eventexlpanation{
    margin-right: auto;
    margin-left: auto;
  }

  .calendar__addevent{
    display: flex;
    justify-content: space-around;
    margin-right: auto;
    margin-left: auto;
    border-top: 1px gray solid;
    padding-top: 20px;
    margin-top: 20px;
    width: 80%;
  }
  .calendar__addeventinputs{
    display: flex;
    justify-content: center;
    flex-direction: column;
    margin-right: auto;
    margin-left: auto;
    border-right: 1px gray solid;
    width: 60%;
  }
  .calendar__addeventinput{
    margin-right: auto;
    margin-left: auto;
    margin-top: 5px;
    margin-bottom: 5px;
    border: 0;
    width: 70%;
    height: 20px;
  }
  .calendar__addeventbutton{
    margin-right: auto;
    margin-left: auto;
    border: 0;
    border-radius: 15px;
    cursor: pointer;
    width: 30%;
  }
  .calendar__removeeventbutton{
    margin-top: 10px;
    margin-right: auto;
    margin-left: auto;
    border: 0;
    border-radius: 15px;
    cursor: pointer;
    width: 30%;
  }

  .calendar__event--light{
    background-color: white;
    color: black;
    transition: background-color .2s;
  }
  .calendar__event--light:hover{
    background-color: deepskyblue;
  }
  .calendar__event--dark{
    background-color: midnightblue;
    color: white;
    transition: background-color .2s;
  }
  .calendar__event--dark:hover{
    background-color: royalblue;
  }

</style>