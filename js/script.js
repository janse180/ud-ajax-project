
function loadData(data) {

    var nytAPIKey = 'c51ec245e9f94ea8834cf5bd9c3a8d3a';
    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    //Convert to object notation
    var data_obj = {};
    data.forEach(function(element) {
        data_obj[element.name] = element.value;
    }, this);

    console.log(data_obj);

    img_src = "https://maps.googleapis.com/maps/api/streetview?size=600x300&location=" + data_obj.street + "," + data_obj.city 
    
   

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview
    $greeting.text('So, you want to live at ' + data_obj.street + ", " + data_obj.city);
    $body.append('<img class="bgimg" src="' + img_src + '">' );

    //Load NYT
    var nytData = {};
    jQuery.getJSON("https://api.nytimes.com/svc/search/v2/articlesearch.json", {
        'api-key': nytAPIKey,
        'q': data_obj.city
    }, function(data){
        docs = data.response.docs;
        
        $.each(data.response.docs, function(index, item){
            $nytElem.append(
                $('<li>').attr('class','article').append(
                    $('<a>').attr('href',item.web_url).text(item.headline.main)).append(
                    $('<p>').text(item.snippet))
                );
        });
    }).error(function(){
        $nytHeaderElem.text("New York Times Articles Could Not Be Loaded.");
    });
    
    return false;
};

$('#form-container').submit(function(event) {
    loadData($(this).serializeArray());
    event.preventDefault();
});
