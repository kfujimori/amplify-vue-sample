import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router';
import Amplify from 'aws-amplify';
import aws_export from './aws-exports.js';

Vue.config.productionTip = false
Amplify.configure(aws_export)

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
