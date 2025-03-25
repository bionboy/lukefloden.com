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

#define CIRCLE_COLOR vec3(0.5843, 0.2745, 0.502)
// #define CIRCLE_COLOR vec3(0.1804, 0.4314, 0.1412)

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

/*
  Circle function created Before Reading this section in TBOS
*/
void circleBR(in vec2 st, inout vec4 canvas, vec2 offset, float radius) {
  float d = distance(st, offset);
  float fromCenter = d / radius;
  // vec4 brush = vec4(0.2275, 0.1882, 0.7882, 1.0);
  vec4 brush = vec4(CIRCLE_COLOR, pow(fromCenter, 4.f));

  if (d <= radius) {
    paint(canvas, brush, 1.0f);
  }
}

void bubble(in vec2 st, inout vec4 canvas, vec2 offset, float radius) {
  circleBR(st, canvas, vec2(offset.x, offset.y + sin(u_time * 2.f) * .05f), radius);
}

/*
  Circle function created After Reading this section in TBOS
*/
void circleAR(in vec2 st, inout vec4 canvas, vec2 offset, float radius) {
  float d = distance(st, offset);
  float fromCenter = d / radius;
  vec4 brush = vec4(CIRCLE_COLOR, pow(fromCenter, 4.f));
  // vec4 brush = vec4(vec3(0.5843, 0.2745, 0.502), .1);

  // canvas += brush * step(d, radius);
  paint(canvas, brush, step(d, radius));
  // canvas.a = brush.a;

  // fuzzy
  // canvas += brush * smoothstep(d - .02, d, radius); 
}

/*
  After Reading
*/
void lensFlare(in vec2 st, inout vec4 canvas, vec2 offset, float radius) {
  float d = distance(st, offset);
  vec4 brush = vec4(CIRCLE_COLOR, 1.f);

  canvas += brush * radius / d;
  // canvas += brush * d / radius;

  // TODO: make it have the line that lens flares have too
}

/*
  Modified function from TBOS,
  this function avoids using anything that depends on `sqrt`
  ! NOTE: The radius isn't the same as the other functions, its way bigger for the same value...
  ! Probably because this isn't the radius!!!!
  I guess it depends on your reference, but this is confusing to me after writing the other code
*/
void circleEfficient(in vec2 st, inout vec4 canvas, in vec2 offset, in float radius) {
  vec2 dist = st - offset;

  float circle = 1.f - smoothstep(radius - (radius * 0.01f), radius + (radius * 0.01f), dot(dist, dist) * 4.0f);

  paint(canvas, CIRCLE_COLOR, circle);
}

void main() {
  vec2 st = gl_FragCoord.xy / u_resolution;
  vec4 canvas = vec4(0.0f, 0.0f, 1.0f, 1.0f);
  // vec4 canvas = vec4(0.0118, 0.1765, 0.0824, 0.813);

  bubble(st, canvas, vec2(.125f, .825f), .1f);
  bubble(st, canvas, vec2(.125f, .825f), .1f);
  bubble(st, canvas, vec2(.2f, .75f), .05f);

  circleAR(st, canvas, vec2(.8f, .8f), .1f);
  lensFlare(st, canvas, vec2(.22f, .22f), .2f + cos(u_time * 1.f) * .02f);

  float rEff = .01f;
  circleEfficient(st, canvas, vec2(.8f, .2f), rEff);
  circleEfficient(st, canvas, vec2(.76f, .15f), rEff);
  circleEfficient(st, canvas, vec2(.84f, .15f), rEff);
  lensFlare(st, canvas, vec2(.8f, .17f), .02f);

  fragColor = canvas;
}