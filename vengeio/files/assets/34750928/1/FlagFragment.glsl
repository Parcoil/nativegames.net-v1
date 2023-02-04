varying vec2 vUv0;

uniform sampler2D uDiffuseMap;
uniform float uTime;

uniform vec4 fog_color_Flag;
uniform float fog_density_Flag;
float dBlendModeFogFactor = 1.0;

vec4 addFog_Flag(vec4 color) {
    float depth = gl_FragCoord.z / gl_FragCoord.w;
    float fogFactor = exp(-depth * depth * fog_density_Flag * fog_density_Flag);
    fogFactor = clamp(fogFactor, 0.0, 1.0);
    return mix(fog_color_Flag * dBlendModeFogFactor, color, fogFactor);
}

void main(void)
{
    vec4 color = texture2D(uDiffuseMap, vUv0);
    gl_FragColor = color;
}