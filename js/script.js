
function loadData(data) {

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
    
    $greeting.text('So, you want to live at ' + data_obj.street + ", " + data_obj.city);
    $body.append('<img class="bgimg" src="' + img_src + '">' );

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview

    // YOUR CODE GOES HERE!

    return false;
};

$('#form-container').submit(function(event) {
    loadData($(this).serializeArray());
    event.preventDefault();
});
