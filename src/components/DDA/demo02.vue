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
  RepeatWrapping,
  Float32BufferAttribute,
  LineBasicMaterial,
  LineSegments
} from 'three'
import { Color } from '../../math/Color.js';
export default {
  mixins: [mixin],
  data () {
    return {

    }
  },
  mounted () {
    this.addGridHelper()
  },
  methods: {
    addGridHelper (size, divisions, color1, color2) {
      size = size || 10;
      divisions = divisions || 10; // divisions 分格
      color1 = new Color( color1 !== undefined ? color1 : 0x444444 );
      color2 = new Color( color2 !== undefined ? color2 : 0x888888 );

      var center = divisions / 2;
      var step = size / divisions;
      var halfSize = size / 2;

      var vertices = [], colors = [];

      for ( var i = 0, j = 0, k = - halfSize; i <= 0; i ++, k += step ) {

        vertices.push( - halfSize, 0, k, halfSize, 0, k );
        vertices.push( k, 0, - halfSize, k, 0, halfSize );

        var color = i === center ? color1 : color2;

        color.toArray( colors, j ); j += 3;
        color.toArray( colors, j ); j += 3;
        color.toArray( colors, j ); j += 3;
        color.toArray( colors, j ); j += 3;

      }
      debugger
      var geometry = new BufferGeometry();
      geometry.addAttribute( 'position', new Float32BufferAttribute( vertices, 3 ) );
      geometry.addAttribute( 'color', new Float32BufferAttribute( colors, 3 ) );

      var material = new LineBasicMaterial( { vertexColors: 2 } );

      this.scene.add(new LineSegments(geometry, material ))
    },
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
