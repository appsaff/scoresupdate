<template>
  <f7-page class="menu-page">
    <f7-navbar class="navbar-top" back-link="Back">
      <div class="titles">
        <f7-nav-title class="head-title" title="Score">Scores Update</f7-nav-title>
        <f7-nav-title class="subtitle">Menu</f7-nav-title>
      </div>
      <f7-nav-right>
      </f7-nav-right>
    <f7-subnavbar>
      <f7-block class="search-block">
        <f7-searchbar
          placeholder="Search Results"
          search-container="#search-list"
          search-item="li"
          search-in="p"
        ></f7-searchbar> 
      </f7-block>
    </f7-subnavbar>
    </f7-navbar> 
    <f7-list id="search-list" class="teams .bg-list">
      <f7-list-item  v-for="league in leagues" :key="league.id" class="team">
        <f7-link @click="getLeague(league.id ,league.name, league.country)" class="menu-link">
        <div  class="top-b"> 
          <img :src='"static/img/flags/" + league.country + ".png"'>
          <span class="name-link" ><p>{{ league.name }}</p></span>
          <span class="navigate"><f7-icon ion="android-send" size="35px"></f7-icon></span>
        </div> 
        </f7-link>
        </f7-list-item>
    </f7-list>
  </f7-page>
</template>

<script>
  import { getDataLeague, checkIfUpdate } from "../../js/function";

  export default {
    data() {
      return {
        storage: window.localStorage,
        leagues: []
      };
    },
    mounted() {
      let lastUpdateLeagues = this.storage.getItem("lastUpdateLeagues");

      this.$f7.preloader.show();

      if (checkIfUpdate(lastUpdateLeagues)) {
        getDataLeague()
          .then(result => {
            this.leagues = result;
            this.storage.setItem("leagues", JSON.stringify(this.leagues));
            this.storage.setItem("lastUpdateLeagues", new Date());
            this.$f7.preloader.hide();
          })
          .catch(error => {
            this.leagues = JSON.parse(this.storage.getItem("leagues"));
            this.$f7.dialog.alert(error, "Error");
          });
      } else {
        this.leagues = JSON.parse(this.storage.getItem("leagues"));
        this.$f7.preloader.hide();
      }
    },
    methods: {
      getLeague(id, name, countryName) {
        this.$f7router.navigate("/scoreitem/" + id, {
          context: { name: name, countryName: countryName }
        });
      }
    }
  };
</script>

<style>
  .md .menu-page .subnavbar-inner {
    padding: 0;
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

  .md .searchbar input::-webkit-input-placeholder {
    font-family: "robotolight";
    font-size: 18px;
    font-weight: 100;
  }

  .md .head-title {
    color: #fdf018;
  }

  .md .menu-page {
    background-color: #f7f7f7;
  }

  .md .menu-page .team {
    margin: 0px;
  }

  .md .menu-page .team .menu-link {
    width: 100%;
  }

  .menu-page .search-block {
    background: linear-gradient(
      to right,
      rgba(105, 41, 135, 1) 0%,
      rgba(202, 116, 213, 1) 100%
    );
    margin: 0px;
    padding: 10px 16px;
    width: 100%;
  }

  .menu-page .search-block .searchbar {
    margin: 0px;
    height: 40px;
    background: linear-gradient(
      to right,
      rgba(110, 44, 144, 1) 0%,
      rgba(144, 56, 194, 1) 100%
    );
    border: 1px solid #66069ca6;
  }

  .menu-page .search-block .searchbar input {
    padding: 0px;
    padding-left: 0px!important;
    text-align: center;
    color: #fff;
  }

  .menu-page .search-block .searchbar input::placeholder {
    color: #fff;
  }

  .menu-page .navbar-top:after {
    display: none;
  }
</style>
