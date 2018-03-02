<template>
  <f7-page class="head-page">
    <f7-navbar class="navbar-top" back-link="Back">
      <div class="titles">
          <f7-nav-title class="head-title" title="Score">Soccer</f7-nav-title>
          <f7-nav-title class="subtitle">Head to Head</f7-nav-title>
      </div>
      <f7-nav-right>
        <f7-link href="#" class="like"><f7-icon class="is-gray" ion="heart" size="35px"></f7-icon></f7-link>
        </f7-nav-right>
    </f7-navbar> 
    <f7-block class="head-live">
      <div class="head-live-left"> 
        <div class="time-block">
          <img src="../../../static/img/flag.png" alt="">
          <span>1:05</span>
        </div>
        <div class="name-block">
          <h5>CUP NAME HERE</h5>
          <p>TEAM A</p>
          <p>TEAM B</p>
        </div>
      </div> 
      <div class="head-live-right"> 
        DATE
      </div> 
    </f7-block>
    <div class="container">
    <f7-toolbar tabbar class="tabbar-head">
          <f7-link tab-link="#tabh1" tab-link-active><span><f7-icon ion="ios-bookmarks" size="30px"></f7-icon></span>Info</f7-link>
          <f7-link tab-link="#tabh2"><span><f7-icon ion="android-contacts" size="30px"></f7-icon></span>H2H</f7-link>
    </f7-toolbar>
    </div>
    <f7-tabs swipeable class="bg-tabs">
        <f7-tab id="tabh1" tab-active>
          
        </f7-tab>
        <f7-tab id="tabh2">
          <f7-toolbar tabbar class="tabbar-head-second">
              <f7-link tab-link="#tabhh1" tab-link-active><span></span>TEAM 1</f7-link>
              <f7-link tab-link="#tabhh2">HEAD TO HEAD</f7-link>
              <f7-link tab-link="#tabhh3">TEAM 2</f7-link>
          </f7-toolbar>
          <f7-tabs swipeable class="bg-tabs">
            <f7-tab id="tabhh1" tab-active>
              <f7-block class="team">
                <div class="top-b"> 
                    <img src="../../../static/img/flag.png" alt="">
                    <p>Graet soccer tournament</p>
                    <f7-link href="" class="like"></f7-link>
                  </div> 
              </f7-block>
              <f7-list v-for="headtohead in headtoheads" :key="headtohead.id" id="search-list" class="teams .bg-list">
                  <f7-list-item class="team">
                  <div class="bottom-b">
                          <div class="left-bot">
                            <div class="time-block">
                              <span>Full</span>
                              <span>time</span>
                            </div>
                            <div class="team-block">
                              <span>Team - A</span>
                              <span>Team - B</span>
                            </div>
                          </div>
                          <div class="right-bot">
                            <div class="point-block">
                              <span>4</span>
                              <span>4</span>
                            </div>

                          </div>
                        </div> 
                  </f7-list-item>
              </f7-list>
            </f7-tab> 
            <f7-tab id="tabhh2">Tab 2 content...</f7-tab>
            <f7-tab id="tabhh3">Tab 3 content...</f7-tab>
          </f7-tabs> 
        </f7-tab>
      </f7-tabs>
    
  </f7-page>
</template>

<script>
import { HTTP } from "../../js/http";
export default {
  data() {
    return {
      isLoading: true,
      headtoheads: []
    };
  },
  mounted() {
    console.log(this.$f7route);
    // HTTP.get("fixtures/164778")
    //   .then(response => {
    //     this.headtoheads = response.data.headtoheads;
    //   })
    //   .catch(function(error) {
    //     this.headtoheads = "Data is not avaliable";
    //   });
  },
};
</script>
<style>
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
  width: 50%;
}
.md .head-live-left .name-block p {
  margin: 0px;
  line-height: 17px;
  color: #fff;
  font-weight: 400;
  font-size: 16px;
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
  text-align: center;
}
.md .head-live-right {
  text-align: right;
  width: 50%;
  color: #fff;
  font-weight: 400;
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
