import axios from "axios";
import { Document } from "../models/api/Document";

const organizationid = "11d49135-912b-4ed5-8330-0ab724d6caca";
const secretkey = "c0b80a4c-df61-4567-aa98-505e429c4057";

const endpoint = "https://api.genesysappliedresearch.com/v2/knowledge";
const languageCode = "en-US";
const knowledgebaseId = "78b22146-e2d9-4a74-89ac-d046fee42802";

async function generateToken(): Promise<void> {
  const headers = {
    organizationid: organizationid,
    secretkey: secretkey
  };
  return axios.post(
    "https://api.genesysappliedresearch.com/v2/knowledge/generatetoken",
    {}, //empty body
    { headers }
  );
}

async function createDocument(
  token: string,
  question: string,
  answer: string,
  externalUrl?: string
): Promise<void> {
  // Create request body:
  let body: Document = {
    type: "faq",
    faq: {
      question: question,
      answer: answer
    },
    externalUrl: externalUrl
  };
  // Send request:
  let headers = {
    "Content-Type": "application/json",
    organizationid: organizationid,
    token: token
  };
  return axios.post(
    `${endpoint}/knowledgebases/${knowledgebaseId}/languages/${languageCode}/documents/`,
    body,
    { headers }
  );
}

async function createBulkTwitterDocument(
	tweets: any,
	token: string 
) {
  let bulkBody: Document[] = [];
  tweets.forEach((tweet: any, index: number): void => {
    //remove special characters and newlines
    tweet.full_text = tweet.full_text.replace('"', "");
    tweet.full_text = tweet.full_text.replace("'", "");
    tweet.full_text = tweet.full_text.replace(/\r?\n|\r/g, "");

    //remove urls but save them for externalUrl
    let matches = tweet.full_text.match(/https?:\/\/\S+/gi);
    if (!matches || !matches.length) {
      matches = [""];
    }
    tweet.full_text = tweet.full_text.replace(/https?:\/\/\S+/gi, "");

    let body: Document = {
      type: "faq",
      faq: {
        question: tweet.full_text,
        answer: tweet.full_text
      },
      externalUrl: matches[0]
    };
    bulkBody.push(body);
  });
  let headers = {
    "Content-Type": "application/json",
    organizationid: organizationid,
    token: token
  };
  return axios.patch(
    `${endpoint}/knowledgebases/${knowledgebaseId}/languages/${languageCode}/documents/`,
    bulkBody,
    { headers }
  );
}

export { generateToken, createDocument, createBulkTwitterDocument };
