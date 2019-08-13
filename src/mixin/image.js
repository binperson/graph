export default {
	computed: {
		sidebarUrl() {
      return this.getValidImageUrl(this.option ? this.option.sidebarImageUrl || '' : '')
    }
	},
	methods: {
    getValidImageUrl(url) {
      if (!this.supportWebp) return url.replace(/.webp$/, '.png').replace('/webp', '')
      return url
    }
  }
}