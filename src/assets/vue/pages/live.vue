<template>
  <f7-page class="live-page">
    <f7-navbar class="navbar-top" back-link="Back">
      <div class="titles">
          <f7-nav-title class="head-title" title="Score">Soccer</f7-nav-title>
          <f7-nav-title class="subtitle">Live</f7-nav-title>
      </div>
      <f7-nav-right>
        </f7-nav-right>
    </f7-navbar> 
    <f7-list class="teams .bg-list">
      <f7-list-item v-for="(match, index) in matchs" :key="match.id" class="team">
              <div class="top-b"> 
                <img src="../../../static/img/flag.png" alt="">
                <p>{{ match.league }}</p>
                <f7-checkbox @change="favourData" :checked="match.favoriteStatus" :value="JSON.stringify(match)" class="like"></f7-checkbox>
              </div>
              <f7-link class="bottom-b">
                <f7-link class="link-head" @click="getHeadToHead(index)">
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
                  <f7-link  class="navigate"><f7-icon ion="android-send" size="35px"></f7-icon></f7-link>
                </div>
              </f7-link>
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
      matchs: [],
      favour: []
    };
  },
  mounted() {
    if (this.storage.getItem("favour")) {
      this.favour = JSON.parse(this.storage.getItem("favour"));
    }
    this.$f7.preloader.show();
    HTTP.get("getLiveScore")
      .then(response => {
        let data = response.data.match;
        if (data.length > 1) {
          this.matchs = data;
        } else {
          this.matchs = [data];
        }
        this.$f7.preloader.hide();
      })
      .catch(function(error) {
        this.matchs = "Error";
        this.$f7.preloader.hide();
      });
  },
  methods: {
    getHeadToHead(id) {
      let match = this.matchs[id];
      this.$f7router.navigate("/headtohead/" + id, {
        context: { match: match }
      });
    },
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

.md .head-title {
  color: #fdf018;
}
.md .live-page {
  background-color: #f7f7f7;
}
.md .live-page .team {
  margin: 0px;
}
.md .live-page .team .live-link {
  width: 100%;
}
.live-page .search-block {
  background: linear-gradient(
    to right,
    rgba(105, 41, 135, 1) 0%,
    rgba(202, 116, 213, 1) 100%
  );
  margin: 0px;
  padding: 10px 16px;
}
.live-page .search-block .searchbar {
  margin: 0px;
  height: 40px;
  background: linear-gradient(
    to right,
    rgba(110, 44, 144, 1) 0%,
    rgba(144, 56, 194, 1) 100%
  );
  border: 1px solid #66069ca6;
}
.live-page .search-block .searchbar input {
  padding: 0px;
  text-align: center;
  color: #fff;
}

.live-page .search-block .searchbar input::placeholder {
  color: #fff;
}
.live-page .navbar-top:after {
  display: none;
}
</style>
