<template>
  <f7-page class="head-page">
    <f7-navbar class="navbar-top" back-link="Back">
      <div class="titles">
          <f7-nav-title class="head-title" title="Score">Soccer</f7-nav-title>
          <f7-nav-title class="subtitle">Head to Head</f7-nav-title>
      </div>
      <f7-nav-right>
        <f7-link href="#" class="like"><f7-icon class="is-gray" ion="heart" size="35px"></f7-icon></f7-link>
        </f7-nav-right>
    </f7-navbar> 
    <f7-block class="head-live">
      <div class="head-live-left"> 
        <div class="time-block">
          <img src="../../../static/img/flag.png" alt="">
          <span>{{ matchs.time }}</span>
        </div>
        <div class="name-block">
          <h5>{{ matchs.league }}</h5>
          <p>{{ matchs.homeTeam }}</p>
          <p>{{ matchs.awayTeam }}</p>
        </div>
      </div> 
      <div class="head-live-right"> 
        {{ showDate(matchs.date) }}
      </div> 
    </f7-block>
    <div class="container">
    <f7-toolbar tabbar class="tabbar-head">
          <f7-link tab-link="#tabh1" tab-link-active><span><f7-icon ion="ios-bookmarks" size="30px"></f7-icon></span>Info</f7-link>
          <f7-link tab-link="#tabh2"><span><f7-icon ion="android-contacts" size="30px"></f7-icon></span>H2H</f7-link>
    </f7-toolbar>
    </div>
    <f7-tabs swipeable class="bg-tabs">
        <f7-tab id="tabh1" tab-active>
          <f7-list class="inf-list">
            <f7-list-item>
              <f7-list-item-cell>
                <f7-list-item-row>
                <f7-list-item-cell class="inf-team">{{ matchs.homeTeam }}</f7-list-item-cell>
                <f7-list-item-cell class="inf-team">{{ matchs.awayTeam }}</f7-list-item-cell>
              </f7-list-item-row>
              <f7-list-item-row>
                <f7-list-item-cell class="inf-title">Goals</f7-list-item-cell>
              </f7-list-item-row>
              <f7-list-item-row>
                <f7-list-item-cell>{{ matchs.homeGoalDetails }}</f7-list-item-cell>
                <f7-list-item-cell>{{ matchs.awayGoalDetails }}</f7-list-item-cell>
              </f7-list-item-row>
              <f7-list-item-row>
                <f7-list-item-cell class="inf-title">Team Formation</f7-list-item-cell>
              </f7-list-item-row>
              <f7-list-item-row>
                <f7-list-item-cell>{{ matchs.homeTeamFormation }}</f7-list-item-cell>
                <f7-list-item-cell>{{ matchs.awayTeamFormation }}</f7-list-item-cell>
              </f7-list-item-row>
              <f7-list-item-row>
                <f7-list-item-cell class="inf-title">Yellow Cards</f7-list-item-cell>
              </f7-list-item-row>
              <f7-list-item-row>
                <f7-list-item-cell>{{ matchs.homeTeamYellowCardDetails }}</f7-list-item-cell>
                <f7-list-item-cell>{{ matchs.awayTeamYellowCardDetails }}</f7-list-item-cell>
              </f7-list-item-row>
              <f7-list-item-row>
                <f7-list-item-cell class="inf-title">Stadium</f7-list-item-cell>
              </f7-list-item-row>
              <f7-list-item-row>
                <f7-list-item-cell>{{ matchs.stadium }}</f7-list-item-cell>
              </f7-list-item-row>
              </f7-list-item-cell>
            </f7-list-item>
            <f7-list-item></f7-list-item>
          </f7-list>
        </f7-tab>
        <f7-tab id="tabh2">
          <!-- <f7-toolbar  tabbar class="tabbar-head-second">
              <f7-link tab-link="#tabhh1" tab-link-active><span></span>{{ fixture.homeTeamName }}</f7-link>
              <f7-link tab-link="#tabhh2">HEAD TO HEAD</f7-link>
              <f7-link tab-link="#tabhh3">{{ fixture.awayTeamName }}</f7-link>
          </f7-toolbar>
          <f7-tabs swipeable class="bg-tabs">
            <f7-tab id="tabhh1" tab-active>
              <f7-list  class="teams .bg-list">
                  <f7-list-item v-for="(home, key) in homeTeamsGames.fixtures" :key="key" class="team"> 
                  <div class="bottom-b">
                          <div class="left-bot">
                            <div class="time-block">
                              <span>{{ home.status }}</span>
                              <span class="head-date">{{ showDate(home.date) }}</span>
                            </div>
                            <div class="team-block"> 
                              <span>{{ home.homeTeamName }}</span>
                              <span>{{ home.awayTeamName }}</span>
                            </div>
                          </div>
                          <div class="right-bot">
                            <div class="point-block">
                              <span>{{ home.result.goalsHomeTeam }}</span>
                              <span>{{ home.result.goalsAwayTeam }}</span>
                            </div>
                          </div>
                        </div> 
                  </f7-list-item>
              </f7-list>
            </f7-tab> 
            <f7-tab id="tabhh2">
              <f7-block class="team">
                <div class="top-b"> 
                    <img src="../../../static/img/flag.png" alt="">
                    <p>{{ caption }}</p>
                    <f7-link href="" class="like"></f7-link>
                  </div> 
              </f7-block>
              <f7-list  class="teams .bg-list">
                  <f7-list-item v-for="(head2, key) in head2head.fixtures" :key="key" class="team"> 
                  <div class="bottom-b">
                          <div class="left-bot">
                            <div class="time-block">
                              <span>{{ head2.status }}</span>
                              <span class="head-date">{{ showDate(head2.date) }}</span>
                            </div>
                            <div class="team-block"> 
                              <span>{{ head2.homeTeamName }}</span>
                              <span>{{ head2.awayTeamName }}</span>
                            </div>
                          </div>
                          <div class="right-bot">
                            <div class="point-block">
                              <span>{{ head2.result.goalsHomeTeam }}</span>
                              <span>{{ head2.result.goalsAwayTeam }}</span>
                            </div>
                          </div>
                        </div> 
                  </f7-list-item>
              </f7-list>        
            </f7-tab>
            <f7-tab id="tabhh3">
              <f7-list  class="teams .bg-list">
                  <f7-list-item v-for="(away, key) in awayTeamsGames.fixtures" :key="key" class="team"> 
                  <div class="bottom-b">
                          <div class="left-bot">
                            <div class="time-block">
                              <span>{{ away.status }}</span>
                              <span class="head-date">{{ showDate(away.date) }}</span>
                            </div>
                            <div class="team-block"> 
                              <span>{{ away.homeTeamName }}</span>
                              <span>{{ away.awayTeamName }}</span>
                            </div>
                          </div>
                          <div class="right-bot">
                            <div class="point-block">
                              <span>{{ away.result.goalsHomeTeam }}</span>
                              <span>{{ away.result.goalsAwayTeam }}</span>
                            </div>
                          </div>
                        </div> 
                  </f7-list-item>
              </f7-list>
            </f7-tab>
          </f7-tabs>  -->
        </f7-tab>
      </f7-tabs>
  </f7-page>
