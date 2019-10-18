/* eslint-disable */
import axios from 'axios';
import { generateToken } from './knowledgeAPI';

const endpoint = "https://api.genesysappliedresearch.com/v2/knowledge";
const languageCode = 'en-US';
const knowledgebaseId = 'a407fab6-74a8-41e6-81d8-0a53dd0eff1e';
const categoryId = 'a90a2324-826f-451e-86c4-ab1a7efbe838';
const organizationid = "11d49135-912b-4ed5-8330-0ab724d6caca";

async function createDocument (token: string, question: string, answer: string): Promise<void> {
    // Create request body:
    let body = {
        type: "faq",
        faq: {
            "question": question,
            "answer": answer,
            alternatives: [""]
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