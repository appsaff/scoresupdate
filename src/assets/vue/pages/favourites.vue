<template>
  <f7-page class="favour-page">
    <f7-navbar class="navbar-top" back-link="Back">
      <div class="titles">
        <f7-nav-title class="head-title" title="Score">Scores Update</f7-nav-title>
        <f7-nav-title class="subtitle">Favourites</f7-nav-title>
      </div>
      <f7-nav-right>
      </f7-nav-right>
    </f7-navbar>
    <f7-list id="search-list" class="teams .bg-list">
      <f7-list-item v-for="(fav, index) in favour" :key="index" class="team">
        <div class="bottom-b">
          <f7-link class="link-head" @click="getHeadToHead(index)">
            <div class="left-bot">
              <div class="time-block">
                <span>{{ fav.time }}</span>
              </div>
              <div class="team-block">
                <span>{{ fav.homeTeam }}</span>
                <span>{{ fav.awayTeam }}</span>
              </div>
            </div>
          </f7-link>
          <div class="right-bot">
            <div class="point-block">
              <span>{{ fav.homeGoals }}</span>
              <span>{{ fav.awayGoals }}</span>
            </div>
            <f7-checkbox @change="removeItem(index)" :checked="true" :value="JSON.stringify(fav)" class="like"></f7-checkbox>
          </div>
        </div> 
      </f7-list-item>
    </f7-list>
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
      },
      getHeadToHead(id) {
        let match = this.favour[id];
        this.$f7router.navigate("/match-info/" + id, {
          context: { match: match }
        });
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