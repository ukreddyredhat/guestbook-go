$(document).ready(function() {
  var headerTitleElement = $("#header h1");
  var entriesElement = $("#demo-entries");
  var formElement = $("#demo-form");
  var submitElement = $("#demo-submit");
  var entryContentElement = $("#demo-entry-content");
  var hostAddressElement = $("#demo-host-address");

  var appenddemoEntries = function(data) {
    entriesElement.empty();
    $.each(data, function(key, val) {
      entriesElement.append("<p>" + val + "</p>");
    });
  }

  var handleSubmission = function(e) {
    e.preventDefault();
    var entryValue = entryContentElement.val()
    if (entryValue.length > 0) {
      entriesElement.append("<p>...</p>");
      $.getJSON("rpush/demo/" + entryValue, appenddemoEntries);
    }
    return false;
  }

  // colors = purple, blue, red, green, yellow
  var colors = ["#549", "#18d", "#d31", "#2a4", "#db1"];
  var randomColor = colors[Math.floor(5 * Math.random())];
  (function setElementsColor(color) {
    headerTitleElement.css("color", color);
    entryContentElement.css("box-shadow", "inset 0 0 0 2px " + color);
    submitElement.css("background-color", color);
  })(randomColor);

  submitElement.click(handleSubmission);
  formElement.submit(handleSubmission);
  hostAddressElement.append(document.URL);

  // Poll every second.
  (function fetchdemo() {
    $.getJSON("lrange/demo").done(appenddemoEntries).always(
      function() {
        setTimeout(fetchdemo, 1000);
      });
  })();
});
