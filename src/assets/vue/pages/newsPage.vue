<template>
  <f7-page class="news-page">
    <f7-navbar class="navbar-top" back-link="Back">
      <div class="titles">
          <f7-nav-title class="head-title" title="Score">Soccer</f7-nav-title>
          <f7-nav-title class="subtitle">News</f7-nav-title>
      </div>
      <f7-nav-right>
        </f7-nav-right>
    </f7-navbar> 
    <f7-block  class="news-block .bg-list">
      <h2>{{ this.news.title }}</h2>
      <span>{{ this.news.publishedAt }}</span>
      <img :src="this.news.urlToImage" :alt="this.news.title">
      <div><p>{{ this.news.description }}</p></div>
    </f7-block>
  </f7-page>
</template>

<script>
export default {
  data() {
    return {
      news: this.$root.news
    }
  }
};
</script>
<style>

  .md .head-title{
  color: #fdf018;
}
  .md .news-page{
    background-color: #f7f7f7;
  }

  .news-page .navbar-top:after{
    display: none;
  }
  .md .news-block{
      margin: 0px;
  }
  .md .news-block p{
      font-size: 16px;
      color: #000;
      margin: 0px;
  }
  .md .news-block span{
      font-size: 10px;
      color: #000;
  }
  .md .news-block img{
      width: 100%;
  }
</style>
