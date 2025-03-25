#version 300 es

/*
  Modified: 25-03-25
  Adapted to run with svader 

  Created: ...
  Author: https://github.com/bionboy
*/

#ifdef GL_ES
precision mediump float;
#endif

out vec4 fragColor;

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

vec2 squareAspectAndNormalize(in vec2 st, in vec2 resolution) {
  st = st.xy / resolution;
  float ratio = min(resolution.x, resolution.y);
  st.x *= resolution.x / ratio;
  st.y *= resolution.y / ratio;
  return st;
}

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

// Before Reading

void gridScaled(inout vec2 st, inout vec4 color) {
  float divisionSize = 0.05f;
  float lineWidth = 0.003f;
  vec2 mod = vec2(mod(st.x, divisionSize), mod(st.y, divisionSize));
  if (length(mod.x) < lineWidth) {
    paint(color, vec3(1.f, 0.4f, 0.0f), 1.0f);
  }
  if (length(mod.y) < lineWidth) {
    paint(color, vec3(1.f, 0.2f, 0.0f), 1.0f);
  }

  // Center lines
  // vec3 centerLineColor = vec3(.7, .3, .7);
  // if (length(st.x - 0.5) < lineWidth) {
  //   paint(color, centerLineColor, 1.0);
  // }
  // if (length(st.y - 0.5) < lineWidth) {
  //   paint(color, centerLineColor, 1.0);
  // }
}

void gridAbsolute(inout vec2 st, inout vec4 color) {
  float x = gl_FragCoord.x, y = gl_FragCoord.y;
  float divisionSize = 50.f;
  float lineWidth = 3.f;
  if (mod(x, divisionSize) < lineWidth)
    paint(color, vec3(0.5f, 0.5f, 0.7f), 1.0f);
  if (mod(y, divisionSize) < lineWidth)
    paint(color, vec3(0.5f, 0.7f, 0.5f), 1.0f);
}

void rectangleAbsolute(inout vec2 st, inout vec4 color) {
  float x = gl_FragCoord.x, y = gl_FragCoord.y;
  vec2 offset = vec2(10.f, 10.f);
  vec2 size = vec2(80.f, 80.f);

  if ((offset.x < x && x < offset.x + size.x) &&
    (offset.y < y && y < offset.y + size.y)) {
    paint(color, vec3(1.0f, 0.0f, 0.0f), 1.0f);
  }
}

// During Reading

void rectangleCentered(inout vec2 st, inout vec4 color) {
  float size = 0.85f;
  float pct = 1.f;

  vec2 bl = step(vec2(1.f - size), st);
  pct = bl.x * bl.y;

  vec2 tr = step(vec2(1.f - size), 1.0f - st);
  pct *= tr.x * tr.y;

  paint(color, vec3(1.0f, 0.5f, 0.0f), pct);
}

void rectangleCenteredSmooth(inout vec2 st, inout vec4 color) {
  float size = 0.80f;
  float edgeWidth = 0.05f;
  vec2 edge = vec2(1.f - size);

  vec2 bl = smoothstep(edge, edge + vec2(edgeWidth), st);
  float pct = bl.x * bl.y;

  vec2 tr = smoothstep(edge, edge + vec2(edgeWidth), 1.0f - st);
  pct *= tr.x * tr.y;

  paint(color, vec3(1.0f, 0.7f, 0.0f), pct);
}

void rectangleCenteredFloor(inout vec2 st, inout vec4 color) {
  float size = 0.70f;

  vec2 bl = floor(st + size);
  float pct = bl.x * bl.y;

  vec2 tr = floor(1.0f - st + size);
  pct *= tr.x * tr.y;

  paint(color, vec4(1.0f, 1.0f, 0.0f, .3f), pct);
}

// After Reading

void rectangleResuable(in vec2 st, inout vec4 canvas, vec2 size, vec2 offset, float blur, vec4 color) {
  blur = max(blur, 0.000001f);

  vec2 start = offset;
  vec2 end = vec2(1.f - size - offset);

  vec2 bl = smoothstep(start, start + vec2(blur), st);
  float pct = bl.x * bl.y;

  vec2 tr = smoothstep(end, end + vec2(blur), 1.0f - st);
  pct *= tr.x * tr.y;

  paint(canvas, color, pct);
}

float timeWiggle(in float speed, in float amplitude, in float offset) {
  return (sin(u_time * speed + offset) + 1.0f) / 2.0f * amplitude;
}

float timeWiggle(in float speed, in float amplitude) {
  return timeWiggle(speed, amplitude, 0.0f);
}

void main() {
  vec2 st = gl_FragCoord.xy / u_resolution;
  vec4 canvas = vec4(0, 0, 0, 1);

  vec4 c = vec4(1, .5f, 0, 1);

  gridScaled(st, canvas);
  // gridAbsolute(st, canvas);

  rectangleCentered(st, canvas);
  rectangleAbsolute(st, canvas);
  rectangleCenteredSmooth(st, canvas);
  rectangleCenteredFloor(st, canvas);

  for (int i = 0; i < 40; i++) {
    vec2 offset = vec2(0.f + float(i) * .018f);
    vec2 size = vec2(.005f + float(i) * .01f);
    offset.y += timeWiggle(2.f, .05f, float(i) * .5f);
    rectangleResuable(st, canvas, size, offset, 0.05f, vec4(c.gbb, 0.1f)); // orange
  }

  vec2 size = vec2(.3f, .15f + timeWiggle(1.f, .09f));
  vec2 offset = vec2(0.35f, .35f + timeWiggle(2.f, .01f));
  rectangleResuable(st, canvas, size, offset, .02f, vec4(c.rrb, .8f));

  rectangleResuable(st, canvas, vec2(.2f), vec2(.15f, .65f), 0.11f, c.rrba); //  yellow shine
  // rectangleResuable(st, canvas, vec2(.2), vec2(.6), .1, c.ggra); // purple

  fragColor = canvas;
}