</template>

<script>
import { HTTP } from "../../js/http";
export default {
  data() {
    return {
      storage: window.localStorage,
      matchs: [],
      favour: []
    };
  },
  mounted() {
    this.matchs = this.$f7route.context.match;
  },
  methods: {
    devideElem(elem){
      let data = [];
      if(elem) {
        data = elem.split(";");
        data.forEach(element => {
          console.log(element)
          return element;
        });
      } 
      //console.log(data)
    },
    showDate(date) {
      let tempDate = new Date(date);

      var date = tempDate.getDate().toString();
      var month = (tempDate.getMonth() + 1).toString();
      var year = tempDate.getFullYear().toString();

      date = date[1] ? date : "0" + date[0];
      month = month[1] ? month : "0" + month[0];
      year = year[2] + year[3];

      return date + "." + month + "." + year;
    }
  }
};
</script>
<style>
.md .inf-list{
  margin: 0px;
}
.md .inf-team{
  text-align: center;
  padding: 5px 10px;
  font-weight: 600;
  font-size: 16px;
}
.md .inf-title{
  padding: 5px 10px;
  font-weight: 600;
  font-size: 14px;
  background-color: rgba(127, 48, 140, 0.18);
}
.teams .team .item-inner .bottom-b .head-date {
  font-size: 12px;
}
.md .head-page .bottom-b {
  padding-bottom: 7px;
}
.md .head-page .point-block {
  margin-right: 0px;
}
.md .is-gray {
  color: #786f72;
}
.md .head-live {
  display: flex;
  margin: 0px;
  background-color: #973ece;
}
.md .head-live-left {
  justify-content: flex-start;
  display: flex;
  width: 80%;
}
.md .head-live-left .name-block p {
  margin: 0px;
  line-height: 17px;
  color: #fff;
  font-weight: 400;
  font-size: 14px;
}
.md .head-live-left .name-block h5 {
  margin: 0px;
  color: #fff;
  font-weight: 200;
}
.md .head-live-left .time-block img {
  width: 40px;
}
.md .head-live-left .time-block span {
  color: #fff;
  font-size: 10px;
}
.md .head-live-right {
  text-align: right;
  width: 20%;
  color: #fff;
  font-weight: 400;
  font-size: 10px;
}
.md .head-title {
  color: #fdf018;
}
.md .head-page .tabbar-head-second {
  background-color: #973ece;
  border-bottom: 3px solid rgba(202, 116, 213, 1);
}
.md .tabbar-head-second .tab-link-highlight {
  background: none;
}
.md .head-page .tabbar-head-second a.link {
  line-height: 12px;
  min-width: 44px;
  text-transform: none;
}
.md .head-page .tabbar-head-second a.tab-link-active {
  background: rgba(202, 116, 213, 1);
}
.md .head-page .toolbar:after {
  display: none;
}
.md .head-page .navbar-top .right {
  width: 56px;
}
.md .head-page .navbar-top .titles {
  margin-right: 0px;
}
.md .head-page .tabbar-head {
  background: rgba(202, 116, 213, 1);
}
.md .head-page .tabbar-head a.link {
  line-height: 12px;
  min-width: 44px;
  text-transform: none;
}
.md .head-page {
  background-color: #f7f7f7;
}
.head-page .search-block {
  background: linear-gradient(
    to right,
    rgba(105, 41, 135, 1) 0%,
    rgba(202, 116, 213, 1) 100%
  );
  margin: 0px;
  padding: 10px 16px;
}
.head-page .search-block .searchbar {
  margin: 0px;
  height: 40px;
  background: linear-gradient(
    to right,
    rgba(110, 44, 144, 1) 0%,
    rgba(144, 56, 194, 1) 100%
  );
  border: 1px solid #66069ca6;
}
.head-page .search-block .searchbar input {
  padding: 0px;
  text-align: center;
  color: #fff;
}

.head-page .search-block .searchbar input::placeholder {
  color: #fff;
}
.md .head-page .search-block .searchbar .searchbar-disable-button {
  left: 80px;
}
.md .head-page .search-block .searchbar .searchbar-input-wrap .searchbar-icon {
  left: 80px;
}
.head-page .navbar-top:after {
  display: none;
}
.md .team {
  margin: 10px 0;
}
.team .top-b {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  background-color: #fff;
  box-shadow: 0px 2px 6px 0px rgba(77, 77, 77, 0.1);
  line-height: 1.3;
}
.team .bottom-b {
  position: relative;
}
.md .head-page .team .bottom-b:after {
  content: "";
  position: absolute;
  border-bottom: 1px solid #000;
  width: 100%;
  bottom: 0;
}
.team .top-b p {
  font-weight: 600;
  font-size: 12px;
  text-transform: uppercase;
}
.team .top-b img {
  width: 73px;
}
.tabbar-head i::before {
  line-height: 0.6;
}
.md .head-page .teams .team {
  margin: 0px;
}
.md .head-page .teams .team .item-inner {
  padding-top: 10px;
}
</style>
