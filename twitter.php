
<!DOCTYPE html>
<html lang="en">

<head>


  <link href="Website Files/css/bootstrap.css" rel="stylesheet">
  <link href="Website Files/css/font-awesome.css" rel="stylesheet">
  <link href="Website Files/css/flaticon.css" rel="stylesheet">
  <link href="Website Files/css/slick-slider.css" rel="stylesheet">
  <link href="Website Files/css/fancybox.css" rel="stylesheet">
  <link href="Website Files/style.css" rel="stylesheet">
  <link href="Website Files/css/color.css" rel="stylesheet">
  <link href="Website Files/css/responsive.css" rel="stylesheet">
  <link href="Website Files/css/dark-scheme.css" rel="stylesheet">

</head>

<CENTER> <h1><font color="red"> NBL TWEETS </font></H1> </CENTER>
<BR><BR>


</html>
<?php
require_once('TwitterAPIExchange.php');

$settings = array(
'oauth_access_token' => "814611877321908225-ahsU72KJMKmdEYb16tPg6IklRSZMJLK",
        'oauth_access_token_secret' => "d3ESjVjEY7Dk1B5tZiqDpyM2naByAK7x0ChHgdgbVqLEG",
        'consumer_key' => "gnhzT72alcNoYfmx1LXRkiE4s",
        'consumer_secret' => "1bJFWQCUA4bhTQLqVr7j2exTyPGxT1Z8uTteePPL48D0xrUZ09"
);
$url = "https://api.twitter.com/1.1/search/tweets.json";
$requestMethod = "GET";
if (isset($_GET['user'])) {$user = $_GET['user'];} else {$user = "amarthyasa";}
if (isset($_GET['count'])) {$count = $_GET['count'];} else {$count = 100;}
$getfield = "?q=#NBL&result_type=mixed&count=$count";
$twitter = new TwitterAPIExchange($settings);
$string = json_decode($twitter->setGetfield($getfield)->buildOauth($url, $requestMethod)->performRequest(),$assoc = TRUE);
if(array_key_exists("errors", $string)) {echo "<h3>Sorry, there was a problem.</h3><p>Twitter returned the following error message:</p><p><em>".$string[errors][0]["message"]."</em></p>";exit();}

for($x=0;$x<$count;$x++)
	print_r("Tweet - ".($x +1)."<br/> <br/>".$string['statuses'][$x]['text']."<br/><br/>");


?>
