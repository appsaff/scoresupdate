<template>
  <!-- App -->
  <div id="app">
    <f7-statusbar></f7-statusbar>
    <f7-panel left cover theme-dark>
      <f7-view url="/panel-left/" links-view=".view-main" />
    </f7-panel>
    <f7-views>
    <f7-view url="/score/" :main="true" id="main-view" class="ios-edges"></f7-view>
      <f7-toolbar bottom-md tabbar labels class="toolbar-bot">
        <f7-link @click="vibr()" href="/score/" icon-if-md="ion:ios-football" text="SCORE" ><f7-icon ion="" size="35px"></f7-icon></f7-link>
        <f7-link @click="vibr()" href="/livePage/" icon-if-md="ion:ios-world" text="LIVE"></f7-link>
        <f7-link @click="vibr()" href="/favourites/" icon-if-md="ion:android-star" text="FAVOURITES" ></f7-link>
        <f7-link @click="vibr()" href="/menu/" icon-if-md="ion:navicon-round" text="MENU"></f7-link>
        <f7-link @click="vibr()" popup-open="#popup" icon-if-md="ion:paper-airplane" text="SUBSCRIBE"></f7-link>
        <f7-link @click="vibr()" href="/news/" icon-if-md="ion:earth" text="NEWS"></f7-link>
      </f7-toolbar>
    </f7-views>
    <!-- Popup -->
    <f7-popup id="popup">
      <f7-view>
        <f7-page class="popup-page">
            <f7-block class="popup-block">
              <f7-block-header>
                <f7-link class="close-but" popup-close><img src="./static/img/close-pop.png" alt=""></f7-link>
                SING UP FOR THE UPDATES
              </f7-block-header>
              <f7-list class="popup-inputs" no-hairlines-md>
                <f7-list-item>
                  <f7-input type="text" placeholder="Your name" clear-button></f7-input>
                </f7-list-item>

                <f7-list-item>
                  <f7-input type="email" placeholder="E-mail" clear-button></f7-input>
                </f7-list-item>

                <f7-list-item>
                  <f7-input type="tel" placeholder="Phone No" clear-button></f7-input>
                </f7-list-item> 
              </f7-list>
              <f7-button class="blue-but">GET UPDATES</f7-button>
              <f7-block>
                <p>Or login with social accounts</p>
              </f7-block>
              <f7-segmented>
                <f7-button class="but"><f7-icon ion="social-facebook" size="18px"></f7-icon>Facebook</f7-button>
                <f7-button class="but red"><f7-icon ion="social-googleplus-outline" size="18px"></f7-icon>Google+</f7-button>
              </f7-segmented>
            </f7-block>      
        </f7-page>
      </f7-view>
    </f7-popup>
  </div>
</template>
<script>
export default {
  data() {
    return {
      storage: window.localStorage,
    }
  },
  methods:{ 
    vibr(){
      let localSetting = JSON.parse(this.storage.getItem("settings"));
      if(localSetting.vibration == true){
      let time = 3000;
      navigator.vibrate(time);
      }
    }
  }
};
</script>