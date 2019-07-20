<template>
  <table class="dateTable">
    <thead>
      <tr class="dateTableRow">
        <td
          class="dateTableCol monthButton"
          @click="previousMonth"
        >
          &lt;
        </td>
        <td colspan="5" class="monthSelectRow">
          <select
            :class="monthSelectDarkMode"
            v-model="displayYear"
          >
            <option
              v-for="year in years"
              :key="year"
            >
              {{year}}
            </option>
          </select>
          <select
            :class="monthSelectDarkMode"
            v-model="displayMonth"
          >
            <option
              v-for="(month,index) in monthInfo"
              :value="index + 1"
              :key="index"
            >
              {{month}}
            </option>
          </select>
        </td>
        <td
          class="dateTableCol monthButton"
          @click="nextMonth"
        >
          &gt;
        </td>
      </tr>
    </thead>
    <tbody>
      <tr class="dateTableRow">
        <td
          v-for="(day, index) in dayInfo"
          :class="{dateTableCol: true, day: true}"
          :key="index"
        >
          {{day}}
        </td>
      </tr>
      <tr
        v-for="(dates, index) in calendar"
        :class="{dateTableRow: true}"
        :key="index"
      >
        <td
          v-for="(dateNum, index) in dates"
          :key="index"
          :class="dateNum.enable"
          @click="selectDate(dateNum)"
        >
          {{dateNum.date}}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
  function dateStringGMT(dates){
    let nowDate = new Date(dates)
    let month = '' + (nowDate.getMonth() + 1)
    let date = '' + nowDate.getDate()
    let monthString = month.length === 2
      ? month
      : '0' + month
    let dateString = date.length === 2
      ? date
      : '0' + date
    return nowDate.getFullYear() + '-' + monthString + '-' + dateString
  }
  function yearOfString(date) {
    let nowDate = new Date(date)
    return Number(dateStringGMT(nowDate).slice(0, 4))
  }
  function monthOfString(date) {
    let nowDate = new Date(date)
    return Number(dateStringGMT(nowDate).slice(5, 7))
  }
  function dateOfString(date) {
    let nowDate = new Date(date)
    return Number(dateStringGMT(nowDate).slice(8, 10))
  }

  export default {
    name: "calendar",
    data() {
      return {
        displayYear: yearOfString(this.initialDateString),
        displayMonth: monthOfString(this.initialDateString),
        displayDate: dateOfString(this.initialDateString),
        monthInfo: ['January', 'February', 'March', 'April', 'May', 'June',
          'July', 'August', 'September', 'October', 'November', 'December'],
        dayInfo: ['Sun', 'Mon', 'Tus', 'Wed', 'Thu', 'Fri', 'Sat']
      }
    },
    props: {
      rangeOfyear: {
        type: Object,
        default: function () {
          return {
            startYear: 1950,
            range: 100
          }
        }
      },
      initialDateString: {
        type: String,
        required: true
      },
      event: {
        type: Array
      }
    },
    methods: {
      selectDate(date){
        if(date.enable.display === true){
          this.displayDate = date.date
          let displayDate = new Date(
            this.displayYear,
            this.displayMonth - 1,
            this.displayDate)
          let displayDateString = dateStringGMT(displayDate).slice(0, 10)
          this.$emit('selectDate', {date: displayDateString})
        }
      },
      previousMonth(){
        if(this.displayMonth === 1){
          this.displayYear--
          this.displayMonth = 12
        } else
          this.displayMonth--
      },
      nextMonth(){
        if(this.displayMonth === 12){
          this.displayYear++
          this.displayMonth = 1
        } else
          this.displayMonth++
      }
    },
    computed: {
      calendar(){
        let displayFirstDate = new Date(
          this.displayYear,
          this.displayMonth - 1,
          1)
        let displayDay = displayFirstDate.getDay()
        let dateArray = [[],[],[],[],[],[]]
        if(displayDay !== 0)
          displayFirstDate.setDate(-displayDay + 1)
        for(let i=0; i < 6; i++)
          for(let j=0; j < 7; j++){
            let displayDate = displayFirstDate.getDate()
            let displayMonth = displayFirstDate.getMonth() + 1
            let displayNowDateString = dateStringGMT(displayFirstDate)
              .slice(0, 10)
            let eventEnable = this.event.find(
              (el) => {return el.dateString === displayNowDateString}
            ) !== undefined
            && this.displayMonth === displayMonth
            dateArray[i][j] = {
              date: displayDate,
              enable: {
                select: monthOfString(this.initialDateString) === displayMonth
                  && this.displayDate === displayFirstDate.getDate(),
                event: eventEnable,
                display: this.displayMonth === displayMonth,
                disable: this.displayMonth !== displayMonth,
                dateTableCol: true
              }
            }
            displayFirstDate.setDate(++displayDate)
          }

        return dateArray
      },
      years(){
        return Array
          .apply(null, {length: this.rangeOfyear.range})
          .map(Number.call, num => num + this.rangeOfyear.startYear)
      },
      monthSelectDarkMode(){
        return{
          monthSelectDark: this.$store.state.darkMode,
          monthSelectLight: !this.$store.state.darkMode,
          monthSelect: true
        }
      }
    }
  }
</script>

<style scoped>
  .dateTable{
    margin-left: auto;
    margin-right: auto;
  }
  .dateTableCol{
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    overflow: hidden;
    margin: 3px;
    width: 50px;
    height: 50px;
  }
  .dateTableRow{
    display: flex;
    flex-direction: row;
    height: 55px;
    overflow: hidden;
  }
  .monthSelectRow{
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    height: 100%;
    margin: 3px;
  }
  .monthSelect{
    border: 0;
    cursor: pointer;
    width: 40%;
    height: 50%;
  }
  .monthSelectDark{
    background-color: midnightblue;
    color: white;
    transition: background-color .2s;
  }
  .monthSelectDark:hover{
    background-color: royalblue;
  }
  .monthSelectLight{
    background-color: white;
    color: black;
    transition: background-color .2s;
  }
  .monthSelectLight:hover{
    background-color: deepskyblue;
  }
  .monthButton{
    cursor: pointer;
    transition: background-color .2s;
  }
  .monthButton:hover{
    background-color: blue;
  }
  .day{
    cursor: default;
  }

  .display{
    cursor: pointer;
    transition: background-color .2s;
  }
  .display:hover{
    background-color: dodgerblue;
  }
  .event{
    background-color: blueviolet;
  }
  .select{
    background-color: blue;
  }
  .disable{
    cursor: default;
    color: gray;
  }
</style>