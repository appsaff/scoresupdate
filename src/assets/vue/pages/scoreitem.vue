<template>
  <f7-page class="scoreit-page">
    <f7-navbar class="navbar-top" back-link="Back">
      <div class="titles">
          <f7-nav-title class="head-title" title="Score">Soccer</f7-nav-title>
          <f7-nav-title class="subtitle">Score</f7-nav-title>
      </div>
      <f7-nav-right>
        </f7-nav-right>
    </f7-navbar> 
    <f7-block class="search-block">
    <f7-searchbar
      placeholder="Search Results"
      search-container="#search-list"
      search-item="li"
      search-in=".team-block span"
    ></f7-searchbar> 
    </f7-block>
    <f7-block class="team">
      <div class="top-b"> 
          <img src="../../../static/img/flag.png" alt="">
          <p>{{ caption }}</p>
          <f7-link href="#" class="like"></f7-link>
        </div> 
    </f7-block>
    <f7-list id="search-list" class="teams .bg-list">
        <f7-list-item v-for="(fixture, index) in fixtures" :key="index" class="team">
        <div class="bottom-b">
                <f7-link class="link-head" @click="getHeadToHead(fixture._links.self.href)">
                <div class="left-bot">
                  <div class="time-block">
                    <span>{{ fixture.status }}</span>
                  </div>
                  <div class="team-block">
                    <span>{{ fixture.homeTeamName }}</span>
                    <span>{{ fixture.awayTeamName }}</span>
                  </div>
                </div>
                </f7-link>
                <div class="right-bot">
                  <div class="point-block">
                    <span>{{ fixture.result.goalsHomeTeam }}</span>
                    <span>{{ fixture.result.goalsAwayTeam }}</span>
                  </div>
                  <f7-link href="#" v-on:click="favourite(index)" class="like"><f7-icon class="is-gray" :class="{'is-gray': isLoading, 'is-purple': !isLoading }"  ion="heart" size="35px"></f7-icon></f7-link>
                </div>
              </div> 
        </f7-list-item>
    </f7-list>
  </f7-page>
</template>

<script>
import { HTTP } from "../../js/http";
export default {
  data() {
    return {
      storage: window.localStorage,
      caption: '',
      isLoading: true,
      fixtures: []
    };
  },
  mounted() {
    let leagueId = this.$f7route.params.id;
    this.caption = this.$f7route.context.caption;
    HTTP.get("competitions/" + leagueId + "/fixtures")
      .then(response => {
        this.fixtures = response.data.fixtures;
      })
      .catch(function(error) {
        this.fixtures = "Data is not avaliable";
      });
  },
  methods: {
    getHeadToHead(link) {
      let id = link.match(/[0-9]\d+/);
      this.$f7router.navigate("/headtohead/" + id, { context: { caption: this.caption } });
      //  Child sent context
      // this.$f7router.navigate("/headtohead/" , { context: { id: id } });
    },
    favourite(index) {
      let favourite = [];
      favourite.push(this.fixtures[index]);
      this.storage.setItem("favour", JSON.stringify(favourite));
      this.isLoading = !this.isLoading;
    } 
  }
};
</script>
<style>
.md .left-bot{
  width: 100%;
}
.md .scoreit-page .link-head {
  width: 100%;
  color: #000;
}
.md .scoreit-page .link span + span {
  margin-left: 0px;
}
.md .searchbar-icon {
  background-image: url("../../../static/img/search.png");
  background-size: 20px 20px;
}
.md .searchbar-disable-button {
  background-image: url("../../../static/img/arrow.png");
  background-size: 20px 16px;
}
.md .searchbar .input-clear-button {
  background-image: url("../../../static/img/close.png");
  background-size: 18px 18px;
}
.md .is-gray {
  color: #786f72;
}
.md .head-title {
  color: #fdf018;
}
.md .scoreit-page {
  background-color: #f7f7f7;
}
.scoreit-page .search-block {
  background: linear-gradient(
    to right,
    rgba(105, 41, 135, 1) 0%,
    rgba(202, 116, 213, 1) 100%
  );
  margin: 0px;
  padding: 10px 16px;
}
.scoreit-page .search-block .searchbar {
  margin: 0px;
  height: 40px;
  background: linear-gradient(
    to right,
    rgba(110, 44, 144, 1) 0%,
    rgba(144, 56, 194, 1) 100%
  );
  border: 1px solid #66069ca6;
}
.scoreit-page .search-block .searchbar input {
  padding: 0px;
  text-align: center;
  color: #fff;
}

.scoreit-page .search-block .searchbar input::placeholder {
  color: #fff;
}

.scoreit-page .navbar-top:after {
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
.team .top-b p {
  font-weight: 600;
  font-size: 14px;
}
.team .top-b img {
  width: 73px;
}
.md .scoreit-page .teams .team {
  margin: 0px;
}
.md .scoreit-page .teams .team .item-inner {
  padding-top: 0px;
}
.md .scoreit-page .team .bottom-b:after {
  content: "";
  position: absolute;
  border-bottom: 1px solid #000;
  width: 100%;
  bottom: 0;
}
</style>
