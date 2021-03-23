const app = require('express')();
const port = 8080;
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

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});
