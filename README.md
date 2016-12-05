# Canvas Drawing Extensions

This is a port of some of my old ActionScript drawing methods, updated for use with HTML canvas. The intent is to make them work as close to the default drawing methods as possible, so I've extended the native CanvasRenderingContext2D object so that they are called via the context object, just like lineTo or fill. Note that they only create the path of the shape, so to see it on a canvas you will need to call fill() or stroke() to render them.

The included methods are:

- path
- polygon
- roundedRect
- star/burst
- wedge

Please refer to the JS comments for useage.
