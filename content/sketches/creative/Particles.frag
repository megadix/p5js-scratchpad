#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 resolution;

uniform int partCount;
uniform vec2 particles[30];
uniform vec3 partColors[30];
uniform float partFalloff[30];
uniform float partHalo[30];

//  Function from Iñigo Quiles
//  www.iquilezles.org/www/articles/functions/functions.htm
float expStep(float x, float k, float n){
    return exp(-k * pow(x, n));
}

void main() {
    vec2 st = vec2(1.0);

    // correct aspect ratio

    vec2 limit = vec2(1.0);

    if (resolution.x > resolution.y) {
        st = gl_FragCoord.xy / resolution.x;
        limit.y = resolution.y / resolution.x;
    }
    else if (resolution.y > resolution.x) {
        st = gl_FragCoord.xy / resolution.y;
        limit.x = resolution.x / resolution.y;
    }

    if (st.x < 0.0 || st.x > limit.x || st.y < 0.0 || st.y > limit.y) {
        discard;
    }

    vec4 color = vec4(0.0);
    float maxDist = distance(vec2(0.0), vec2(limit.x, limit.y));

    // particles
    for (int i = 0; i < 20; i++) {
        if (i < partCount) {
            vec2 pos = particles[i];
            vec3 partColor = partColors[i];
            float dist = distance(st, pos.xy);

            color.rgb += partColor * expStep(dist, partFalloff[i], partHalo[i]);
            color.a = 1.0;
        }
    }

    gl_FragColor = vec4(color);
}
