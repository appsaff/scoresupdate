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
        <f7-link href="/score/" icon-if-md="ion:ios-football" text="SCORE"></f7-link>
        <f7-link href="/livePage/" icon-if-md="ion:ios-world" text="LIVE"></f7-link>
        <f7-link href="/favourites/" icon-if-md="ion:android-star" text="FAVOURITES"></f7-link>
        <f7-link href="/menu/" icon-if-md="ion:navicon-round" text="MENU"></f7-link>
        <f7-link popup-open="#popup" icon-if-md="ion:paper-airplane" text="SUBSCRIBE"></f7-link>
        <f7-link href="/news/" icon-if-md="ion:earth" text="NEWS"></f7-link>
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
                <f7-input type="text" placeholder="Your name" :value="fields.name" @input="fields.name = $event.target.value" clear-button required validate></f7-input>
              </f7-list-item>
              <f7-list-item>
                <f7-input type="email" placeholder="E-mail" :value="fields.email" @input="fields.email = $event.target.value" clear-button required validate></f7-input>
              </f7-list-item>
              <f7-list-item>
                <f7-input type="tel" placeholder="Phone" id="phone" :value="fields.phone" @input="fields.phone = $event.target.value" clear-button required validate></f7-input>
              </f7-list-item>               
            </f7-list>
            <f7-button class="blue-but" @click="subscribe();">GET UPDATES</f7-button>
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
import { HTTP } from "assets/js/http";
export default {
  data() {
    return {
      fields: {
        name: "",
        email: "",
        phone: ""
      },
    };
  },
  methods: {
    subscribe() {
      let self = this;
      const formData = new FormData();

      formData.append("name", this.fields.name);
      formData.append("email", this.fields.email);
      formData.append("phone", this.fields.phone);

        HTTP.post("http://canappsdb.com/inc/mail.php", formData, {
          crossdomain: true
        })
        .then(response => {
          let data = response.data;

          self.$f7.dialog.alert(data.text, "Soccer", self.popupclose);
        })
        .catch(error => {
          console.log(error);
        });
    },
    popupclose() {
      this.$f7.popup.close();
    },
   
  },
  // computed: {
  //   checkFunc(){
  //     let self = this
  //     if (this.storage.length <= 0){
  //       getData();
  //     }
  //   }
  // },
  mounted() {
    VMasker(document.getElementById("phone")).maskPattern("+9 (999) 999-99-99");
  }
};
</script>