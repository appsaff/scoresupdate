// Import Vue
import Vue from 'vue';

// Import Framework7
import Framework7 from 'framework7/dist/framework7.esm.bundle.js';

// Import Framework7 Vue
import Framework7Vue from 'framework7-vue/dist/framework7-vue.esm.bundle.js';

// Import F7 Style
import Framework7CSS from 'framework7/dist/css/framework7.css';

//Import Ionic
import Ionic from './assets/css/ionicons.min.css';

//Import RobotoLight
import Roboto from './assets/css/roboto.css';

// Import F7 iOS Icons
import Framework7Icons from 'framework7-icons/css/framework7-icons.css';

// Import Fontawesome Theme Styles
import FontAwesome from 'font-awesome/css/font-awesome.css';

// Import App Custom Styles
import AppStyles from './assets/css/app.css';

// Import App Component
import app from './main.vue';

// Import Routes
import routes from './routes.js';

// Install Plugin
Vue.use(Framework7Vue, Framework7);

// Init Vue App
export default new Vue({
  // Root Element
  el: '#app',
  data: {
    news: [],
  },
  render: c => c('app'),
  components: {
    app,
  },
  framework7: {
    id: 'com.izzi.scoresupdate',
    theme: 'md',
  },
  routes,
  mounted() {
    document.addEventListener("backbutton", () => {
      let isHome = this.$$('.page-current[data-name="home"]');
      let isPopup = (this.$$('#popup').css('display') == 'block') ? true : false;
      let isLeftPanel = this.$$('.panel-active');

      if (isPopup) {
        this.$f7.popup.close();
      } else if (isLeftPanel.length > 0) {
        this.$f7.panel.close();
      } else if (isHome.length > 0) {
        this.$f7.dialog.confirm("Are you sure you want to exit?", () => {
          navigator.app.exitApp();
        }, () => {
          return false;
        }, "Confirmation");
      } else {
        this.$f7.router.back();
      }
    }, false);
  }
});

document.addEventListener('deviceready', () => {
  // Notifications Enabled
  //UAirship.setUserNotificationsEnabled(true);

  // ADMob Init
  var admobid = {};
  if (/(android)/i.test(navigator.userAgent)) { // for android & amazon-fireos
    admobid = {
      banner: 'ca-app-pub-xxx/xxx', // or DFP format "/6253334/dfp_example_ad"
      interstitial: 'ca-app-pub-xxx/yyy'
    };
  } else if (/(ipod|iphone|ipad)/i.test(navigator.userAgent)) { // for ios
    admobid = {
      banner: 'ca-app-pub-xxx/zzz', // or DFP format "/6253334/dfp_example_ad"
      interstitial: 'ca-app-pub-xxx/kkk'
    };
  } else { // for windows phone
    admobid = {
      banner: 'ca-app-pub-xxx/zzz', // or DFP format "/6253334/dfp_example_ad"
      interstitial: 'ca-app-pub-xxx/kkk'
    };
  }

  if (AdMob) AdMob.createBanner({
    adId: admobid.banner,
    position: AdMob.AD_POSITION.TOP_CENTER,
    autoShow: true
  });

}, false);


// Register for any Urban Airship push events
//document.addEventListener("urbanairship.push", function (event) {
//  let localSetting = JSON.parse(localStorage.getItem("settings"));
//
//  if (localSetting && localSetting.vibration) {
//    navigator.vibrate(3000);
//  }
//  console.log("Incoming push: " + event.message);
//});
