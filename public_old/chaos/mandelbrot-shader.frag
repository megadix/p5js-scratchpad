precision highp float;

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform vec2 u_min;
uniform vec2 u_max;

const float max_iterations = 16.0;

uniform float u_max_iterations;

vec3 colorA = vec3(0.149, 0.141, 0.912);
vec3 colorB = vec3(1.000, 0.833, 0.224);

vec2 map(vec2 p, vec2 from_start, vec2 from_end, vec2 to_start, vec2 to_end) {
    return (p - from_start) / (from_end - from_start) * (to_end - to_start) + to_start;
}

void main() {
    // current normalized [0.0; 1.0) coordinates
    vec2 coord = gl_FragCoord.xy / u_resolution.xy;
    // calculate cartesian coordinates of point
    vec2 zero = vec2(0.0, 0.0);
    vec2 one = vec2(1.0, 1.0);
    vec2 p = map(coord, zero, one, u_min, u_max);

    float re = 0.0;
    float im = 0.0;
    float re_square = 0.0;
    float im_square = 0.0;

    float count = 0.0;

    for(float i = 0.0; i < max_iterations; i++) {
        float re1 = re_square - im_square + p.x;
        float im1 = 2.0 * re * im + p.y;
        re = re1;
        im = im1;
        re_square = re * re;
        im_square = im * im;

        if (dot(re_square, im_square) > 4.0) {
            count = i;
        }
        if (i > u_max_iterations) {
          break;
        }
    }

    // see:
    // https://thebookofshaders.com/05/
    // https://thebookofshaders.com/06/
    vec3 pct = vec3(count / max_iterations);
    pct.r = pow(pct.r, 0.3);
    pct.g = pow(pct.g, 2.7);
    pct.b = pow(pct.b, 3.1);

    vec3 color = mix(colorA, colorB, pct);

    gl_FragColor = vec4(color, 1.0);

    // vec3 color = vec3(0.0);
    // color = mix(colorA, colorB, count / max_iterations);
    // gl_FragColor = vec4(color, 1.0);
}
