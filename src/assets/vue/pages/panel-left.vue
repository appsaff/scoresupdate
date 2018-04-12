<template>
  <f7-page class="left-pannel" name="left-panel">
    <f7-block-title>SETTINGS</f7-block-title>
    <f7-list>
      <f7-list-item title="Automatic refresh"><f7-toggle id="autorefresh" @change="autorefresh" :checked="settings.autorefresh" color="black"></f7-toggle></f7-list-item>
      <f7-list-item title="Vibration"><f7-toggle id="vibration" @change="vibration" :checked="settings.vibration" color="black"></f7-toggle></f7-list-item>
    </f7-list>
    <f7-button @click="clearCache()" round-md>Clear cache</f7-button>
    <f7-button @click="updateData()" round-md>Refresh</f7-button>
    <f7-block-title>INFO</f7-block-title>
    <f7-block>
      <p>Version 1.0.0</p>
    </f7-block>
  </f7-page>
</template>

<script>
  import { getDataLeague, getDataMatch, getDataArticle } from "../../js/function";

  export default {
    data() {
      return {
        storage: window.localStorage,
        settings: {
          autorefresh: false,
          vibration: false
        }
      };
    },
    methods: {
      autorefresh: function() {
        this.settings.autorefresh = !this.settings.autorefresh;
        this.storage.setItem("settings", JSON.stringify(this.settings));
      },
      vibration: function() {
        this.settings.vibration = !this.settings.vibration;
        this.storage.setItem("settings", JSON.stringify(this.settings));
      },
      updateData() {
        getDataLeague()
          .then(result => {
            this.leagues = result;
            this.storage.setItem("leagues", JSON.stringify(this.leagues));
            this.storage.setItem("lastUpdateLeagues", new Date());
            this.$f7.preloader.hide();
          })
          .catch(error => {
            this.$f7.dialog.alert(error, "Error");
          });
        getDataMatch()
          .then(result => {
            this.matchs = result;
            this.storage.setItem("matchs", JSON.stringify(this.matchs));
            this.storage.setItem("lastUpdateMatchs", new Date());
            this.$f7.preloader.hide();
          })
          .catch(error => {
            this.$f7.dialog.alert(error, "Error");
          });
        getDataArticle()
          .then(result => {
            this.articles = result;
            this.storage.setItem("articles", JSON.stringify(this.articles));
            this.storage.setItem("lastUpdateArticles", new Date());
            this.$f7.preloader.hide();
          })
          .catch(error => {
            this.$f7.dialog.alert(error, "Error");
          });
      },
      clearCache() {
        this.storage.clear();
      }
    },
    mounted() {
      let localSetting = JSON.parse(this.storage.getItem("settings"));

      if (localSetting) {
        this.settings = localSetting;
      }
      if (this.settings.autorefresh) {
        this.$$("#autorefresh").prop("checked", true);
      }
      if (this.settings.vibration) {
        this.$$("#vibration").prop("checked", true);
      }
    }
  };
</script>

<style>
  .md .left-pannel .button {
    background-color: #fff;
    width: 50%;
    margin: 5px auto;
    color: blueviolet;
  }

  .md .theme-dark .left-pannel {
    background: linear-gradient(
      to right,
      rgba(105, 41, 135, 1) 0%,
      rgba(202, 116, 213, 1) 100%
    );
  }
</style>
