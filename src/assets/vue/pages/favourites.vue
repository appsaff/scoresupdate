<template>
  <f7-page class="favour-page">
    <f7-navbar class="navbar-top" back-link="Back">
      <div class="titles">
          <f7-nav-title class="head-title" title="Score">Soccer</f7-nav-title>
          <f7-nav-title class="subtitle">Favourites</f7-nav-title>
      </div>
      <f7-nav-right>
        </f7-nav-right>
    </f7-navbar>
    <f7-toolbar tabbar class="tabbar-favor">
          <f7-link tab-link="#tabf1" tab-link-active><span><f7-icon ion="ios-bookmarks" size="30px"></f7-icon></span>Matches</f7-link>
          <f7-link tab-link="#tabf2"><span><f7-icon ion="android-contacts" size="30px"></f7-icon></span>Leagues</f7-link>
    </f7-toolbar>
    <f7-tabs swipeable class="bg-tabs">
        <f7-tab id="tabf1" tab-active>
          <f7-list id="search-list" class="teams .bg-list">
            <f7-list-item v-for="(fav, index) in favour" :key="index" class="team">
            <div class="bottom-b">
                    <f7-link class="link-head" @click="getHeadToHead(fixture._links.self.href)">
                    <div class="left-bot">
                      <div class="time-block">
                        <span>{{ fav.status }}</span>
                      </div>
                      <div class="team-block">
                        <span>{{ fav.homeTeamName }}</span>
                        <span>{{ fav.awayTeamName }}</span>
                      </div>
                    </div>
                    </f7-link>
                    <div class="right-bot">
                      <div class="point-block">
                        <span>{{ fav.result.goalsHomeTeam }}</span>
                        <span>{{ fav.result.goalsAwayTeam }}</span>
                      </div>
                      <f7-checkbox @change="removeItem(index)" :checked="true" :value="JSON.stringify(fav)" class="like"></f7-checkbox>
                    </div>
                  </div> 
            </f7-list-item>
        </f7-list>
        </f7-tab>
        <f7-tab id="tabf2">Tab 2 content...</f7-tab>
      </f7-tabs>
  </f7-page>
</template>

<script>
export default {
  data() {
    return {
      storage: window.localStorage,
      isLoading: true,
      favour: []
    };
  },
  mounted() {
    if (this.storage.getItem("favour")) {
      this.favour = JSON.parse(this.storage.getItem("favour"));
    }
  },
  methods: {
    removeItem(index) {
      let storagefavorites = JSON.parse(this.storage.getItem("favour"));

      storagefavorites.forEach(function(item, i) {
        if (i == index) {
          storagefavorites.splice(i, 1);
        }
      });
      this.storage.setItem("favour", JSON.stringify(storagefavorites));
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
.md .favour-page .bottom-b {
  position: relative;
}
.md .favour-page .bottom-b a {
  color: #000;
}
.md .favour-page .team .bottom-b:after {
  content: "";
  position: absolute;
  border-bottom: 1px solid #000;
  width: 100%;
  bottom: -5px;
}
.md .head-title {
  color: #fdf018;
}
.md .favour-page .tabbar-favor {
  background: rgba(202, 116, 213, 1);
}
.md .favour-page .tabbar-favor a.link {
  line-height: 12px;
  min-width: 44px;
  text-transform: none;
  font-size: 16px;
}
.tabbar-favor i::before {
  line-height: 0.6;
}
.md .favour-page .tabbar .tab-link-highlight {
  background-color: #6d2b8c;
}
</style>
