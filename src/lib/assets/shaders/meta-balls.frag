#version 300 es

/*
  Modified: 2025-03-10
  Adapted to run with svader 

  Created: 2025-03-10
  Author: https://github.com/bionboy
*/

#ifdef GL_ES
precision mediump float;
#endif

out vec4 fragColor;

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

void paint(inout vec4 canvas, vec4 brush, float pct) {
  if (pct <= 0.0f) {
    return;
  }

  pct *= brush.a;

  if (length(canvas) > 0.0f) {
    canvas = vec4(mix(canvas.rgb, brush.rgb, pct), 1);
  } else {
    canvas += vec4(brush.rgb, pct);
  }
}
void paint(inout vec4 canvas, vec3 brush, float pct) {
  paint(canvas, vec4(brush, pct), pct);
}

/*
  based on circleBR
  funk should be inversely proportional to the number of balls
*/
void metaBall(in vec2 st, inout vec4 canvas, float funk, float radius, vec2 offset) {
  float d = distance(st, offset);
  float fromCenter = d / radius;
  // float funk = 2.;
  // float funk = -2.;

  vec4 brush = vec4(vec3(0.5843f, 0.2745f, 0.502f), 1);
  brush.a = pow(fromCenter, funk);
  // brush.a = pow(fromCenter, .9);

  // paint(canvas, brush, 1.);
  canvas = vec4(mix(canvas.rgb, brush.rgb, brush.a), 1.f);
}

/*
  CAUTION: This will break the canvas for all the other drawings
*/
void metaBalls(in vec2 st, inout vec4 canvas) {
  vec4 metaCanvas = vec4(0, 0, 0, 1);
  float r, funk;
  r = .05f;
  funk = 2.f;
  // funk = -2.;
  funk = .8f;

  // scan
  funk += sin(u_time * .25f) * .1f;
  // funk *= sin(u_time * .5) * 2.;

  float wiggleFactor = .2f;

  float offsetX = .5f;

  metaBall(st, metaCanvas, funk, r, vec2(offsetX, .45f + sin(u_time) * wiggleFactor));
  metaBall(st, metaCanvas, funk, r, vec2(offsetX, .55f + sin(u_time * 2.f) * wiggleFactor));
  metaBall(st, metaCanvas, funk, r, vec2(offsetX + sin(u_time * 2.f) * wiggleFactor, .5f));
  metaBall(st, metaCanvas, funk, r, vec2(offsetX - sin(u_time + .5f * 2.f) * wiggleFactor, .5f));
  metaBall(st, metaCanvas, funk, r, vec2(u_mouse.x, u_mouse.y));

  // canvas += metaCanvas;
  // canvas *= metaCanvas;
  paint(canvas, metaCanvas, metaCanvas.a);
}

void main() {
  vec2 st = gl_FragCoord.xy / u_resolution;
  vec4 canvas = vec4(0.0f, 0.0f, 0.0f, 0.0f);

  metaBalls(st, canvas);

  // gl_FragColor = canvas;
  fragColor = canvas;
}