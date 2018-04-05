<template>
  <f7-page>
      <f7-navbar class="navbar-top">
        <f7-nav-left>
          <f7-link panel-open="left"><f7-icon ion="navicon" size="44px"></f7-icon></f7-link>
        </f7-nav-left>
        <div class="titles">
          <f7-nav-title subtitle="Score">Scores Update</f7-nav-title>
          <f7-nav-title class="subtitle">Score</f7-nav-title>
        </div>
        <f7-nav-right>
        </f7-nav-right>
      </f7-navbar>
      <f7-subnavbar class="toolbar-top">
        <f7-link class="ic-home"><f7-icon ion="android-home" size="40px"></f7-icon></f7-link>
        <f7-toolbar  tabbar class="tabbar-top">
          <f7-link v-for="(day, index) in days" :key="index" :tab-link="'#tabc' + index" :tab-link-active="day.status"><div>{{ day.dayName }}</div><div>{{ day.dayNumb }}</div></f7-link>
        </f7-toolbar>
      </f7-subnavbar>
      <f7-tabs swipeable class="bg-tabs">
        <f7-tab v-for="(day, index) in days" :key="index" :id="'tabc' + index" :tab-active="day.status">
          <f7-list class="teams">
            <f7-list-item v-for="(match, index) in getCurretMatch(day.dayNumb)" :key="index" class="team">
              <div class="top-b"> 
                <p>{{ match.league }}</p>
                <f7-checkbox @change="favourData" :checked="match.favoriteStatus" :value="JSON.stringify(match)" class="like"></f7-checkbox>
              </div>
              <f7-link class="bottom-b">
                <f7-link class="link-head">
                  <div class="left-bot">
                    <div class="time-block">
                      <span>{{ match.time }}</span>
                      <span>{{ publishDate(match.date) }}</span>
                    </div>
                    <div class="team-block">
                      <span>{{ match.homeTeam }}</span>
                      <span>{{ match.awayTeam}}</span>
                    </div>
                  </div>
                </f7-link>
                <div class="right-bot">
                  <div class="point-block">
                    <span>{{ match.homeGoals }}</span>
                    <span>{{ match.awayGoals }}</span>
                  </div>
                  <f7-link class="navigate" @click="getHeadToHead(match.id)"><f7-icon ion="android-send" size="35px"></f7-icon></f7-link>
                </div>
              </f7-link>
            </f7-list-item>
          </f7-list>
        </f7-tab>
      </f7-tabs>            
  </f7-page>
</template>
<script>
import { getDataMatch, checkIfUpdate } from "../../js/function";
import { HTTP } from "../../js/http";
import moment from "moment";

export default {
  data() {
    return {
      storage: window.localStorage,
      matchs: [],
      favour: [],
      days: []
    };
  },
  created() {
    let dateStart = new Date();
    let todayDate = dateStart.getDate();

    for (var i = -3; i < 4; i++) {
      let obj = {};
      let dates = moment()
        .date(todayDate + i)
        .format("ddd, D");
      let arr = dates.split(",");

      obj.dayName = arr[0];
      arr[1].trim().length == 1
        ? (obj.dayNumb = "0" + arr[1].trim())
        : (obj.dayNumb = arr[1].trim());
      obj.status = false;

      if (todayDate == obj.dayNumb) obj.status = true;

      this.days.push(obj);
    }
  },
  mounted() {
    let lastUpdateMatchs = this.storage.getItem("lastUpdateMatchs");

    this.$f7.preloader.show();

    if (this.storage.getItem("favour")) {
      this.favour = JSON.parse(this.storage.getItem("favour"));
    }
    if (checkIfUpdate(lastUpdateMatchs)) {
      getDataMatch()
        .then(result => {
          this.matchs = result;
          this.storage.setItem("matchs", JSON.stringify(this.matchs));
          this.storage.setItem("lastUpdateMatchs", new Date());
          this.$f7.preloader.hide();
        })
        .catch(error => {
          this.matchs = JSON.parse(this.storage.getItem("matchs"));
          this.$f7.dialog.alert(error, "Error");
        });
    } else {
      this.matchs = JSON.parse(this.storage.getItem("matchs"));
      this.$f7.preloader.hide();
    }

    this.matchs.forEach((item, i) => {
      let favoriteStatus = false;

      this.favour.forEach((tip, i) => {
        if (item.id === tip.id) {
          favoriteStatus = true;
        }
      });
      item["favoriteStatus"] = favoriteStatus;
      this.matchs.push(item);
    });

  },
  methods: {
    getCurretMatch(day) {
      return this.matchs.filter(function(el) {
        return el.date_parts[2] == day ? el : false;
      });
    },
    favourData(event) {
      const value = JSON.parse(event.target.value);

      if (event.target.checked) {
        this.favour.push(value);
      } else {
        this.favour.forEach((item, i) => {
          if (item.id == value.id) {
            this.favour.splice(i, 1);
          }
        });
      }
      this.storage.setItem("favour", JSON.stringify(this.favour));
    },
    getHeadToHead(id) {
      this.$f7router.navigate("/score-info/" + id);
    },
    publishDate(value) {
      let tempDate = new Date(value);
      let date = tempDate.getDate().toString();
      let month = (tempDate.getMonth() + 1).toString();
      let year = tempDate.getFullYear().toString();

      date = date[1] ? date : "0" + date[0];
      month = month[1] ? month : "0" + month[0];
      year = year[2] + year[3];

      return date + "." + month + "." + year;
    }
  }
};
</script>

