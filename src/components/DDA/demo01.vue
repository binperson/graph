<template>
<div class="DDA">
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
  BufferGeometry,
  BufferAttribute,
  MeshBasicMaterial,
  Mesh,
  SpriteMaterial,
  Sprite,
  Texture,
  RepeatWrapping
} from 'three'
export default {
  mixins: [mixin],
  data () {
    return {

    }
  },
  mounted () {
    this.addBufferGeometry()
  },
  methods: {
    createTextTexture (obj) {
      let canvas = document.createElement("canvas");
      canvas.width= obj.width || 400;
      canvas.height= obj.height || 500;
      let ctx = canvas.getContext("2d");

      ctx.font = obj.font || "Bold 50px Arial";
      ctx.fillStyle = obj.color || "#fff";
      ctx.fillText(obj.text, 10, 400);

      let texture = new Texture(canvas);
      texture.needsUpdate = true;
      texture.wrapS = RepeatWrapping;
      texture.wrapT = RepeatWrapping;
      return texture;
    },
    addBufferGeometry () {
      var geometry = new BufferGeometry();
      // create a simple square shape. We duplicate the top left and bottom right
      // vertices because each vertex needs to appear once per triangle.
      var vertices = new Float32Array( [
        -10.0, -10.0,  10.0,
        10.0, -10.0,  10.0,
        10.0,  10.0,  10.0,

        10.0,  10.0,  10.0,
        -10.0,  10.0,  10.0,
        -10.0, -10.0,  10.0
      ] );
      this.scene.add(this.addText('-10.0, -10.0,  10.0', [-10.0, -10.0,  10.0]))

      // itemSize = 3 because there are 3 values (components) per vertex
      geometry.addAttribute( 'position', new BufferAttribute( vertices, 3 ) );
      var material = new MeshBasicMaterial( { color: 0xff0000 } );
      var mesh = new Mesh( geometry, material );
      this.scene.add(mesh)
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
</style>
