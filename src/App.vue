<template>
  <div id="app">
    <div class="start">
      <h1>TwitLive</h1>
      <!-- <input type="text" v-model="question" placeholder="Question" />
      <input type="text" v-model="answer" placeholder="Answer" /> -->
      <!-- <button v-on:click="submitQnA()">Submit</button>
      <h3>Knowledge API Token is:</h3>
      <div v-if="info">
        {{ info.data.token }}
      </div> -->
      <h3>Train AI on Twitter Hashtags</h3>
      <input type="text" v-model="hashtag" placeholder="Hashtag" />
      <input
        type="text"
        v-model="numberOfTweets"
        placeholder="How many tweets?"
      />
      <button v-on:click="submitHashtag()">
        Train
      </button>
    </div>
    <div class="tweets" v-if="tweets">
      <h1>Tweets</h1>
      <div>
        <div
          class="tweet"
          v-for="(tweet, index) in tweets.data.statuses"
          :key="index"
        >
          {{ tweet.full_text }}
        </div>
      </div>
    </div>
    <div v-else>Search a #Hashtag to Start</div>
    <div class="askMe" v-if="tweets">
      <h1>Ask me what I've learned</h1>
      <input type="text" v-model="searchQuery" placeholder="Ask me anything" />
      <button v-on:click="submitSearchQuery()">
        Submit
      </button>
      <div v-if="searchResult">
        <div class="tweet">
          {{ searchResult.data.results[0].faq.answer }}
          <h4>Find out more here:</h4>
          <div class="link">
            <a :href="searchResult.data.results[0].externalUrl">
              {{ searchResult.data.results[0].externalUrl }}
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch, Prop } from "vue-property-decorator";
import HelloWorld from "./components/HelloWorld.vue";
import axios from "axios";
import {
  generateToken,
  createDocument,
  createBulkTwitterDocument,
  searchKB
} from "./services/knowledgeAPI";

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
  public question: string = "";
  public answer: string = "";
  public lastHashtag: string = "";
  public hashtag: string = "";
  public tweets: any = null;
  public numberOfTweets: any = "";
  public searchQuery: string = "";
  public searchResult: any = null;

  constructor() {
    super();
    this.getToken();
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
      await createDocument(
        this.info.data.token,
        this.question,
        this.answer,
        ""
      );
    } catch (e) {
      console.error(e.message); // eslint-disable-line
    }
  }

  public async submitHashtag(): Promise<void> {
    try {
      // this.tweets = mockTweets; // Saves the remaining requests, instead of calling the actual query function.
      this.tweets = await queryTwitterHashtag(
        this.hashtag,
        parseInt(this.numberOfTweets)
      );
      await createBulkTwitterDocument(
        this.tweets.data.statuses,
        this.info.data.token
      );
    } catch (e) {
      console.error(e.message); // eslint-disable-line
    }
  }

  @Watch("tweets")
  onValueChange(newVal: any, oldVal: any) {
    setTimeout(function() {
      window.scrollTo({
        top: 6000,
        left: 0,
        behavior: "smooth"
      });
    }, 2000);
  }

  public async submitSearchQuery(): Promise<void> {
    try {
      this.searchResult = await searchKB(this.searchQuery, this.info.data.token);
    } catch (e) {
      console.error(e.message); // eslint-disable-line
    }
  }
}
</script>

<style>
body {
  height: 100vh;
  margin: 0;
}

button {
  height: 35px;
}

input {
  height: 30px;
  width: 8%;
  margin-right: 10px;
}

#app {
  height: 100%;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0;
  background-image: url(./assets/background.jpg);
}

.start {
  height: 800px;
  padding-top: 260px;
}

.tweet {
  width: 500px;
  min-height: 70px;
  background: #d8d8d8;
  padding: 50px;
  border-radius: 50px;
  margin: 20px auto;
}

.askMe {
  padding-top: 500px;
  height: 460px;
  background-image: url(./assets/background.jpg);
}
</style>
