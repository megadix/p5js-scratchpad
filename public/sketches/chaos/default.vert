attribute vec3 aPosition;

void main() {
    // copy the position data into a vec4, using 1.0 as the w component
    vec4 positionVec4 = vec4(aPosition, 1.0);
    // scale the rect by two, and move it to the center of the screen
    // if we don't do this, it will appear with its bottom left corner in the center of the sketch
    positionVec4.xy = positionVec4.xy * 2.0 - 1.0;
    // send the vertex information on to the fragment shader
    gl_Position = positionVec4;
}