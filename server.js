const express = require("express");
const app = express();

function checkHttps(req, res, next){
  // protocol check, if http, redirect to https
  
  if(req.get('X-Forwarded-Proto').indexOf("https")!=-1){
    return next()
  } else {
    res.redirect('https://' + req.hostname + req.url);
  }
}

app.all('*', checkHttps);
// our default array of dreams


// make all the files in 'public' available
// https://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));


// https://expressjs.com/en/starter/basic-routing.html
app.get("/", (request, response) => {
  response.sendFile(__dirname + "/page/index.html");
});

app.get("/accueil", (request, response) => {
  response.sendFile(__dirname + "/page/index.html");
});

app.get('/*', (request, response) => {
  response.sendFile(__dirname + '/page/404.html');
});

app.get('/404', (request, response) => {
  response.sendFile(__dirname + '/page/404.html');
});

app.get("/tos", (request, response) => {
  response.sendFile(__dirname + "/page/important/tos.html");
});

app.get("/object", (request, response) => {
  response.sendFile(__dirname + "/page/other/object.html");
});
// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
