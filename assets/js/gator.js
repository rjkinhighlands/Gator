
// Initialize Firebase
  var config = {
    apiKey: "AIzaSyCA22_-RWAMuD6vTue3XwjmBlp-0kwCniw",
    authDomain: "gatordb-62e35.firebaseapp.com",
    databaseURL: "https://gatordb-62e35.firebaseio.com",
    storageBucket: "gatordb-62e35.appspot.com",
    messagingSenderId: "866976750728"
  };
  firebase.initializeApp(config);
//Google Login- Sets up the code to allow a user to authenticate with Google on Firebase. 
// FirebaseUI config.
      var uiConfig = {
        'signInSuccessUrl': '<url-to-redirect-to-on-success>',
        'signInOptions': [
          // Leave the lines as is for the providers you want to offer your users.
          firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        ]
      };

      // Initialize the FirebaseUI Widget using Firebase.
      var ui = new firebaseui.auth.AuthUI(firebase.auth());
      // The start method will wait until the DOM is loaded.
      ui.start('#firebaseui-auth-container', uiConfig);
//Reddit- Grabs the JSON and parses it for the default subreddits. This code should be designed to only execute when the user isnt logged in.
  $.getJSON(
        "http://www.reddit.com/r/news+worldnews.json?jsonp=?",
        function postUp(data)
        { console.log(data)
          $.each(
            data.data.children.slice(0, 25),
            function (i, post) {
              $("#reddit").append( "<li class = 'collection-item avatar><img src = '"+post.data.url+"' alt ='' class = 'circle><span class='title'>" + post.data.title+"</span><br><a href = '"+post.data.url+"'>View on Reddit!</a></li>");
            }
          )
        }
      );

//NYT- Grabs the JSON for the search criteria. Review this as it is not fully working just yet. 

var nytApiKey = "&api-key=0a156cdac7664279a87c57512ec0bbe7";
var q;
var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
var number;

function getArticle(){
  //q should be a value from the database. Not currently working.
  q = "?q=google"//+$('#searchTerm').val().trim();
  queryURL+= q; 
  //Sets the number of articles to return based on the number selected by the user.
  number = 25;
  //Completes the queryURL by adding the APIkey to the end. 
  queryURL+= nytApiKey;

  //Runs the query and appends each article to the #wellSection inside of its own well. 
    $.ajax({url: queryURL, method: 'GET'}).done(function(response) {
      console.log(response);
      for(var i = 0; i < number; i++){
        $('#nyt').append("<li class = 'collection-item avatar' id = 'article-'"+i+"><span class = 'title'>"+response.response.docs[i].headline.main+"</span><p>"+response.response.docs[i].abstract+"</p><p>Read more at: </p><a href ='"+response.response.docs[i].web_url+"'>"+response.response.docs[i].web_url+"</a></div>");       
      }
    });
    queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
return false; 
}
getArticle();

//NPR API- Grabs the JSON for the search criteria.

var nprAPIKey = "MDI2OTU2OTcxMDE0NzUwMjM5NjYwZDAxNQ000";
var nprQuery = "android"; 
var nprQueryUrl = "http://api.npr.org/query?requiredAssets=text,image&searchTerm="+nprQuery+"&dateType=story&output=JSON&searchType=fullContent&apiKey="+nprAPIKey;

$.ajax({url: nprQueryUrl, method: 'GET'}).done(function(response){
  console.log(response.list);
  for(var i = 0; i < 10; i++){
      $('#npr').append("<li class = 'collection-item avatar' id = 'article-'"+i+"><span class = 'title'>"+response.list.story[i].title.$text+"</span><p>"+response.list.story[i].teaser.$text+"</p><p>Read more at: </p><a href ='"+response.list.story[i].link.$text+"'>View on NPR!</a></div>");       
  }
})