<template>
  <f7-page class="head-page">
    <f7-navbar class="navbar-top" back-link="Back">
      <div class="titles">
        <f7-nav-title class="head-title" title="Score">Scores Update</f7-nav-title>
        <f7-nav-title class="subtitle">Info</f7-nav-title>
      </div>
      <f7-nav-right>
        <f7-link href="#" class="like"><f7-icon class="is-gray" ion="heart" size="35px"></f7-icon></f7-link>
      </f7-nav-right>
    </f7-navbar> 
    <f7-block class="head-live">
      <div class="head-live-left"> 
        <div class="time-block">
          <span>{{ match.time }}</span>
        </div>
        <div class="name-block">
          <h5>{{ match.league }}</h5>
          <p>{{ match.homeTeam }}</p>
          <p>{{ match.awayTeam }}</p>
        </div>
      </div> 
      <div class="head-live-right"> 
        {{ showDate(match.date) }}
      </div> 
    </f7-block>
    <f7-list class="inf-list">
      <f7-list-item>
        <f7-list-item-cell>
          <f7-list-item-row>
          <f7-list-item-cell class="inf-team">{{ match.homeTeam }}</f7-list-item-cell>
          <f7-list-item-cell class="inf-team">{{ match.awayTeam }}</f7-list-item-cell>
        </f7-list-item-row>
        <f7-list-item-row>
          <f7-list-item-cell v-if="match.homeGoals || match.awayGoals" class="inf-title">Goals</f7-list-item-cell>
        </f7-list-item-row>
        <f7-list-item-row>
          <f7-list-item-cell>{{ match.homeGoals }}</f7-list-item-cell>
          <f7-list-item-cell>{{ match.awayGoals }}</f7-list-item-cell>
        </f7-list-item-row>
        <f7-list-item-row>
          <f7-list-item-cell v-if="match.homeGoalDetails || match.awayGoalDetails" class="inf-title">Goals</f7-list-item-cell>
        </f7-list-item-row>
        <f7-list-item-row>
          <f7-list-item-cell>{{ match.homeGoalDetails }}</f7-list-item-cell>
          <f7-list-item-cell>{{ match.awayGoalDetails }}</f7-list-item-cell>
        </f7-list-item-row>
        <f7-list-item-row>
          <f7-list-item-cell v-if="match.homeTeamFormation || match.awayTeamFormation" class="inf-title">Team Formation</f7-list-item-cell>
        </f7-list-item-row>
        <f7-list-item-row>
          <f7-list-item-cell>{{ match.homeTeamFormation }}</f7-list-item-cell>
          <f7-list-item-cell>{{ match.awayTeamFormation }}</f7-list-item-cell>
        </f7-list-item-row>
        <f7-list-item-row>
          <f7-list-item-cell v-if="match.homeTeamYellowCardDetails || match.awayTeamYellowCardDetails" class="inf-title">Yellow Cards</f7-list-item-cell>
        </f7-list-item-row>
        <f7-list-item-row>
          <f7-list-item-cell>{{ match.homeTeamYellowCardDetails }}</f7-list-item-cell>
          <f7-list-item-cell>{{ match.awayTeamYellowCardDetails }}</f7-list-item-cell>
        </f7-list-item-row>
        <f7-list-item-row>
          <f7-list-item-cell v-if="match.homeTeamRedCardDetails || match.awayTeamRedCardDetails" class="inf-title">Red Cards</f7-list-item-cell>
        </f7-list-item-row>
        <f7-list-item-row>
          <f7-list-item-cell>{{ match.homeTeamRedCardDetails }}</f7-list-item-cell>
          <f7-list-item-cell>{{ match.awayTeamRedCardDetails }}</f7-list-item-cell>
        </f7-list-item-row>
        <f7-list-item-row>
          <f7-list-item-cell v-if="match.stadium" class="inf-title">Stadium</f7-list-item-cell>
        </f7-list-item-row>
        <f7-list-item-row>
          <f7-list-item-cell>{{ match.stadium }}</f7-list-item-cell>
        </f7-list-item-row>
        </f7-list-item-cell>
      </f7-list-item>
      <f7-list-item></f7-list-item>
    </f7-list>
  </f7-page>
</template>

<script>
import { HTTP } from "../../js/http";
export default {
  data() {
    return {
      storage: window.localStorage,
      match: [],
      favour: []
    };
  },
  mounted() {
    let matchId = this.$f7route.params.id;

    this.$f7.preloader.show();
    HTTP.get("getFixturesMatchs")
      .then(response => {
        let data = response.data.match;
        data.forEach(item => {
          if (item.id == matchId) {
            this.match = item;
          }
        });
        this.$f7.preloader.hide();
      })
      .catch(function(error) {
        this.$f7.preloader.hide();
      });
  },
  methods: {
    devideElem(elem) {
      let data = [];

      if (elem) {
        data = elem.split(";");
        data.forEach(element => {
          return element;
        });
      }
    },
    showDate(value) {
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
.md .inf-list {
  margin: 0px;
}
.md .inf-team {
  text-align: center;
  padding: 5px 10px;
  font-weight: 600;
  font-size: 16px;
}
.md .inf-title {
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
