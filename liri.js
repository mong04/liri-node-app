const keys = require('./keys.js');
const request = require('request');
const inquirer = require('inquirer');
const fs = require('fs')

const client = keys.client;
const spotify = keys.spotify;
let input = process.argv;

function liri(){
	switch(input[2]){
	case "my-tweets":
		inquirer.prompt([
		{
			type: "list",
			message: "What tweets would you like to show?",
			choices: ["Default", "Custom (Input Username)"],
			name: "tweets"
		}
		]).then(function(response){
			switch(response.tweets)
			{
				case "Default":
					let params = {screen_name: "JohneeTest1",
					count: 20};
					client.get('statuses/user_timeline', params, function(error, tweets, response) {
						if (!error) {
							for (let i = 0; i < tweets.length; i++){
								console.log("\n" + tweets[i].text +
									"\nCreated at: " + tweets[i].created_at);
							}
						}
						else {
							console.log("\nError: " + error[0].code +
								"\n" + error[0].message);
						}
					})
					break;
				case "Custom (Input Username)":
					inquirer.prompt([
					{
						type: "input",
						message: "Whose tweets would you like to see?",
						name: "username"
					}
					]).then(function(input){
						let params = {screen_name: input.username,
						count: 20};
						client.get('statuses/user_timeline', params, function(error, tweets, response) {
							if (!error) {
								for (let i = 0; i < tweets.length; i++){
									console.log("\n" + tweets[i].text +
										"\nCreated at: " + tweets[i].created_at);
								}
							}
							else{
								console.log("\nError: " + error[0].code +
									"\n" + error[0].message);
							}
						})
					})
					break;
			}
		})
		break;

	case "spotify-this-song":
		inquirer.prompt([
		{
			type: "list",
			message: "How would you like to search?",
			choices: ["Custom Search", "Choose For Me"],
			name: "musicSearch"
		}
		]).then(function(search){
			switch(search.musicSearch){
				case "Custom Search":
					inquirer.prompt([
					{
						type: "input",
						message: "What song would you like to search for?",
						name: "song"
					}
					]).then(function(input){
						spotify.search({ type: 'track', query: input.song }, function(err, data) {
					    if (err) {
					      return console.log('Error occurred: ' + err);
					  	}
				  	  	  let song = data.tracks.items[0];
				          console.log("\nArtist Name: " + song.artists[0].name +
				      	  "\nSong Name: " + song.name +
				      	  "\nPreview Link: " + song.preview_url +
				     	  "\nAlbum: " + song.album.name); 
					});
					})
					break;

				case "Choose For Me":
					let songName = "The Sign Ace of Base";
					spotify.search({ type: 'track', query: songName }, function(err, data) {
					  if (err) {
					    return console.log('Error occurred: ' + err);
					  }
				  	  let song = data.tracks.items[0];
				      console.log("\nArtist Name: " + song.artists[0].name +
				      	"\nSong Name: " + song.name +
				      	"\nPreview Link: " + song.preview_url +
				     	"\nAlbum: " + song.album.name); 
					});
					break;
			}

		})
		break;
	case "movie-this":
		inquirer.prompt([
		{
			type: "list",
			message: "How would you like to search?",
			choices: ["Custom Search", "Choose For Me"],
			name: "movieSearch"
		}
		]).then(function(search){
			switch(search.movieSearch){
				case "Custom Search":
					inquirer.prompt([
					{
						type: "input",
						message: "What movie would you like to search for?",
						name: "movie"
					}
					]).then(function(input){
						let queryURL = "http://www.omdbapi.com/?t=" + input.movie + "&y=&plot=short&apikey=40e9cece";
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
							else {
								console.log(error);
							}
						})
					})
					break;
				case "Choose For Me":
					let movieName = "Mr Robot"
					let queryURL = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=40e9cece";
					request(queryURL, function(error, response, body){
						if (!error && response.statusCode === 200) {
							// set variable to make it easier to call JSON.parse()
							let parse = JSON.parse;
							// Declare URL for Rotten Tomatoes
							let rottenURL = "https://www.rottentomatoes.com/tv/mr_robot/";
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
						else {
							console.log(error);
						}
					})
					break;
			}

		})

		break;
	case "do-what-it-says":
		fs.readFile('random.txt', 'utf-8', function(err, data){
			if (err){
				return console.log(err);
			}

			var output = data.split(',');

			for (var i = 0; i < output.length; i++) {
				let a = 2;
				return input[a] = output[i];
				console.log(input[a]);
				a++
			}
		});
		liri();
		break;

}
};
liri();
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