

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res)
{
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res)
{

  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;

  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName
        }
      }
    ]
  };

  app.post("/failure", function(req, res)
{
  res.redirect("/");
})

  const jsonData = JSON.stringify(data);

  const url = "https://us13.api.mailchimp.com/3.0/lists/f94bf70caf"

  const options = {
    method: "POST",
    auth: "andrew:0c214b492fcec696fc5d07c252a5c3b8-us13"
  }



  const request = https.request(url, options, function(response)
  {
if(response.statusCode == 200)
{
  res.sendFile(__dirname + "/success.html")
} else {
  res.sendFile(__dirname + "/failure.html")
}

    response.on("data", function(data)
    {
      console.log(JSON.parse(data));
    })
  })

  request.write(jsonData);
  request.end();

  console.log(firstName, lastName, email);
});

app.listen(process.env.PORT || 3000, function(){
  console.log("Server is running on port 3000");
});


//API Key 0c214b492fcec696fc5d07c252a5c3b8-us13
//ListID f94bf70caf
