precision mediump float;
uniform vec2 size;
varying vec2 v_coords;

uniform float angle;
uniform vec3 startColor;
uniform vec3 endColor;
uniform float thickness;

float smooth_edge(float distance, float edge_width) {
    float aa = edge_width * 0.5;
    return smoothstep(aa, -aa, distance);
}

void main() {
    vec2 center = size / 2.0 - vec2(0.5);
    vec2 location = v_coords * size;
    vec4 mix_color;

    float halfThickness = thickness * 0.5;
    float distance = max(abs(location.x - center.x) - (size.x / 2.0 - halfThickness), abs(location.y - center.y) - (size.y / 2.0 - halfThickness));

    float edge_width = 8.0; // this adjusts the anti-aliasing effect

    float smoothedAlpha = smooth_edge(abs(distance) - halfThickness, edge_width);

    vec2 gradientDirection = vec2(cos(angle), sin(angle));

    float dotProduct = dot(v_coords, gradientDirection);

    vec3 gradientColor = mix(startColor, endColor, smoothstep(0.0, 1.0, dotProduct));

    mix_color = mix(vec4(0.0, 0.0, 0.0, 0.0), vec4(gradientColor, smoothedAlpha), smoothedAlpha);
    gl_FragColor = mix_color;
}
