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

// #define BG_COLOR vec4(0, 0, 0, 1)
#define BG_COLOR vec4(0, 0, 0, 0)

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

void paint(inout vec4 canvas, vec4 brush, float pct, bool direct) {
  if (pct <= 0.0f) {
    return;
  }

  if (direct == true) {
    canvas = brush;
    return;
  }

  pct *= brush.a;

  if (length(canvas) > 0.0f) {
    canvas = vec4(mix(canvas.rgb, brush.rgb, pct), 1);
  } else {
    // canvas += vec4(brush.rgb, pct);
  }

  if (canvas == BG_COLOR) {
    // inverse
    // canvas = vec4(1) - brush;
  }
}
void paint(inout vec4 canvas, vec4 brush, float pct) {
  paint(canvas, brush, pct, false);
}
void paint(inout vec4 canvas, vec3 brush, float pct) {
  paint(canvas, vec4(brush, pct), pct, false);
}

// Before Reading

void gridScaled(inout vec2 st, inout vec4 color) {
  float divisionSize = 0.025f;
  float lineWidth = 0.0025f;
  vec2 mod = vec2(mod(st.x, divisionSize), mod(st.y, divisionSize));
  if (length(mod.x) < lineWidth) {
    paint(color, vec4(1.f, 0.4f, 0.0f, 1.0f), 1.0f, true);
  }
  if (length(mod.y) < lineWidth) {
    paint(color, vec4(1.f, 0.2f, 0.0f, 1.0f), 1.0f, true);
  }

  // Center lines
  const int coordsLen = 5;
  vec2 coords[coordsLen];
  coords[0] = vec2(.5f);
  coords[1] = vec2(.25f);
  coords[2] = vec2(.25f, .75f);
  coords[3] = vec2(.75f, .25f);
  coords[4] = vec2(.75f);

  for (int i = 0; i < coordsLen; i++) {
    vec2 coord = coords[i];
    if ((length(st.x - coord.x) < lineWidth) ||
      (length(st.y - coord.y) < lineWidth)) {
      paint(color, vec4(1.f, .15f, 0.f, 0.5f), 1.0f, true);
    }
  }
}

void gridAbsolute(inout vec2 st, inout vec4 color) {
  float x = gl_FragCoord.x, y = gl_FragCoord.y;
  float divisionSize = 50.f;
  float lineWidth = 3.f;
  if (mod(x, divisionSize) < lineWidth)
    paint(color, vec4(0.5f, 0.5f, 0.7f, 1.f), 1.0f, true);
  if (mod(y, divisionSize) < lineWidth)
    paint(color, vec4(0.5f, 0.7f, 0.5f, 1.f), 1.0f, true);
}

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

void hoverGrid(inout vec2 st, inout vec2 mouse, inout vec4 canvas, int variant) {
  vec4 c = vec4(1, .5f, 0, 1);

  if (variant == 0) {
    gridScaled(st, canvas);
  } else if (variant == 1) {
    gridAbsolute(st, canvas);
  } else {
    return;
  }

  vec2 size = vec2(.5f + timeWiggle(4.f, .01f));
  vec2 offset = mouse - size.x / 2.f;
  rectangleResuable(st, canvas, size, offset, .2f, vec4(c.rrb, .8f));
}

void main() {
  vec2 st = gl_FragCoord.xy / u_resolution;
  // vec2 mouse = u_mouse / u_resolution;
  vec2 mouse = u_mouse;
  vec4 canvas = BG_COLOR;

  if (sin(u_time * .25f) <= 0.f) {
    hoverGrid(st, mouse, canvas, 0);
  } else {
    hoverGrid(st, mouse, canvas, 1);
  }

  fragColor = canvas;
}