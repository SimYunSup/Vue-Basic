<template>
  <table class="datetable">
    <thead>
    <tr class="datetable__row">
      <td
        class="datetable__col"
        @click="previousMonth"
      >
        <div
          v-if="this.rangeOfYear.startYear <= this.selectedYear - 1"
          class="datetable__monthbutton"
        >
          &lt;
        </div>
      </td>
      <td colspan="5" class="datetable__largecol">
        <select
          :class="monthSelectDarkMode"
          v-model="selectedYear"
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
          v-model="selectedMonth"
        >
          <option
            v-for="(month,index) in monthName"
            :value="index + 1"
            :key="index"
          >
            {{month}}
          </option>
        </select>
      </td>
      <td
        class="datetable__col"
        @click="nextMonth"
      >
        <div
          v-if="this.rangeOfYear.startYear +
             this.rangeOfYear.range - 1 >= this.selectedYear + 1"
          class="datetable__monthbutton"
        >
          &gt;
        </div>
      </td>
    </tr>
    </thead>
    <tbody>
    <tr class="datetable__row">
      <td
        v-for="(day, index) in dayName"
        :class="{'datetable__col': true, 'datetable__day': true}"
        :key="index"
      >
        {{day}}
      </td>
    </tr>
    <tr
      v-for="(dates, index) in calendar"
      :class="{'datetable__row': true}"
      :key="index"
    >
      <td
        v-for="(dateInfo, index) in dates"
        :key="index"
        :class="dateInfo.condition"
        @click="selectDate(dateInfo)"
      >
        {{dateInfo.date}}
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: "calendar",
    data() {
      return {
        // year/month/date now selected
        selectedYear: this.yearOfString(this.selectedDateString),
        selectedMonth: this.monthOfString(this.selectedDateString),
        selectedDate: this.dateOfString(this.selectedDateString),
        //Name of Month
        monthName: ['January', 'February', 'March', 'April', 'May', 'June',
          'July', 'August', 'September', 'October', 'November', 'December'],
        //Name of Day
        dayName: ['Sun', 'Mon', 'Tus', 'Wed', 'Thu', 'Fri', 'Sat']
      }
    },
    props: {
      //Change years in select tag
      //properties: startYear, range
      rangeOfYear: {
        type: Object,
        default: function () {
          return {
            startYear: 1950,
            range: 100
          }
        }
      },
      //date string now selected
      //date string form is YYYY. MM. DD.
      selectedDateString: {
        type: String,
        required: true
      },
      //Array for Event Objects
      //Objects' properties: dateString, name, explain
      events: {
        type: Array
      }
    },
    methods: {
      //if you select any date column
      selectDate(dateInfo) {
        //if date is in correct month
        if (dateInfo.condition.datetable__date === true) {
          this.selectedDate = dateInfo.date
          let changeDate = new Date(
            this.selectedYear,
            this.selectedMonth - 1,
            this.selectedDate)
          this.$emit('selectDate',this.dateStringGMT(changeDate))
        }
      },
      //if you clicked previous button
      previousMonth() {
        if (this.selectedMonth === 1) {
          this.selectedYear--
          this.selectedMonth = 12
        } else
          this.selectedMonth--
      },
      //if you clicked next button
      nextMonth() {
        if (this.selectedMonth === 12) {
          this.selectedYear++
          this.selectedMonth = 1
        } else
          this.selectedMonth++
      },
      // year/month/date of the dateString
      yearOfString(dateString) {
        return dateString.slice(0, 4) * 1
      },
      monthOfString(dateString) {
        return Number(dateString.slice(6, 8))
      },
      dateOfString(dateString) {
        return dateString.slice(10, 12) * 1
      },
      //dateString of dateValue
      dateStringGMT(dateValue) {
        let date = new Date(dateValue)
        const YEAR_OPTIONS = {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit'
        }
        return new Intl.DateTimeFormat('ko-KR', YEAR_OPTIONS).format(date)
      }
    },
    computed: {
      //isDarkMode getter function from vuex
      ...mapGetters([
        'sharing/isDarkMode'
      ]),
      //For datetable in calendar
      calendar() {
        //Firstday in selectedMonth selectedYear
        let dateValue = new Date(
          this.selectedYear,
          this.selectedMonth - 1,
          1)
        let day = dateValue.getDay()
        let dateArray = [[], [], [], [], [], []]
        //set dateValue Sunday of week
        if (day !== 0)
          dateValue.setDate(-day + 1)

        //set value in dateArray
        for (let i = 0; i < 6; i++)
          for (let j = 0; j < 7; j++) {
            let displayDate = dateValue.getDate()
            let displayMonth = dateValue.getMonth() + 1
            let displayNowDateString = this.dateStringGMT(dateValue)
              .slice(0, 13)
            let eventEnable = this.events.find(
              (el) => {
                return el.dateString === displayNowDateString
              }
              ) !== undefined
              && this.selectedMonth === displayMonth
            dateArray[i][j] = {
              date: displayDate,
              condition: {
                'datetable__date--select': this.monthOfString(this.selectedDateString) === displayMonth
                  && this.selectedDate === dateValue.getDate(),
                'datetable__date--event': eventEnable,
                'datetable__date': this.selectedMonth === displayMonth,
                'datetable__date--disabled': this.selectedMonth !== displayMonth,
                'datetable__col': true
              }
            }
            dateValue.setDate(++displayDate)
          }

        return dateArray
      },
      years() {
        return Array
          .apply(null, {length: this.rangeOfYear.range})
          .map(Number.call, num => num + this.rangeOfYear.startYear)
      },
      monthSelectDarkMode() {
        return {
          'datetable__select--dark': this.isDarkMode,
          'datetable__select--light': !this.isDarkMode,
          'datetable__select': true
        }
      }
    }
  }
</script>

<style scoped>
  /* for dataTable*/
  .datetable {
    margin-left: auto;
    margin-right: auto;
  }
  /* for dataTable column in Row*/
  .datetable__col {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    overflow: hidden;
    margin: 3px;
    width: 50px;
    height: 50px;
  }
  /* for dataTable Row*/
  .datetable__row {
    display: flex;
    flex-direction: row;
    height: 55px;
    overflow: hidden;
  }

  /* thead - year/month select row */
  .datetable__largecol {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    height: 100%;
    margin: 3px;
  }
  /* For thead year/month select*/
  .datetable__select {
    border: 0;
    cursor: pointer;
    width: 40%;
    height: 50%;
  }
  .datetable__select--dark {
    background-color: midnightblue;
    color: white;
    transition: background-color .2s;
  }
  .datetable__select--dark:hover {
    background-color: royalblue;
  }
  .datetable__select--light {
    background-color: white;
    color: black;
    transition: background-color .2s;
  }
  .datetable__select--light:hover {
    background-color: deepskyblue;
  }
  /* For thead previous/next month button*/
  .datetable__monthbutton {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color .2s;
    width: 100%;
    height: 100%;
  }
  .datetable__monthbutton:hover {
    background-color: blue;
  }

  /* for tbody each day in first row*/
  .datetable__day {
    cursor: default;
  }
  /* for tbody each date in row*/
  .datetable__date {
    cursor: pointer;
    transition: background-color .2s;
  }
  .datetable__date:hover {
    background-color: dodgerblue;
  }
  .datetable__date--event {
    background-color: blueviolet;
  }
  .datetable__date--select {
    background-color: blue;
  }
  .datetable__date--disabled {
    cursor: default;
    color: gray;
  }
</style>