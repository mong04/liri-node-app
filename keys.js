console.log('this is loaded');

var Twitter = require('twitter');
var Spotify = require('node-spotify-api');

exports.client = new Twitter({
  consumer_key: 'WtKXb8JDMtoWsGtD9vOvwzluC',
  consumer_secret: 'WrkCT3HfsYfwJnvvunVrJi3EbTJwGbajBgw512Zuyvxp5ZCjoW',
  bearer_token: 'AAAAAAAAAAAAAAAAAAAAAE3N1AAAAAAAPdqb1YSLziAXrIBPDDsS5bi2xxM%3Dx0q0hsPTFzP7BjpZ6qveb3VtoUFs88yGm1EafEeHH1ab6MOpSw'
});

exports.spotify = new Spotify({
  id: "c6c55444428949178fa72a8074995cf1",
  secret: "fc87f67b13da4e1d9135e554bf214003"
});