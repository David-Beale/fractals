export const _FS = `
precision highp float;

uniform vec2 resolution;
uniform float ratio;
uniform vec2 center;
uniform float scale;
uniform float counter;
uniform vec2 fractal;
uniform vec3 color;


void main() {
  float maxN = 250.0;
  float a = ratio  * ((gl_FragCoord.x / resolution.x - 0.5) * scale + center.x);
  float b = (gl_FragCoord.y / resolution.y - 0.5) * scale + center.y;

  float ca = a;
  float cb = b;
  if(fractal.x < 1.0) ca = fractal.x;
  if(fractal.y < 1.0) cb = fractal.y;
  float a2 = 0.0;
  float b2 = 0.0;

  float n = 0.0;
  for (; n < maxN; n++){
    a2 = a * a;
    b2 = b * b;
    
    b = (a + a) * b + cb;
    a = a2 - b2 + ca;
    if(a2 + b2 > 4.0){
      break;
    }
  }

  float brightness;
  if(n == maxN) {
    brightness = -0.1;
  }
  else {
    vec2 z = vec2(a,b);
    float sl = n - log2(log2(dot(z,z)));

    float al = 2.0 + 5.0 * cos(counter);
    brightness = counter/10.0 * mix( n, sl, al );

  } 
  vec3 col= vec3(0.0);
  col += 0.5 + 0.6*cos( 2.7 + brightness + color);

  gl_FragColor = vec4(col, 1.0);
    }
`;
