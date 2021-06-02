require("./arctext");

$(function () {
  insertStars(1000);
  nova();
  $(".rocket .body .name, .rocket .body .title").arctext({
    radius: 500,
    dir: -1,
  });
  $(".rocket").css("opacity", "1");
  if ($(document).scrollTop() > 0) {
    $(".navBox").addClass("scrolled");
    if (
      window.location.hash == "about" ||
      window.location.hash == "work" ||
      window.location.hash == "contact"
    ) {
      $("a." + window.location.hash).addClass("active");
    }
  }
  $(document).on("scroll", onScroll);

  $(".navBox a").on("click", function (e) {
    e.preventDefault();
    $(".navBox a").not(this).removeClass("active");

    const target = this.hash;

    $("html")
      .stop()
      .animate(
        {
          scrollTop: $(target).position().top,
        },
        600,
        "swing",
        function () {
          window.location.hash = target;
        }
      );
  });
});

function onScroll() {
  var scrollPos = $(document).scrollTop();
  if (scrollPos > 0) {
    $(".navBox").addClass("scrolled");
    $(".rocket").removeClass("bounce");
  } else {
    $(".navBox").removeClass("scrolled");
    $(".rocket").addClass("bounce");
  }

  const homeHeight = $("#home").height();
  const s = scale(scrollPos * 2, 0, homeHeight, 1, 0);
  const t = scale(scrollPos * 2, 0, homeHeight, 0, -50);

  $(".rocket").css("transform", "scale(" + s + ")");
  $(".rocket").css("top", t + "%");

  $(".navBox a").each(function () {
    const link = $(this);
    const section = $(link.attr("href"));
    if (
      section.position().top <= scrollPos + 1 &&
      section.position().top + section.height() > scrollPos
    ) {
      $(".navBox a").removeClass("active");
      link.addClass("active");
    } else {
      link.removeClass("active");
    }
  });
}

function insertStars(x) {
  const sky = $(".sky");
  let skyHtml = "";
  for (var i = 0; i < x; i++) {
    let left = Math.random() * (100 - 0) + 0;
    let top = Math.random() * (100 - 0) + 0;
    skyHtml += `<div class="star" style="left:${left}%;top:${top}%;"></div>`;
  }
  sky.html(skyHtml);
}

function nova() {
  const stars = $(".sky .star").not(".nova");

  const shuffled = stars.sort(() => 0.5 - Math.random());

  let selected = shuffled.slice(0, 1);

  selected.addClass("nova");

  setTimeout(function () {
    nova();
  }, 5000);
}

function scale(number, inMin, inMax, outMin, outMax) {
  return ((number - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
}
