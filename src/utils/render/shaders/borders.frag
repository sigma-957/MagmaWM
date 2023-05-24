precision mediump float;
uniform float alpha;
#if defined(DEBUG_FLAGS)
uniform float tint;
#endif
uniform vec2 size;
varying vec2 v_coords;

uniform float angle;
uniform vec3 startColor;
uniform vec3 endColor;
uniform float thickness;

void main() {
    vec2 center = size / 2.0 - vec2(0.5);
    vec2 location = v_coords * size;
    vec4 mix_color;

    float distance = max(abs(location.x - center.x) - (size.x / 2.0 - thickness / 2.0), abs(location.y - center.y) - (size.y / 2.0 - thickness / 2.0));
    float smoothedAlpha = 1.0 - smoothstep(0.0, thickness, abs(distance));

    vec2 gradientDirection = vec2(cos(angle), sin(angle));

    float dotProduct = dot(v_coords, gradientDirection);

    vec3 gradientColor = mix(startColor, endColor, smoothstep(0.0, 1.0, dotProduct));

    mix_color = mix(vec4(0.0, 0.0, 0.0, 0.0), vec4(gradientColor, alpha), smoothedAlpha);

#if defined(DEBUG_FLAGS)
    if (tint == 1.0)
        mix_color = vec4(0.0, 0.3, 0.0, 0.2) + mix_color * 0.8;
#endif

    gl_FragColor = mix_color;
}
