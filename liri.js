const keys = require('./keys.js');
const request = require('request');
const inquirer = require('inquirer');

const client = keys.client;
const spotify = keys.spotify;
let input = process.argv;

switch(input[2]){
	case "my-tweets":
		inquirer.prompt([
		{
			type: "input",
			message: "What is your Username?",
			name: "username"
		}
		]).then(function(answer){
			var params = {screen_name: answer.username,
				count: 20};
			client.get('statuses/user_timeline', params, function(error, tweets, response) {
			  if (!error) {
			    for (let i = 0; i < tweets.length; i++){
			    	console.log("\n"+ tweets[i].text +
			    		"\nCreated at: " + tweets[i].created_at);
			    }
			  }
			});
		})
		break;
	case "spotify-this-song":
		let songName = "";
		for (let i = 3; i < input.length; i++){
			songName += input[i] + " ";
		}
		spotify
		  .search({ type: 'track', query: songName })
		  .then(function(response) {
		  	let song = response.tracks.items[0];
		    console.log("\nArtist Name: " + song.artists[0].name +
		    	"\nSong Name: " + song.name +
		    	"\nPreview Link: " + song.preview_url +
		    	"\nAlbum: " + song.album.name);
		  })
		  .catch(function(err) {
		    console.log(error);
		  });	
		console.log(songName);
		break;
	case "movie-this":
		let movieName = "";
		for (let i = 3; i < input.length; i++){
			movieName += input[i] + " ";
		}
		let queryURL = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=40e9cece";
		request(queryURL, function(error, response, body){
			if (!error && response.statusCode === 200) {
				// set variable to make it easier to call JSON.parse()
				let parse = JSON.parse;
				// Declare URL for Rotten Tomatoes
				let rottenURL = "https://www.rottentomatoes.com/m/" + parse(body).Title.replace(/:/g, "").replace(/'/g, "");
				// Replace spaces with underscores in the URL
				rottenURL = rottenURL.replace(/ /g, "_").toLowerCase();
				console.log("\nTitle: " + parse(body).Title + 
					"\nReleased: " + parse(body).Year + 
					"\nIMDB Rating: " + parse(body).imdbRating + 
					"\nProduced in: " + parse(body).Country +
					"\nPlot: " + parse(body).Plot +
					"\nActors: " + parse(body).Actors +
					"\nRotten Tomatoes URL: " + rottenURL);
			}
		})
		break;
	case "do-what-it-says":
		console.log("do-what-it-says");
		break;
}

// `my-tweets`
// This will show your last 20 tweets and when they were created at in your terminal/bash window.
// `spotify-this-song`
// `movie-this`
   // * This will output the following information to your terminal/bash window:

   //   ```
   //     * Title of the movie. body.Title
   //     * Year the movie came out. body.Year
   //     * IMDB Rating of the movie. body.imdbRating
   //     * Country where the movie was produced. body.Country
   //     * Language of the movie. body.Language
   //     * Plot of the movie. body.Plot
   //     * Actors in the movie. body.Actors
   //     * Rotten Tomatoes URL. let rottenURL = "https://www.rottentomatoes.com/m/" + body.Title + body.Year;
   //   ```
// `do-what-it-says`

   // * This will show the following information about the song in your terminal/bash window
     
   //   * Artist(s) song.artists.name
     
   //   * The song's name song.name
     
   //   * A preview link of the song from Spotify song.preview_url
     
   //   * The album that the song is from song.album.name

   // * If no song is provided then your program will default to "The Sign" by Ace of Base.