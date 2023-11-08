precision highp float;

#define PI 3.14159265359
#define G 1.0

const float max_iterations = 10.0;

uniform vec2 resolution;
uniform float num_iter;
uniform float dt;
uniform float l1;
uniform float l2;
uniform float m1;
uniform float m2;

float map(float value, float min1, float max1, float min2, float max2) {
    return min2 + (value - min1) * (max2 - min2) / (max1 - min1);
}

void main() {
    vec2 coord = gl_FragCoord.xy / resolution.xy;

    float theta1 = map(coord.x, 0.0, 1.0, -PI / 2.0, PI / 2.0);
    float theta1_v = 0.0;
    float theta1_a = 0.0;

    float theta2 = map(coord.y, 0.0, 1.0, -PI / 2.0, PI / 2.0);
    float theta2_v = 0.0;
    float theta2_a = 0.0;

    for (float i = 0.0; i < max_iterations; i++) {
        float theta1_a_num = -G * (2.0 * m1 + m2) * sin(theta1) - m2 * G * sin(theta1 - 2.0 * theta2) -2.0 * sin(theta1 - theta2) * m2 * (theta2_v * theta2_v * l2 + theta1_v * theta1_v * l1 * cos(theta1 - theta2));
        float theta1_a_den = l1 * (2.0 * m1 + m2 - m2 * cos(2.0 * theta1 - 2.0 * theta2));

        theta1_a = theta1_a_num / theta1_a_den;

        float theta2_a_num = 2.0 * sin(theta1 - theta2) * (theta1_v * theta1_v * l1 * (m1 + m2) + G * (m1 + m2) * cos(theta1) +        theta2_v * theta2_v * l2 * m2 * cos(theta1 - theta2));
        float theta2_a_den = l2 * (2.0 * m1 + m2 - m2 * cos(2.0 * theta1 - 2.0 * theta2));

        theta2_a = theta2_a_num / theta2_a_den;

        theta1_v += theta1_a * dt;
        theta2_v += theta2_a * dt;

        theta1 += theta1_v * dt;
        theta2 += theta2_v * dt;

        vec3 color = vec3(
        map(theta1, -PI / 2.0, PI / 2.0, 0.0, 1.0),
        map(theta2, -PI / 2.0, PI / 2.0, 0.0, 1.0),
        1.0
        );

        gl_FragColor = vec4(color, 1.0);

        if (i > num_iter) {
            break;
        }
    }
}