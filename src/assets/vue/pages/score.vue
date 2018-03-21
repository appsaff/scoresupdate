<template>
  <f7-page>
      <f7-navbar class="navbar-top">
        <f7-nav-left>
          <f7-link panel-open="left"><f7-icon ion="navicon" size="44px"></f7-icon></f7-link>
        </f7-nav-left>
        <div class="titles">
          <f7-nav-title subtitle="Score">Soccer</f7-nav-title>
          <f7-nav-title class="subtitle">Score</f7-nav-title>
        </div>
        <f7-nav-right>
        </f7-nav-right>
      </f7-navbar>
      <f7-subnavbar class="toolbar-top">
        <f7-link class="ic-home"><f7-icon ion="android-home" size="40px"></f7-icon></f7-link>
        <f7-toolbar  tabbar class="tabbar-top">
          <f7-link v-for="day in days" :key="day.id"  tab-link="#tabc1" tab-link-active>{{ day }}</f7-link>
        </f7-toolbar>
      </f7-subnavbar>
      <f7-tabs swipeable class="bg-tabs">
        <f7-tab id="tabc1" tab-active>
          <f7-list class="teams">
            <f7-list-item v-for="(match, index) in matchs" :key="index" class="team">
              <div class="top-b"> 
                <img src="../../../static/img/flag.png" alt="">
                <p>{{ match.league }}</p>
                <f7-checkbox @change="favourData" :checked="match.favoriteStatus" :value="JSON.stringify(match)" class="like"></f7-checkbox>
              </div>
              <f7-link class="bottom-b">
                <f7-link class="link-head" @click="getHeadToHead(match._links.self.href)">
                <div class="left-bot">
                  <div class="time-block">
                    <span>{{ match.time }}</span>
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
                  <f7-link href="/headtohead/" class="navigate"><f7-icon ion="android-send" size="35px"></f7-icon></f7-link>
                </div>
              </f7-link>
            </f7-list-item>
            <f7-list-item>
              
            </f7-list-item>
          </f7-list>
        </f7-tab>
        <f7-tab id="tabc2">Tab 2 content...</f7-tab>
      </f7-tabs>
            
  </f7-page>
</template>
<script>
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
   
    for ( var i = -3; i<4; i++){
      let dateStart = new Date();
      let tempDate = moment(dateStart.setDate(dateStart.getDate() + i)).format("ddd, D");  
      this.days.push(tempDate);
      console.log(this.days);
    }
  },

  mounted() {
    if (this.storage.getItem("favour")) {
      this.favour = JSON.parse(this.storage.getItem("favour"));
    }
    this.$f7.preloader.show();
    HTTP.get("getFixturesByDateInterval")
      .then(response => {
        this.matchs = response.data.match;
        let self = this;
        this.matchs.forEach(function(item, i) {
          let favoriteStatus = false;
          self.favour.forEach(function(tip, i) {
            if (item.id === tip.id) {
              favoriteStatus = true;
            }
          });
          item["favoriteStatus"] = favoriteStatus;
          self.matchs.push(item);
        });
        this.$f7.preloader.hide();
      })
      .catch(function(error) {
        this.matchs = "Data is not avaliable";
        this.$f7.preloader.hide();
      });
    // get current date
    // this.today = new Date();
    // var dd = this.today.getDate();
    // var mm = this.today.getMonth()+1; //January is 0!

    // var yyyy = this.today.getFullYear();
    // if(dd<10){
    //     dd='0'+dd;
    // }
    // if(mm<10){
    //     mm='0'+mm;
    // }
    // this.today = dd;
    // console.log(today)
    // get current date
  },
  methods: {
    favourData(event) {
      let self = this;
      const value = JSON.parse(event.target.value);
      if (event.target.checked) {
        this.favour.push(value);
      } else {
        this.favour.forEach(function(item, i) {
          if (item.id == value.id) {
            self.favour.splice(i, 1);
          }
        });
      }
      this.storage.setItem("favour", JSON.stringify(this.favour));
    }
    // getHeadToHead(link) {
    //   let id = link.match(/[0-9]\d+/);
    //   this.$f7router.navigate("/headtohead/" + id, {
    //     context: { caption: this.caption }
    //   });
    // }
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
}
.teams .team .item-inner .top-b .name-link {
  width: 100%;
  justify-content: flex-start;
  padding-left: 10px;
}
.teams .team .item-inner .top-b img {
  width: 70px;
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
</style>