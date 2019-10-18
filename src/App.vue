<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <HelloWorld :msg="msg" />
    <input type="text" :question="question" placeholder="Question" />
    <input type="text" :answer="answer" placeholder="Answer" />
    <button v-on:click="submitQnA()">Submit</button>
    <h3>Knowledge API Token is:</h3>
    {{ info }}

    <h3>Message is: {{ msg }}</h3>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch, Prop } from "vue-property-decorator";
import HelloWorld from "./components/HelloWorld.vue";
import axios from "axios";
import { generateToken, createDocument } from "./services/knowledgeAPI";

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

  constructor() {
    super();
    this.getToken();
    this.msg = this.getMsg();
  }

  public async getToken(): Promise<void> {
    try {
      this.info = await generateToken();
    } catch (e) {
      console.error(e.message);
    }
  }

  public async submitQnA(): Promise<void> {
    try {
      await createDocument(this.info.data.token, this.question, this.answer);
    } catch (e) {
      console.error(e.message);
    }
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
