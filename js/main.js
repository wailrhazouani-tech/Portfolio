(function () {
  var map = {
    1: "index.html",
    2: "bio.html",
    3: "portfolio.html",
    4: "elevator-pitch.html"
  };

  var hud = document.createElement("aside");
  hud.className = "shortcut-hud";
  hud.setAttribute("aria-live", "polite");
  hud.innerHTML =
    "<p>Keyboard shortcuts</p>" +
    "<ul>" +
    "<li>ALT+1 Home</li>" +
    "<li>ALT+2 Bio</li>" +
    "<li>ALT+3 Portfolio</li>" +
    "<li>ALT+4 Elevator Pitch</li>" +
    "<li>? Toggle this panel</li>" +
    "</ul>";
  document.body.appendChild(hud);

  document.addEventListener("keydown", function (event) {
    if (event.altKey && map[event.key]) {
      event.preventDefault();
      window.location.href = map[event.key];
    }

    if (event.key === "?") {
      hud.classList.toggle("visible");
    }

    if (event.key === "Escape") {
      hud.classList.remove("visible");
    }
  });
})();
