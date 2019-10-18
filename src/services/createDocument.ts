/* eslint-disable */
import axios from 'axios';
import { generateToken } from './knowledgeAPI';

const endpoint = "https://api.genesysappliedresearch.com/v2/knowledge";
const languageCode = 'en-US';
const knowledgebaseId = 'c7888a8f-c90c-4872-8b0f-c4514a60682b';
const organizationid = "11d49135-912b-4ed5-8330-0ab724d6caca";

async function createDocument (token: string, question: string, answer: string): Promise<void> {
    // Create request body:
    let body = {
        type: "faq",
        faq: {
            question,
            answer,
            alternatives: [""]
        },
        categories: [
            {
                id: "{{categoryId}}"
            }
        ],
        externalUrl: ""
    };
    console.log("body", body);
    // Send request:
    let headers = {
        'Content-Type': "application/json",
        'organizationid': organizationid,
        'token': token
    };
    return axios.post(
        `${endpoint}/knowledgebases/${knowledgebaseId}/languages/${languageCode}/documents/`,
        body,
        { headers }
    );
};

export { createDocument };
/* eslint-disable */