import axios from "axios";

const organizationid = "11d49135-912b-4ed5-8330-0ab724d6caca";
const secretkey = "c0b80a4c-df61-4567-aa98-505e429c4057";

const endpoint = "https://api.genesysappliedresearch.com/v2/knowledge";
const languageCode = "en-US";
const knowledgebaseId = "a407fab6-74a8-41e6-81d8-0a53dd0eff1e";
const categoryId = "a90a2324-826f-451e-86c4-ab1a7efbe838";

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
  answer: string
): Promise<void> {
  // Create request body:
  let body = {
    type: "faq",
    faq: {
      question: question,
      answer: answer,
      alternatives: []
    },
    categories: [
      {
        id: categoryId
      }
    ],
    externalUrl: ""
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

export { generateToken, createDocument };
