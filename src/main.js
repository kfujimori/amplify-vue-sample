import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router';
import Amplify from 'aws-amplify';
import aws_export from './aws-exports.js';

Vue.config.productionTip = false
Amplify.configure(aws_export)

import Storage from '@aws-amplify/storage';
import S3 from 'aws-sdk/clients/s3';

const hackyCreateS3 = (options) => {
  const {bucket, region, credentials} = options;
  return new S3({
    apiVersion: '2006-03-01',
    params: { Bucket: bucket },
    region: region,
    credentials: credentials
  });
}
Storage._createS3 = hackyCreateS3;

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
