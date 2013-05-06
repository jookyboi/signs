$(function() {
    var DISTANCE_MULTIPLE = 7000;

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

            var $point = $(Handlebars.templates.point(templatePoint));
            $(".street-inner-left").append($point);
        } else {
            templatePoint.style = "top: " + topPx + "px; left: 0;";

            var $point = $(Handlebars.templates.point(templatePoint));
            $(".street-inner-right").append($point);
        }

        // deal with offsets
        if (point.offset) {
            $point.find("img").css({
                "-webkit-mask-position": point.offset + "px 0px",
                "margin-left": -(point.offset - 3) + "px"
            });
        }

    });

    // hook up fancybox
    $(".point").each(function() {
        $(this).fancybox({
            href: $(this).attr("data-href")
        });
    })
});