<template>
  <background
    routing="Calendar"
  >
    <div class="calendar">
      <div class="mainCalendar">
        <div class="calendarTable">
          <calendar
            :initial-date-string="selectedDateString"
            :event="events"
            @selectDate="selectedDate"
          />
        </div>
      </div>
      <div class="eventCalendar">
        <div class="eventDate">
          {{selectedDateString}}
        </div>
        <div class="events">
          <transition-group
            name="plus"
          >
            <div
              :class="{event: true}"
              v-for="event in selectedEvent"
              :key="event.name"
            >
              <div class="name">
                {{event.name}}
              </div>
              <div class="explain">
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
          <div class="plusevents">
            <div class="inputs">
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

  function nowDateString(){
    let nowDate = new Date()
    let month = '' + (nowDate.getMonth() + 1)
    let date = '' + nowDate.getDate()
    let monthString = month.length === 2
      ? month
      : '0' + month
    let dateString = date.length === 2
      ? date
      : '0' + date
    return nowDate.getFullYear() + '. ' + monthString + '. ' + dateString
  }
  export default {
    name: "Calendar",
    data() {
      return {
        eventName: '',
        eventExplain: '',
        selectedDateString: nowDateString(),
        events: [{
            dateString: '2019. 08. 30',
            name: 'Yunsup\'s Singum',
            explain: 'Military'
          },
          {
            dateString: '2019. 08. 03',
            name: '19-2 FrontEnd Meeting',
            explain: 'Everyone come'
          },
          {
            dateString: '2019. 07. 20',
            name: 'Go to Toronto',
            explain: 'at 7 AM'
          }
        ],
        buttons: ['Last Year', 'Last Month', 'Last Week', 'Today',
        'Next Week', 'Next Month', 'Last Year']
      }
    },
    methods: {
      selectedDate(date){
        this.selectedDateString = date.date
      },
      plusEvent(){
        this.events.push({
          dateString: this.selectedDateString,
          name: this.eventName,
          explain: this.eventExplain
        })
        this.eventName = ''
        this.eventExplain = ''
      },
      minusEvent(event){
        let index = this.events.indexOf(event)
        this.events.splice(index, 1)
      }
    },
    computed: {
      selectedEvent(){
        return this.events.filter(
          (el) => {
            return el.dateString === this.selectedDateString
          }
        )
      },
      addeventDarkMode(){
        return{
          colDark: this.$store.state.darkMode,
          colLight: !this.$store.state.darkMode,
          addevent: true
        }
      },
      removeeventDarkMode(){
        return{
          colDark: this.$store.state.darkMode,
          colLight: !this.$store.state.darkMode,
          removeevent: true
        }
      },
      inputDarkMode(){
        return{
          colDark: this.$store.state.darkMode,
          colLight: !this.$store.state.darkMode,
          input: true
        }
      },
      dateStringGMT() {
        let nowDate = new Date()
        const YEAR_OPTIONS = {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit'
        }
        return new Intl.DateTimeFormat('ko-KR', YEAR_OPTIONS).format(nowDate)
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
  .mainCalendar{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-top: 50px;
    padding-bottom: 50px;
    width: 70%;
  }
  .calendarTable{
    margin-left: auto;
    margin-right: auto;
  }
  .eventCalendar{
    width: 30%;
    height: fit-content;
  }

  .eventDate{
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

  .event{
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

  .name{
    font-size: 25px;
    margin-right: auto;
    margin-left: auto;
  }
  .explain{
    margin-right: auto;
    margin-left: auto;
  }

  .plusevents{
    display: flex;
    justify-content: space-around;
    margin-right: auto;
    margin-left: auto;
    border-top: 1px gray solid;
    padding-top: 20px;
    margin-top: 20px;
    width: 80%;
  }
  .inputs{
    display: flex;
    justify-content: center;
    flex-direction: column;
    margin-right: auto;
    margin-left: auto;
    border-right: 1px gray solid;
    width: 60%;
  }
  .input{
    margin-right: auto;
    margin-left: auto;
    margin-top: 5px;
    margin-bottom: 5px;
    border: 0;
    width: 70%;
    height: 20px;
  }
  .addevent{
    margin-right: auto;
    margin-left: auto;
    border: 0;
    border-radius: 15px;
    cursor: pointer;
    width: 30%;
  }
  .removeevent{
    margin-top: 10px;
    margin-right: auto;
    margin-left: auto;
    border: 0;
    border-radius: 15px;
    cursor: pointer;
    width: 30%;
  }

  .colLight{
    background-color: white;
    color: black;
    transition: background-color .2s;
  }
  .colLight:hover{
    background-color: deepskyblue;
  }
  .colDark{
    background-color: midnightblue;
    color: white;
    transition: background-color .2s;
  }
  .colDark:hover{
    background-color: royalblue;
  }

</style>