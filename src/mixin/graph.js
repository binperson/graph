import { OrbitControls } from '@/common/js/controls/OrbitControls'
import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  PCFShadowMap,
  Vector3,
  AxesHelper
} from 'three'
const suportWebGL = (() => {
  try {
    var canvas = document.createElement('canvas')
    return !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')))
  } catch (e) {
    return false
  }
})()
export default {
  data () {
    return {
      scene: new Scene(),
      camera: new PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 10000),
      renderer: null,
      suportWebGL,
    }
  },
  async mounted () {
    this.init()
  },
  methods: {
    init() {
      this.controls = new OrbitControls(this.camera, this.$el)
      this.controls.type = 'orbit'
      this.renderer = new WebGLRenderer({ antialias: true, alpha: true, canvas: this.$refs.canvas })
      this.renderer.setSize(window.innerWidth, window.innerHeight)
      this.renderer.setPixelRatio(window.devicePixelRatio)
      this.renderer.shadowMap.enabled = true
      this.renderer.shadowMap.type = PCFShadowMap
      this.renderer.setClearAlpha(1)
      this.renderer.gammaOutput = true
      this.renderer.gammaFactor = 2.2
      this.camera.position.set(100, 100, 100)

      this.addHelper()
      this.animate()
    },
    addHelper () {
      var axesHelper = new AxesHelper(500)
      this.scene.add(axesHelper)
    },
    animate () {
      this.controls.update()
      this.render()
      requestAnimationFrame(this.animate)
    },
    render () {
      this.renderer.render(this.scene, this.camera)
    }
  }
}
