<template>
<div class="demo">
  <canvas v-if="suportWebGL" ref="canvas" style="width: 100% height: 100%"></canvas>
  <div v-else>
    <slot>
      Your browser does not seem to support <a href="http://khronos.org/webgl/wiki/Getting_a_WebGL_Implementation" style="color:#000">WebGL</a>.<br/>'
    </slot>
  </div>
</div>
</template>
<script type='text/ecmascript-6'>
import mixin from '@/mixin/graph'
import {
  DoubleSide,
  PlaneGeometry,
  Mesh,
  Vector3,
  ShaderMaterial
} from 'three'
export default {
  mixins: [mixin],
  data () {
    return {
      circleShader: {
        vertexShader: [
          "varying vec2 vUv;",
          "void main(){",
          "vUv = uv;",
          "	gl_Position	= projectionMatrix * modelViewMatrix * vec4(position, 1.0);",
          "}"
        ].join("\n"),
        fragmentShaderYuan: [
          "varying vec2 vUv;",
          "uniform vec3 u_color;",
          "uniform float u_r;",
          "uniform float u_edge;",

          "void main(){",
          "float pct = distance(vUv,vec2(0.5));",
          "float t = smoothstep(pct-u_edge,pct,u_r);",
          "vec3 color = vec3(t*2.0);",
          "gl_FragColor = vec4(u_color,t);",
          "}"
        ].join("\n"),
        fragmentShaderYuanhaun: [
          "varying vec2 vUv;",
          "uniform vec3 u_color;",
          "uniform float u_r;",
          "uniform float u_edge;",

          "float plot(float d, float pct){",
          "return  smoothstep( pct-u_edge, pct, d)- ",
          "smoothstep( pct, pct+u_edge, d);",
          "}",

          "void main(){",
          "float pct = distance(vUv,vec2(0.5));",
          "float t = plot(pct,u_r);",
          "vec3 color = vec3(t*2.0);",
          "gl_FragColor = vec4(u_color,t);",
          "}"
        ].join("\n")
      },
      colorMap: {
        noIrrigate: [0.81, 0.81, 0.81], // 未浇灌
        irrigating: [0.0, 0.81, 0.96]
      },
      timer: null
    }
  },
  mounted () {
    this.target = new Vector3(0, 100, 0)
    this.camera.lookAt(this.target)
    this.controls.target = this.target
    this.addCircle()
  },
  methods: {
    addCircle () {
      let uniform = {
        u_color: { value: new Vector3(...this.colorMap.irrigating) },
        u_r: { value: 0.04 },
        u_edge: { value: 0.01 }
      }

      let material = new ShaderMaterial({
        vertexShader: this.circleShader.vertexShader,
        fragmentShader: this.circleShader.fragmentShaderYuanhaun,
        side: DoubleSide,
        uniforms: uniform,
        transparent: true,
        depthWrite: false
      })
      let planeGeo = new PlaneGeometry(40, 40)
      let plane = new Mesh(planeGeo, material)
      this.scene.add(plane)
      console.log(plane)
      let i = 0
      this.timer = setInterval(() => {
        i++
        if (i % 2 === 0) {
          plane.material.needsUpdate = true
          plane.material.fragmentShader = this.circleShader.fragmentShaderYuanhaun
          plane.material.uniforms.u_color.value = new Vector3(...this.colorMap.irrigating)
        } else {
          plane.material.needsUpdate = true
          plane.material.fragmentShader = this.circleShader.fragmentShaderYuan
          plane.material.uniforms.u_color.value = new Vector3(...this.colorMap.noIrrigate)
        }
      }, 1000)
    }
  },
  destroyed () {
    clearInterval(this.timer)
  }
}
</script>
<style scoped lang='stylus' rel='stylesheet/stylus'>
</style>
