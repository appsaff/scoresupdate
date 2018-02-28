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
    <f7-list class="news .bg-list">
        <f7-list-item class="new">
            <f7-link>
            <div class="new-img">
                <img src="../../../static/img/flag.png" alt="">
            </div>
            <div class="new-desc">
                <p>Madrid can`t give up in liga</p>
                <span>Feb 28, 2018, 4:15 pm</span>
            </div>
            </f7-link>
        </f7-list-item>
        <f7-list-item class="new">
            <f7-link>
            <div class="new-img">
                <img src="../../../static/img/flag.png" alt="">
            </div>
            <div class="new-desc">
                <p>Madrid can`t give up in liga</p>
                <span>Feb 28, 2018, 4:15 pm</span>
            </div>
            </f7-link>
        </f7-list-item>
    </f7-list>
  </f7-page>
</template>

<script>
export default {};
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
  .md .news{
      margin: 0px;
  }
  .md .new{
    margin: 10px 0;
    box-shadow: 0px 2px 6px 0px rgba(77, 77, 77, 0.1);
  }
  .md .new .new-img{
      width: 20%;
  }
  .md .new .new-img img{
      width: 100%;
  }
  .md .new .new-desc{
      width: 80%;
      padding-left: 10px;
      flex-direction: column;
  }
  .md .new .new-desc p{
      font-size: 14px;
      color: #000;
      margin: 0px;
  }
  .md .new .new-desc span{
      font-size: 10px;
      color: #000;
  }
</style>