<style>
.md .icon-checkbox {
  display: inline-block;
  vertical-align: middle;
  width: 30px;
  height: 30px;
  background: url("../../../static/img/heart.png") no-repeat;
}
.md .checkbox i {
  border: none;
  width: 30px;
  height: 30px;
}
.md .checkbox i:after {
  background: none;
  width: 30px;
  height: 30px;
}
.md .checkbox input[type="checkbox"]:checked ~ i {
  display: inline-block;
  vertical-align: middle;
  width: 30px;
  height: 30px;
  background: url("../../../static/img/heart_ok.png") no-repeat;
}
.md .teams .team .item-inner .bottom-b .time-block span {
  width: 50px;
  font-size: 11px;
}
.md .list .is-gray {
  color: #786f72;
}
.md .list .is-purple {
  color: #6d2b8c;
}

.md .toolbar-top a.ic-home {
  padding-right: 0px;
}

.bg-tabs {
  background-color: #f7f7f7;
}
.md .teams {
  margin: 0px 0;
}
.teams .team .item-inner {
  display: flex;
  flex-direction: column;
  text-transform: uppercase;
  padding-bottom: 0px;
}
.teams .team .item-inner .top-b {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  background-color: #fff;
  box-shadow: 0px 2px 6px 0px rgba(77, 77, 77, 0.1);
  line-height: 1.3;
}
.teams .team .item-inner .top-b p {
  font-weight: 600;
  font-size: 12px;
  color: #000;
  padding-left: 15px;
}
.teams .team .item-inner .top-b .name-link {
  width: 100%;
  justify-content: flex-start;
  padding-left: 10px;
}
.teams .team .item-inner .top-b img {
  min-width: 70px;
  height: 46px;
}
.md .link span + span {
  margin-left: 0px;
}
.teams .team .item-inner .bottom-b {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  color: #000;
}
.teams .team .item-inner .bottom-b a {
  color: #000;
}
.like {
  margin-right: 10px;
}

.teams .team .item-inner .bottom-b span {
  font-size: 14px;
  font-weight: 600;
}
.left-bot {
  display: flex;
}
.right-bot {
  display: flex;
  align-items: center;
}
.time-block {
  display: flex;
  flex-direction: column;
  margin-right: 30px;
  line-height: 17px;
  align-self: center;
}
.team-block {
  display: flex;
  flex-direction: column;
  line-height: 17px;
  align-self: center;
}
.point-block {
  display: flex;
  flex-direction: column;
  margin-right: 50px;
  line-height: 17px;
  align-self: center;
}
.md .navigate .icon {
  color: #6d2b8c;
  margin-right: 10px;
}
.md .tabs-swipeable-wrap > .tabs > .tab {
  overflow: auto;
}
</style>