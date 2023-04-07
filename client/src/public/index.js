let menuButton = document.getElementById("menu-toggle");
menuButton.addEventListener("click", function () {
  let flyout = document.getElementById("mobile-menu").classList;
  flyout.toggle("hidden");
  flyout.toggle("block");
});
