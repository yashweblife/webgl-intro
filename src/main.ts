const canvas = document.createElement('canvas')!;
const c = canvas.getContext('webgl')!
document.body.appendChild(canvas)
const vertex = [
  0,0,0,
  1,0,0,
  1,1,0,
]

const buffer = c.createBuffer()
c.bindBuffer(c.ARRAY_BUFFER, buffer)
c.bufferData(c.ARRAY_BUFFER, new Float32Array(vertex), c.STATIC_DRAW)

const vs = c.createShader(c.VERTEX_SHADER)!

const colors = [
  1,0,0,
  0,1,0,
  0,0,1
]
const cBuff = c.createBuffer()
c.bindBuffer(c.ARRAY_BUFFER, cBuff);;
c.bufferData(c.ARRAY_BUFFER, new Float32Array(colors), c.STATIC_DRAW);

c.shaderSource(vs,`
precision mediump float;

attribute vec3 position;
attribute vec3 color;
varying vec3 vColor;

void main(){
  vColor = color;
  gl_Position=vec4(position, 1);
}
`)

c.compileShader(vs)


const fs = c.createShader(c.FRAGMENT_SHADER)!
c.shaderSource(fs,`
varying vec3 vColor;
void main(){
  gl_FragColor = vec4(vColor, 1);
}
`)

c.compileShader(fs)

const program = c.createProgram()!;
c.attachShader(program, vs)
c.attachShader(program, fs)
c.linkProgram(program)


const attrPos = c.getAttribLocation(program, 'position')
c.enableVertexAttribArray(attrPos)
c.bindBuffer(c.ARRAY_BUFFER, buffer)
c.vertexAttribPointer(attrPos, 3, c.FLOAT, false, 0,0);


const attrColor = c.getAttribLocation(program, 'color')
c.enableVertexAttribArray(attrColor)
c.bindBuffer(c.ARRAY_BUFFER, cBuff)
c.vertexAttribPointer(attrColor, 3, c.FLOAT, false, 0,0);


c.useProgram(program)
c.drawArrays(c.TRIANGLES, 0, 3)

















