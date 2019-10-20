import axios from "axios";

const CONSUMER_KEY = "1RbhWcIzhWBrqB9Va3Gzp5KMb";
const CONSUMER_SECRET = "mBHMiCxtXpM2MT4a3ueswWW28SkPurYDB7AnrkglGqA8yhrjru";

async function generateTwitterToken(): Promise<void> {
  const headers = {
    grant_type: "client_credentials",
    Authorization:
      "Basic MVJiaFdjSXpoV0JycUI5VmEzR3pwNUtNYjptQkhNaUN4dFhwTTJNVDRhM3Vlc3dXVzI4U2tQdXJZREI3QW5ya2dsR3FBOHlocmpydQ=="
    //Authorization: "Basic 1RbhWcIzhWBrqB9Va3Gzp5KMb:mBHMiCxtXpM2MT4a3ueswWW28SkPurYDB7AnrkglGqA8yhrjru"
  };
  return axios.post(
    "https://api.twitter.com/oauth2/token",
    {}, //empty body
    { headers }
  );
}

async function queryTwitterHashtag(
  search: string,
  numberOfTweets: number
): Promise<void> {
  const headers = {
    Authorization:
      "Bearer AAAAAAAAAAAAAAAAAAAAADKSAQEAAAAAXu54A7t7dlTFTMMjYzQu%2FmF6ajM%3DbmLWjVB3EkLTNAs7BfVcgI9S7vXNwlGneeX9r509UnUjJNktmN"
  };
  return axios.get(
    "https://cors-anywhere.herokuapp.com/https://api.twitter.com/1.1/search/tweets.json?q=%23" +
      search +
      " -filter:retweets&src=typed_query&count=" +
      numberOfTweets +
      "&tweet_mode=extended&lang=en",
    { headers }
  );
}

async function getTweetById(id: string): Promise<any> {
  const headers = {
    Authorization:
      "Bearer AAAAAAAAAAAAAAAAAAAAADKSAQEAAAAAXu54A7t7dlTFTMMjYzQu%2FmF6ajM%3DbmLWjVB3EkLTNAs7BfVcgI9S7vXNwlGneeX9r509UnUjJNktmN"
  };
  return axios.get(
    `https://cors-anywhere.herokuapp.com/https://api.twitter.com/1.1/statuses/show.json/id=${id}`,
    { headers }
  );
}

export { generateTwitterToken, queryTwitterHashtag, getTweetById };
