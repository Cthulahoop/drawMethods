/**
 *  DRAW METHODS
 */

var radians = Math.PI / 180; // multiply degrees by this to get radians :)
var pi2 = Math.PI * 2;

/**
 * creates a polygon shape path with n sides at the specified radius
 *
 * @param  {number} centerX  center x of polygon
 * @param  {number} centerY  center y of polygon
 * @param  {number} radius   radius of points from center
 * @param  {number} sides    number of sides for the polygon
 * @param  {number} rotation rotation of the polygon in degrees
 */
CanvasRenderingContext2D.prototype.polygon = function(centerX, centerY, radius, sides, rotation) {
  if (arguments.length < 4) {
    return;
  }
  this.save();
  var step, s, dx, dy;
  step = pi2 / sides;
  this.translate(centerX, centerY);
  if(typeof rotation != 'undefined') {
    this.rotate(rotation * radians);
  }
  this.beginPath();
  for (s = 0; s <= sides; s++) {
    dx = Math.cos(step * s) * radius;
    dy = Math.sin(step * s) * radius;
    this.lineTo(dx, dy);
  }
  this.closePath();
  this.restore();
}

/**
 * creates a star shaped path based on parameters
 * @param  {number}  centerX      center x of star
 * @param  {number}  centerY      center y of star
 * @param  {number}  points       number of points in star
 * @param  {number}  innerRadius  radius of inner points of star
 * @param  {number}  outerRadius  radius of outer points of star
 * @param  {number}  [rotation]   rotation of star in degrees
 * @param  {boolean} [roundInner] flag for rounding inner points (default: false)
 */
CanvasRenderingContext2D.prototype.star = function(centerX, centerY, points, innerRadius, outerRadius, rotation, roundInner) {
  if (arguments.length < 5) {
    return;
  }
  var step, half, start, n, cx, cy, dx, dy;

  this.save();
  this.beginPath();
  this.translate(centerX, centerY);
  this.rotate(rotation * radians);
  rotation = typeof rotation == 'undefined' ? 0 : rotation;
  roundInner = typeof roundInner == 'undefined' ? false : roundInner;
  // calculate distance between points
  step = pi2 / points;
  half = step / 2;
  this.moveTo(outerRadius, 0);
  // loop through points and draw lines
  for (p = 1; p <= points; p++) {
    dx = Math.cos(step * p) * outerRadius;
    dy = Math.sin(step * p) * outerRadius;
    cx = Math.cos((step * p) - half) * innerRadius;
    cy = Math.sin((step * p) - half) * innerRadius;
    if (roundInner) {
      this.quadraticCurveTo(cx, cy, dx, dy);
    } else {
      this.lineTo(cx, cy);
      this.lineTo(dx, dy);
    }
  }
  this.restore();
};

/**
 * creates a wedge shape path based on parameters
 * @param  {number} centerX  center point x of wedge
 * @param  {number} centerY  center point y of wedge
 * @param  {number} radius   radius of outer edge of wedge
 * @param  {number} sweep    how wide the wedge is in degrees
 * @param  {number} rotation rotation of wedge in degrees
 */
CanvasRenderingContext2D.prototype.wedge = function(centerX, centerY, radius, sweep, rotation) {
  if (arguments.length < 4) {
    return;
  }
  this.save();
  var arc, s, dx, dy;
  rotation = typeof rotation == 'undefined' ? 0 : rotation;
  arc = sweep * radians;
  this.translate(centerX, centerY);
  this.rotate(rotation * radians);
  this.beginPath();
  this.moveTo(0, 0);
  this.lineTo(radius, 0);
  this.arc(0, 0, radius, 0, arc);
  this.lineTo(0, 0);
  this.closePath();
  this.restore();
}

/**
 * creates a rounded rectangular shape path
 * @param  {number} top    y position of top edge of rect
 * @param  {number} left   x position of left edge of rect
 * @param  {number} width  width of rect
 * @param  {number} height height of rect
 * @param  {number} radius corner radius (applied to all corners) or can be an
 *                         array of numbers as radii to apply to each corner
 *                         starting top left and progressing clockwise.
 */
CanvasRenderingContext2D.prototype.roundedRect = function(top, left, width, height, radius) {
  if (arguments.length < 5) {
    return;
  }
  this.save();
  var arc, r, dx, dy;
  r = [];
  if (Array.isArray(radius)) {
    for (var n = 0; n < 4; n++) {
      r[n] = Math.min(radius[n], width / 2, height / 2) || 0;
    }
  } else {
    radius = Math.min(radius, width / 2, height / 2);
    r = [radius, radius, radius, radius];
  }
  this.translate(left, top);
  this.beginPath();
  this.moveTo(0, r[0]);
  this.arcTo(0, 0, r[0], 0, r[0]);
  this.lineTo(width - r[1], 0);
  this.arcTo(width, 0, width, r[1], r[1]);
  this.lineTo(width, height - r[2]);
  this.arcTo(width, height, width - r[2], height, r[2]);
  this.lineTo(r[3], height);
  this.arcTo(0, height, 0, height - r[3], r[3]);
  this.closePath();
  this.restore();
}

/**
 * draws a shape from an array of points
 * @param  {array}   points  an array of points in [x,y] format
 * @param  {number}  [offsetX] origin point x for shape (defualt 0)
 * @param  {number}  [offsetY] origin point y for shape (defualt 0)
 * @param  {boolean} [closed]  flag for closing the path (default true)
 */
CanvasRenderingContext2D.prototype.path = function(points, offsetX, offsetY, closed) {
  if (arguments.length < 1 || points.length < 2) {
    return;
  }
  offsetX = typeof offsetX == 'undefined' ? 0 : offsetX;
  offsetY = typeof offsetY == 'undefined' ? 0 : offsetY;
  closed = typeof closed == 'undefined' ? true : closed;
  this.save();
  this.translate(offsetX, offsetY);
  this.beginPath();
  this.moveTo(points[0][0], points[0][1]);
  for (var n = 1; n < points.length; n++) {
    this.lineTo(points[n][0], points[n][1]);
  }
  if (closed) {
    this.closePath();
  }
  this.restore();
}

draw();
