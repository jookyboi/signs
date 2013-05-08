$(function() {
    var DISTANCE_MULTIPLE = 11000;

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
    });

    // wire up filters
    var $selectAll = $(".options li[data-type='all']");
    var $formFunction = $(".options .form, .options .function");

    $selectAll.unbind("click").click(function() {
        var $circle = $(this).find(">span");
        $circle.toggleClass("option-on");

        $formFunction.find(">span").toggleClass("option-on", $circle.hasClass("option-on"));
        disablePoints();
    });

    $formFunction.unbind("click").click(function() {
        var $circle = $(this).find(">span");

        if ($circle.hasClass("option-on")) {
            // special case of all being on
            // we turn off all others
            if ($selectAll.find(">span").hasClass("option-on")) {
                $selectAll.click();
                $circle.toggleClass("option-on", true);
            } else {
                $circle.toggleClass("option-on", false);
            }
        } else {
            $circle.toggleClass("option-on", true);

            // in case everything else is also turned on
            if ($formFunction.find(">span").filter(".option-on").length === $formFunction.length)
                $selectAll.find(">span").toggleClass("option-on", true);
        }

        disablePoints();
    });

    function disablePoints() {
        var formTypes = [], functionTypes = [];

        $(".options .form").find(">span").filter(".option-on").each(function() {
            formTypes.push($(this).closest("li").attr("data-type"));
        });

        $(".options .function").find(">span").filter(".option-on").each(function() {
            functionTypes.push($(this).closest("li").attr("data-type"));
        });

        $(".point").each(function() {
            // OR within each form/function type
            // AND between form/function
            var types = $(this).attr("data-types").split(",");
            var formMatches = _.intersection(formTypes, types);
            var functionMatches = _.intersection(functionTypes, types);

            var show = false;
            if (formTypes.length === 0) {
                show = functionMatches.length > 0;
            } else if (functionTypes.length === 0) {
                show = formMatches.length > 0;
            } else {
                show = formMatches.length > 0 && functionMatches.length > 0;
            }

            $(this).toggleClass("disabled", !show);
        });
    }
});