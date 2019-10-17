<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
    <h3>Knowledge API Token is:</h3>
    {{ info.data.token }}
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import HelloWorld from "./components/HelloWorld.vue";
import axios from "axios";
import { generateToken } from "./services/knowledgeAPI";

@Component({
  components: {
    HelloWorld
  }
})
export default class App extends Vue {
  public info: any = null;

  constructor() {
    super();
    this.getToken();
  }

  public async getToken(): Promise<void> {
    try {
      this.info = await generateToken();
    } catch (e) {
      console.error(e.message);
    }
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
