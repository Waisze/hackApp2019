<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <HelloWorld :msg="msg" />
    <input type="text" v-model="question" placeholder="Question" />
    <input type="text" v-model="answer" placeholder="Answer" />
    <button v-on:click="submitQnA()">Submit</button>
    <h3>Knowledge API Token is:</h3>
    {{ info.data.token }}
    <h3>Search Twitter Hashtags</h3>
    <input type="text" v-model="hashtag" placeholder="Hashtag" />
    <button v-on:click="submitHashtag()" :disabled="buttonDisabled">
      Submit
    </button>
    <h3>Tweets</h3>
    {{ tweets || "None yet ;(" }}
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch, Prop } from "vue-property-decorator";
import HelloWorld from "./components/HelloWorld.vue";
import axios from "axios";
import { generateToken, createDocument } from "./services/knowledgeAPI";
import { mockTweets } from "./mock/mockTweets";
import {
  generateTwitterToken,
  queryTwitterHashtag
} from "./services/twitterAPI";

@Component({
  components: {
    HelloWorld
  }
})
export default class App extends Vue {
  public info: any = null;
  public msg: string = "";
  public question: string = "";
  public answer: string = "";
  public lastHashtag: string = "";
  public hashtag: string = "";
  public tweets: any = null;
  public buttonDisabled: boolean = false;

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

  public async submitQnA(): Promise<void> {
    try {
      await createDocument(this.info.data.token, this.question, this.answer);
    } catch (e) {
      console.error(e.message); // eslint-disable-line
    }
  }

  public async submitHashtag(): Promise<void> {
    try {
      this.buttonDisabled = true;
      this.lastHashtag = this.hashtag;
      this.tweets = mockTweets; // Saves the remaining requests, instead of calling the actual query function.
      //this.tweets = await queryTwitterHashtag(this.hashtag);
    } catch (e) {
      console.error(e.message); // eslint-disable-line
    }
  }

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
