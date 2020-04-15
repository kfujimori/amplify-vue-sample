<template>
  <v-container>
    <p>ホーム</p>
    <router-link to="about" >link to About</router-link>
    <hr>
    <v-btn @click="selectFile" color="primary" dark>SELECT A FILE !!</v-btn>
    <input type="file" style="display:none" ref="input" @change="uploadSelectedFile()">
  </v-container>
</template>

<script>
import{Auth, Storage} from 'aws-amplify';

export default {
  name: 'Home',
  data: () => ({
    loginid: "amplify-vue-sample-user",
    loginpw: "keep1031"
  }),
  mounted: async function() {
    this.login();
  },
  methods: {

    /**
     * ログイン認証
     */
    login() {
      console.log("login.");

      // const user = Auth.signIn({"username": this.loginid, "password": this.loginpw});
      Auth.signIn({"username": this.loginid, "password": this.loginpw}).then((data) => {

      // Auth.signIn(this.liginid, this.loginpw).then((data) => {
        if(data.challengeName == "NEW_PASSWORD_REQUIRED") {
          console.log("new password required.");
          data.completeNewPasswordChallenge(this.loginpw, {}, 
            {
              onSuccess(result) {
                console.log("onSuccess");
                console.log(result);
              },
              onfailure(err) {
                console.log("onfailure");
                console.log(err);
              }
            }
          );
        }
        console.log("login successfuly.");
      }).catch((err) => {
        console.log("login failed.");
        console.log(err);
      });
    },

    /**
     * ファイル選択
     */
    selectFile() {
      if(this.$refs.input != undefined) {
        this.$refs.input.click();
      }
    },

    /**
     * ファイルアップロード
     */
    uploadSelectedFile() {
      let file = this.$refs.input.files[0];
      if(file == undefined) {
        return;
      }
      console.log(file);

      let dt = new Date();
      let dirName = this.getDirString(dt);
      let filePath = dirName + "/" + file.name;

      Storage.put(filePath, file).then(result => {
        console.log(result);
      }).catch(err => {
        console.log(err);
      })

      this.$router.push({ path: 'list', query: { group: dirName }});
    },

    getDirString(date){
      let random = date.getTime() + Math.floor(100000 * Math.random());
      random = Math.random() * random;
      random = Math.floor(random).toString(16);
      return "" + 
        ("00" + date.getUTCFullYear()).slice(-2) + 
        ("00" + (date.getMonth() + 1)).slice(-2) + 
        ("00" + date.getUTCDate()).slice(-2) + 
        ("00" + date.getUTCHours()).slice(-2) + 
        ("00" + date.getUTCMinutes()).slice(-2) + 
        ("00" + date.getUTCSeconds()).slice(-2) + 
        "-" + random;
    },
  }
}
</script>