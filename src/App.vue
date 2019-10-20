<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <HelloWorld :msg="msg" />
    <h3>Knowledge API Token is:</h3>
    {{ info.data.token }}
    <h3>Search Twitter Hashtags</h3>
    <input type="text" v-model="hashtag" placeholder="Hashtag" />
    <button v-on:click="submitHashtag()" :disabled="buttonDisabled">Submit</button>
    <h3>Tweets</h3>
    <!-- <div v-if="tweets">
      <div v-for="(tweet, index) in tweets.statuses" :key="index">
        {{ tweet.text }}
      </div>
    </div>-->
    {{ tweets }}
    <!-- <div v-else>None yet ;(</div> -->
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch, Prop } from "vue-property-decorator";
import HelloWorld from "./components/HelloWorld.vue";
import axios from "axios";
import { generateToken, createDocument, trainKnowledgebase } from "./services/knowledgeAPI";
import { mockTweets } from "./mock/mockTweets";
import {
  generateTwitterToken,
  queryTwitterHashtag,
  getTweetById
} from "./services/twitterAPI";

@Component({
  components: {
    HelloWorld
  }
})
export default class App extends Vue {
  public info: any = null;
  public msg: string = "";
  public lastHashtag: string = "";
  public hashtag: string = "";
  public tweets: any = [];
  public buttonDisabled: boolean = false;
  public collectionQnA: any = []; // Each item (object) would have two keys: question and answer

  constructor() {
    super();
    this.getToken();
    this.msg = this.getMsg();
  }

  public async getToken(): Promise<void> {
    try {
      this.info = await generateToken();
    } catch (e) {
      console.error(e.message); // eslint-disable-line
    }
  }

  public async submitHashtag(): Promise<any> {
    try {
      this.buttonDisabled = true;
      this.lastHashtag = this.hashtag;
      // this.tweets = mockTweets; // Saves the remaining requests, instead of calling the actual query function.
      const resTweets = await queryTwitterHashtag(this.hashtag);
      this.tweets = resTweets.data.statuses;
    } catch (e) {
      console.error(e.message); // eslint-disable-line
    }
  }

/* 
  TODO:
  submitHashtag() -> for each tweet in this.tweets, call getTwitterById() -> set Q & A and then update collectionQnA
  -> for each object in collectionQnA, call createDocument() -> call trainKnowledgebase() -> search
*/

  @Watch("hashtag")
  onHashtagChanged(currVal: string, oldVal: string) {
    if (currVal === this.lastHashtag) this.buttonDisabled = true;
    else this.buttonDisabled = false;
  }

  public getMsg(): string {
    return "HackApp2019";
  }
}
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
