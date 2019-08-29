<template>
<div class="DDA">
  <canvas v-if="suportWebGL" ref="canvas" style="width: 100% height: 100%"></canvas>
  <div v-else>
    <slot>
      Your browser does not seem to support <a href="http://khronos.org/webgl/wiki/Getting_a_WebGL_Implementation" style="color:#000">WebGL</a>.<br/>'
    </slot>
  </div>
  <a-drawer
    title="输入坐标点"
    :width="280"
    @close="onClose"
    :visible="visible"
    :wrapStyle="{height: 'calc(100% - 108px)',overflow: 'auto',paddingBottom: '108px'}"
  >
    <a-form :form="form" layout="vertical" hideRequiredMark>
      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item label="起始点X">
            <a-input-number
              v-decorator="['x', { initialValue: 0 }]"
            />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="起始点Y">
             <a-input-number
                v-decorator="['y', { initialValue: 0 }]"
            />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item label="终点X">
             <a-input-number
              v-decorator="['dsx', { initialValue: 4 }]"
            />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="终点Y">
            <a-input-number
              v-decorator="['dsy', { initialValue: 4 }]"
            />
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
    <div
      :style="{
        position: 'absolute',
        left: 0,
        bottom: 0,
        width: '100%',
        borderTop: '1px solid #e9e9e9',
        padding: '10px 16px',
        background: '#fff',
        textAlign: 'right',
      }"
    >
      <a-button
        :style="{marginRight: '8px'}"
        @click="onClose"
      >
        取消
      </a-button>
      <a-button @click="confirm" type="primary">确认</a-button>
    </div>
  </a-drawer>
  <div @click="showDrawer" v-if="!visible" class="icon-wrap">
    <a-icon :component="PandaSvg" />
  </div>
