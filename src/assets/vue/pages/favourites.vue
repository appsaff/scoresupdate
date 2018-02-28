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
          <f7-list class="teams">
            
          </f7-list>
        </f7-tab>
        <f7-tab id="tabf2">Tab 2 content...</f7-tab>
      </f7-tabs>
  </f7-page>
</template>

<script>
export default {
  data() {
          return{
          isLoading: true,
          teams: []
          }
      },
      methods:{
          favourite(){
              this.isLoading = !this.isLoading;
          }
      }
}
</script>
<style>
.md .head-title{
  color: #fdf018;
}
.md .favour-page .tabbar-favor {
  background: rgba(202,116,213,1); 
}
.md .favour-page .tabbar-favor a.link{
    line-height: 12px;
    min-width: 44px;
    text-transform: none;
    font-size: 16px;
}
.tabbar-favor i::before{
  line-height: 0.6;
}
.md .favour-page .tabbar .tab-link-highlight{
  background-color: #6d2b8c;
}

</style>
