<template>
  <div class="sidebar behavior_1" 
    :class="{'sidebar-image': sidebarUrl !== ''}"
    :style="imageStyle">
      112
  </div>
</template>
<script type='text/ecmascript-6'>
import mixin from '@/mixin/image'
export default {
	mixins: [mixin],
	computed: {
		imageStyle() {
      const sidebarUrl = this.sidebarUrl
      const sidebarMoveCss = sidebarUrl ? this.option.sidebarMoveCss : ''
      const result = {
        'background-image': sidebarUrl ? 'url(' + sidebarUrl + ')' : '',
        'transition': sidebarMoveCss
      }
      return result
    }
	}
}
</script>
<style lang='stylus' rel='stylesheet/stylus'>
</style>