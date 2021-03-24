const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const dfff = require("dialogflow-fulfillment");
const {
    v4: uuidv4
} = require('uuid');

app.get('/', async (req, res) => {
    let a = "No Response";
    a = await require("node-fetch")("https://dialogflow.cloud.google.com/v1/integrations/messenger/webhook/666239df-8553-485d-abe3-e0d0a3219c92/sessions/" + uuidv4() + "?platform=webdemo", {
        "headers": {
            "accept": "*/*",
            "accept-language": "en-US,en;q=0.9",
            "content-type": "application/json",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "cross-site"
        },
        "referrerPolicy": "no-referrer",
        "body": "{\"queryInput\":{\"text\":{\"text\":\"" + req.query.q + "\",\"languageCode\":\"en\"}}}",
        "method": "POST",
        "mode": "cors"
    }).then(a => {
        return a.text();
    });
    a = JSON.parse(a.slice(5)).queryResult.fulfillmentText;
    if (!a) a = "No Response";
    res.send(JSON.stringify({
        "result": a
    }));
});

app.post('/', express.json(), async (req, res) => {
    const agent = new dfff.WebhookClient({
        request: req,
        response: res
    });
    //===================================================================================
    var intentMAP = new Map();
    //===================================================================================
    intentMAP.set('botstats', async (agent) => {
        agent.add(await GetBotStats());
    });
    //===================================================================================
    agent.handleRequest(intentMAP);
});
//===================================================================================
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});

async function GetBotStats() {
    let data = await require("node-fetch")("http://node1.nmadsen.dk:25689/").then(r => {
        return r.json();
    });
    return (data.stats);
};
