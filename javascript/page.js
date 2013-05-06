$(function() {
    var DISTANCE_MULTIPLE = 4500;

    // compile templates
    $.each(points, function(i, point) {
        if (point.name === "")
            return;

        var templatePoint = {
            name: point.name,
            address: point.address,
            image: point.image,
            types: point.types.join(",")
        };

        var topPx = DISTANCE_MULTIPLE * point.distance + 20;

        if (point.side === "left") {
            templatePoint.style = "top: " + topPx + "px; right: 0;";
            $(".street-inner-left").append(Handlebars.templates.point(templatePoint));
        } else {
            templatePoint.style = "top: " + topPx + "px; left: 0;";
            $(".street-inner-right").append(Handlebars.templates.point(templatePoint));
        }
    });

    // hook up fancybox
    $(".point").each(function() {
        $(this).fancybox({
            href: $(this).attr("data-href")
        });
    })
});