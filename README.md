<script src="js/drawMethods.js" charset="utf-8"></script>
# Canvas Drawing Extensions

<canvas></canvas>

This is a port of some of my old ActionScript drawing methods, updated for use with HTML canvas. The intent is to make them work as close to the default drawing methods as possible, so I've extended the native CanvasRenderingContext2D object so that they are called via the context object, just like lineTo or fill. Note that they only create the path of the shape, so to see it on a canvas you will need to call fill() or stroke() to render them.

The included methods are:

- path
- polygon
- roundedRect
- star/burst
- wedge

Please refer to the JS comments for useage.

The examples shown above are in a script tag within the HTML, this allows you to use this pen as an external resource for your own pens, just link to it in the JS pannel. :)

<script>
  // global vars
var canvas = document.querySelector('canvas');
var para = document.querySelector('p');
var ctx = canvas.getContext('2d');
var radians = Math.PI / 180; // multiply degrees by this to get radians :)
var pi2 = Math.PI * 2;
var cw = 600;
var ch = 200;
var path1 = [
  [0, 0],
  [40, 30],
  [40, 0],
  [50, 0],
  [50, 50],
  [10, 20],
  [10, 50],
  [0, 50]
];
var path2 = [
  [-20, 20],
  [-20, -15],
  [20, 15],
  [20, -20]
];

function draw() {
  canvas.width = cw;
  canvas.height = ch;
  // filled, closed path example
  ctx.fillStyle = 'rgba(64,0,128,0.4)';
  ctx.path(path1, 75, 75);
  ctx.fill();
  // open stroke path example
  ctx.strokeStyle = 'rgba(64,0,128,0.4)';
  ctx.lineWidth = 2;
  ctx.path(path2, 100, 100, false);
  ctx.stroke();
  // polygon example
  ctx.fillStyle = 'rgba(0,64,128,0.4)';
  ctx.polygon(200, 100, 30, 6, -90);
  ctx.fill();
  // star example
  ctx.fillStyle = 'rgba(64,128,0,0.4)';
  ctx.star(300, 100, 5, 15, 30, -90);
  ctx.fill();
  // starburst example
  ctx.fillStyle = 'rgba(128,0,64,0.4)';
  ctx.star(400, 100, 12, 15, 30, -90, true);
  ctx.fill();
  // wedge example
  ctx.fillStyle = 'rgba(0,128,64,0.4)';
  ctx.wedge(500, 100, 25, 270, 45);
  ctx.fill();
  ctx.fillStyle = 'rgba(128,64,0,0.4)';
  ctx.wedge(505, 100, 25, 90, -45);
  ctx.fill();
  // rounded rectangle example
  ctx.strokeStyle = 'rgba(128,64,192,0.4)';
  ctx.lineWidth = 3;
  ctx.roundedRect(10, 10, 580, 180, 20);
  ctx.stroke();
  // rounded rectange example with custom corner radii
  ctx.strokeStyle = 'rgba(64,0,64,0.2)';
  ctx.lineWidth = 1;
  ctx.roundedRect(2, 2, 596, 196, [0, 25, 0, 25]);
  ctx.stroke();
}
</script>
