var dweetioThing = 'putz-frosh-thing-a-jig';
var currentCount = 0;

$(document).ready(function() {
    // Initialize status
    dweetio.get_latest_dweet_for(dweetioThing, function(err, dweet){
        var dweet = dweet[0]; // Dweet is always an array of 1
        setCount(dweet.content.count);
    });

    // Set a socket poller
    dweetio.listen_for(dweetioThing, function(dweet) {
        setCount(dweet.content.count);
    });

    $('#plus').click(function() {
        plus();
    });

    $('#minus').click(function() {
        minus();
    });
});

function setCount(text) {
    currentCount = parseInt(text);
    $('.number').text(text);
}

function plus() {
    currentCount += 1;
    dweetio.dweet_for(dweetioThing, {count: currentCount.toString()}, function(err, dweet){
    });

    setCount(currentCount.toString());
}

function minus() {
    currentCount -= 1;
    dweetio.dweet_for(dweetioThing, {count: currentCount.toString()}, function(err, dweet){
    });

    setCount(currentCount.toString());
}