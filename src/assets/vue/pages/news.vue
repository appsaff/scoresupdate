<template>
  <f7-page class="news-page">
    <f7-navbar class="navbar-top" back-link="Back">
      <div class="titles">
        <f7-nav-title class="head-title" title="Score">Scores Update</f7-nav-title>
        <f7-nav-title class="subtitle">News</f7-nav-title>
      </div>
      <f7-nav-right>
      </f7-nav-right>
    </f7-navbar> 
    <f7-list class="news .bg-list">
      <f7-list-item @click="newsData(index)" v-for="(article, index) in articles" :key="article.id" class="new">
        <div class="new-img">
          <img :src="article.urlToImage" alt="">
        </div>
        <div class="new-desc">
          <p>{{ article.title }}</p>
          <span>{{ publishDate(article.publishedAt) }}</span>
        </div>
      </f7-list-item>
    </f7-list>
  </f7-page>
</template>

<script>
  import { getDataArticle, checkIfUpdate } from "../../js/function";

  export default {
    data() {
      return {
        storage: window.localStorage,
        articles: []
      };
    },
    mounted() {
      let lastUpdateArticles = this.storage.getItem("lastUpdateArticles");

      this.$f7.preloader.show();

      if (checkIfUpdate(lastUpdateArticles)) {
        getDataArticle()
          .then(result => {
            this.articles = result;
            this.storage.setItem("articles", JSON.stringify(this.articles));
            this.storage.setItem("lastUpdateArticles", new Date());
            this.$f7.preloader.hide();
          })
          .catch(error => {
            this.articles = JSON.parse(this.storage.getItem("articles"));
            this.$f7.dialog.alert(error, "Error");
          });
      } else {
        this.articles = JSON.parse(this.storage.getItem("articles"));
        this.$f7.preloader.hide();
      }
    },
    methods: {
      newsData(index) {
        this.$root.news = this.articles[index];
        this.$f7router.navigate("/newsPage/");
      },
      publishDate(value) {
        let tempDate = new Date(value);
        let date = tempDate.getDate().toString();
        let month = (tempDate.getMonth() + 1).toString();
        let year = tempDate.getFullYear().toString();
        let hour = tempDate.getUTCHours().toString();
        let minute = tempDate.getMinutes().toString();

        date = date[1] ? date : "0" + date[0];
        month = month[1] ? month : "0" + month[0];
        year = year[2] + year[3];
        hour = hour[1] ? hour : "0" + hour[0];
        minute = minute[1] ? minute : "0" + minute[0];

        return (
          date + "." + month + "." + year + " " + "-" + " " + hour + ":" + minute
        );
      }
    }
  };
</script>

<style>
  .md .head-title {
    color: #fdf018;
  }

  .md .news-page {
    background-color: #f7f7f7;
  }

  .news-page .navbar-top:after {
    display: none;
  }

  .md .news {
    margin: 0px;
  }

  .md .new {
    margin: 10px 0;
    box-shadow: 0px 2px 6px 0px rgba(77, 77, 77, 0.1);
  }

  .md .new .new-img {
    width: 30%;
  }

  .md .new .new-img img {
    width: 100%;
  }

  .md .new .new-desc {
    width: 70%;
    padding-left: 10px;
    flex-direction: column;
  }

  .md .new .new-desc p {
    font-size: 14px;
    color: #000;
    margin: 0px;
  }

  .md .new .new-desc span {
    font-size: 10px;
    color: #000;
  }
</style>
