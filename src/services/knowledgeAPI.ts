import axios from "axios";

const organizationid = "11d49135-912b-4ed5-8330-0ab724d6caca";
const secretkey = "c0b80a4c-df61-4567-aa98-505e429c4057";

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

export { generateToken };