</div>
</template>
<script type='text/ecmascript-6'>
import mixin from '@/mixin/graph'
import {
  BufferGeometry,
  BufferAttribute,
  MeshBasicMaterial,
  Mesh,
  SpriteMaterial,
  Sprite,
  Texture,
  RepeatWrapping,
  Float32BufferAttribute,
  LineBasicMaterial,
  LineSegments,
  MeshPhongMaterial,
  SphereGeometry,
  FlatShading,
  SpotLight
} from 'three'
import { Color } from '../../math/Color.js';
import PandaSvg from '@/components/PandaSvg'
export default {
  mixins: [mixin],
  data () {
    return {
      visible: false,
      form: this.$form.createForm(this),
      PandaSvg,
      sphereArr: []
    }
  },
  components: {

  },
  mounted () {
    this.addGridHelper()
    this.addLight()
    this.addDDA(0, 0, 4, 4)
    this.showDrawer()
  },
  methods: {
    confirm () {
      this.visible = false
      this.removeSphere()
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
          this.addDDA(values.x, values.y, values.dsx, values.dsy)
        }
      })

    },
    removeSphere () {
      while (this.sphereArr.length > 0) {
        let sphere = this.sphereArr.pop()
        this.scene.remove(sphere)
      }
    },
    showDrawer() {
      this.visible = true
    },
    onClose() {
      this.visible = false
    },
    addLight () {
      var spotLight = new SpotLight(0xffffff);
      spotLight.position.set(100,100,100);
      spotLight.castShadow = true; //If set to true light will cast dynamic shadows. Warning: This is expensive and requires tweaking to get shadows looking right.
      spotLight.shadowMapWidth = 1024;
      spotLight.shadowMapHeight = 1024;
      spotLight.shadowCameraNear = 500;
      spotLight.shadowCameraFar = 4000;
      spotLight.shadowCameraFov = 30;
      this.scene.add(spotLight);
    },
    addDDA (x, y, dsx, dsy) {
      let dx = dsx - x
      let dy = dsy - y
      let esp1
      if (Math.abs(dx) > Math.abs(dy)) {
        esp1 = Math.abs(dx)
      } else {
        esp1 = Math.abs(dy)
      }
      let xIncre = dx/esp1
      let yIncre = dy/esp1
      for (let i = 0; i <= esp1; i++) {
        this.addSphere(x * 10, y * 10)
        x += xIncre
        y += yIncre
      }
    },
    /* Create Material */
    getMat(){
      var material = new MeshPhongMaterial({
        color      : new Color("rgb(35,35,213)"),  //Diffuse color of the material
        emissive   : new Color("rgb(64,128,255)"), //Emissive(light) color of the material, essentially a solid color unaffected by other lighting. Default is black.
        specular   : new Color("rgb(93,195,255)"), /*Specular color of the material, i.e., how shiny the material is and the color of its shine.
                                                          Setting this the same color as the diffuse value (times some intensity) makes the material more metallic-looking;
                                                          setting this to some gray makes the material look more plastic. Default is dark gray.*/
        shininess  : 1,                                  //How shiny the specular highlight is; a higher value gives a sharper highlight. Default is 30.
        shading    : FlatShading,                  //How the triangles of a curved surface are rendered: THREE.SmoothShading, THREE.FlatShading, THREE.NoShading
        wireframe  : 1,                                  //THREE.Math.randInt(0,1)
        transparent: 1,
        opacity    : 1                                //THREE.Math.randFloat(0,1)
      });
      return material;
    },
    addSphere (x, y) {
      var sphereMaterial = this.getMat()
      var sphere = new Mesh(
        new SphereGeometry(4,20,20,0,Math.PI*2,0,Math.PI),
        sphereMaterial
      );

      sphere.geometry.verticesNeedUpdate = true;
      sphere.geometry.normalsNeedUpdate = true;
      sphere.position.set(x, y, 0)
      this.sphereArr.push(sphere)
      this.scene.add(sphere);
    },
    addGridHelper (size, divisions, color1, color2) {
      size = size || 1000
      divisions = divisions || 100 // divisions 分格
      color1 = new Color( color1 !== undefined ? color1 : 0x444444 )
      color2 = new Color( color2 !== undefined ? color2 : 0x888888 )

      var center = divisions / 2
      var step = size / divisions
      var halfSize = size / 2

      var vertices = [], colors = []

      for ( var i = 0, j = 0, k = - halfSize; i <= divisions; i ++, k += step ) {

        vertices.push( - halfSize, k, 0,  halfSize, k, 0 )
        vertices.push( k, - halfSize, 0, k, halfSize, 0 )

        var color = i === center ? color1 : color2

        color.toArray( colors, j ); j += 3
        color.toArray( colors, j ); j += 3
        color.toArray( colors, j ); j += 3
        color.toArray( colors, j ); j += 3
      }
      var geometry = new BufferGeometry();
      geometry.addAttribute( 'position', new Float32BufferAttribute( vertices, 3 ) )
      geometry.addAttribute( 'color', new Float32BufferAttribute( colors, 3 ) )

      var material = new LineBasicMaterial( { vertexColors: 2 } )

      this.scene.add(new LineSegments(geometry, material ))
    },
    createTextTexture (obj) {
      let canvas = document.createElement("canvas")
      canvas.width= obj.width || 400
      canvas.height= obj.height || 500
      let ctx = canvas.getContext("2d")

      ctx.font = obj.font || "Bold 50px Arial"
      ctx.fillStyle = obj.color || "#fff"
      ctx.fillText(obj.text, 10, 400)

      let texture = new Texture(canvas)
      texture.needsUpdate = true
      texture.wrapS = RepeatWrapping
      texture.wrapT = RepeatWrapping
      return texture
    },
    addText (text, arr) {
      let material = new SpriteMaterial({
        map: this.createTextTexture({
          text: text,
          width: 700
        }),
        opacity: 0.8,
        transparent: true
      })

      var particle = new Sprite(material)
      particle.scale.set(25, 8, 10)
      particle.position.set(arr[0], arr[1], arr[2])
      return particle
    }
  }
}
</script>
<style scoped lang='stylus' rel='stylesheet/stylus'>
.icon-wrap
  position absolute
  right 30px
  bottom 30px
  z-index 1000
  .anticon
    font-size 36px
</style>
