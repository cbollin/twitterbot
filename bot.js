console.log("starting");

var Twit = require('twit');
var config = require('./config')
var T = new Twit(config);

//setting up user stream
var stream = T.stream('user');




//reply
stream.on('tweet', tweetEvent);

function tweetEvent(eventMsg){
  // use this code to write the json file and find info such as in_reply_to_screen_name
  var fs = require('fs');
  var json = JSON.stringify(eventMsg,null,2);
  fs.writeFile("tweet.json", json);

  var replyto = eventMsg.in_reply_to_screen_name;
  var text = eventMsg.text;
  var from = eventMsg.user.screen_name;

  console.log(replyto + '' + from);

  if(replyto == 'CassidyBollin'){
    var newTweet = "@" + from + " random test 1111"
    tweetIt(newTweet);

  }
}





//when someone follows, do this
stream.on('follow', followed);

function followed(eventMsg){
  var name = eventMsg.source.name;
  var screenName = eventMsg.source.screen_name;
  tweetIt('@' + screenName + " Thanks for following me!");
}




//post tweet
function tweetIt(txt){

  var tweet = {
    status: txt
  }

  T.post('statuses/update', tweet, tweeted);

  function tweeted(err, data, response) {
    if(err){
      console.log("Something went wrong!");
    } else{
      console.log("worked");
    }
  }
}

// tweetIt();
// setInterval(tweetIt, 1000*20);


//get tweet
var params = {
  q: 'trump since:2011-07-11',
  count: 2
};

T.get('search/tweets', params, gotData);

function gotData(err, data, response) {
  var tweets = data.statuses;
  for(var i = 0; i < tweets.length; i++){
    console.log(tweets[i].text);
  }
}
