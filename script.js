var $ = jQuery;

$(".wheel-knob").on("click", function () {
  var numSegments = 20; // Example: 8 segments on the wheel
  var segmentAngle = 360 / numSegments; // Calculate the angle for each segment

  // Choose a random segment to stop on
  var randomSegment = Math.floor(Math.random() * numSegments);

  // Calculate the final angle to land on the selected segment
  // Add an additional random small offset to simulate "stopping" between segments
  var offset = Math.random() * (segmentAngle - 10); // Small random offset to make it more realistic
  var finalAngle = randomSegment * segmentAngle + offset;

  // Add multiple full rotations to ensure it spins enough before stopping
  var totalAngle = 360 * 5 + finalAngle; // 5 full spins + final segment angle

  $(".innerWheelContainer").css({
    transition: "transform 4s ease-out",
    transform: "rotate(" + totalAngle + "deg)",
  });

  $(".innerWheelContainer").one("transitionend", function () {
    // Calculate the final angle within 360 degrees
    var finalAngleWithin360 = finalAngle % 360;

    // Reset the angle to the equivalent within 0-360 degrees range
    $(this).css({
      transition: "none",
      transform: "rotate(" + finalAngleWithin360 + "deg)",
    });

    // Force a reflow to ensure the previous transform is applied before transitioning again
    $(this)[0].offsetHeight;

    // Re-enable the transition (optional)
    $(this).css({
      transition: "transform 4s ease-out",
    });
  });
});
