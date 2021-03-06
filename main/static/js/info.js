$(function() {
      $("#search-txt").on("keypress", function(e) {
        if (e.which === 13) {
          e.preventDefault();
          $("#search-btn").trigger("click");
        }
      });
      $("#search-btn").on("click", function() {
        $("#video-data-1, #video-data-2").empty();
        var videoid = $("#search-txt").val();
        var matches = videoid.match(/^http:\/\/www\.youtube\.com\/.*[?&]v=([^&]+)/i) || videoid.match(/^http:\/\/youtu\.be\/([^?]+)/i) || videoid.match(/^https:\/\/www\.youtube\.com\/.*[?&]v=([^&]+)/i) || videoid.match(/^https:\/\/youtu\.be\/([^?]+)/i);
        if (matches) {
          videoid = matches[1];
        }
        if (videoid.match(/^[a-z0-9_-]{11}$/i) === null) {
          $("<p style='color: #F00;'>Unable to parse Video ID/URL.</p>").appendTo("#video-data-1");
          return;
        }
        $.getJSON('http://gdata.youtube.com/feeds/api/videos/'+videoid +'?v=2&alt=json',function(data,status,xhr){
    
    
		 var sanitizeTitle = function(title){
						var _has = function(char) { return title.indexOf(char) !== -1 }
						var cleanTitle = title;
						
						if (_has('(') || _has('[') || _has('{')){
							var matches = title.match(/\(.*\)|\[.*\]|\{.*\}/);
							if (matches.length > 0) {
								for ( var i in matches ){
									cleanTitle = title.replace(/\(.*\)|\[.*\]|\{.*\}/, '').replace(/ - /, ' ').replace(/-/, ' ');
								}
							}
						}
						var c = title.indexOf('(');
						cleanTitle = cleanTitle.slice(0,c);
						return cleanTitle;
					};
					
		
		var songTitle = sanitizeTitle(data.entry.title.$t);
		//Test 3
		if (songTitle === data.entry.title.$t) {
            return; 
        }
		var url1 = 'https://api.spotify.com/v1/search?type=track&query=' + songTitle;
		var url = url1.split(' ').join('+');		
		
		//Test 4
		if(url1 === url){
			return;
		}
		var feelingLucky = "https://www.google.com/search?btnI=I%27m+Feeling+Lucky&q=";
		var lyric = feelingLucky + songTitle + "lyrics";
		var wiki = feelingLucky + songTitle + "wikipedia";
		$.get(url, function(data){
			var spotifyResponse = data;
			
			if( data.tracks.items.length === 0){
				alert(songTitle+"is not recognized on Spotify");
				var link = data.tracks.items[0].uri;
			$("#para").append("<a href='" + lyric +"' target='_blank'><img src='../static/images/GoToSongLyrics.png' height='66'></a>");
			$("#para").append("<a href='" + wiki +"' target='_blank'><img src='../static/images/GoToWikiPedia.png' height='66'></a>");
			}
			
			else{
				var link = data.tracks.items[0].uri;
			$("#song").append("<center>" + songTitle + "</center>");
			$("#para").append("<center><a href='" + lyric +"' target='_blank'><img src='../static/images/GoToSongLyrics.png' height='66'></a>");
			$("#para").append("<a href='" + wiki +"' target='_blank'><img src='../static/images/GoToWikiPedia.png' height='66'></a>");
			$("#para").append("<a href='" + link +"' target='_blank'><img src='../static/images/ListenOnSpotify.png' height='66'></a></center>");
			}
			
		
		
			
			
			//Test 5
			
		});
		
});
         
});
          
          
        });
	