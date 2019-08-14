import { mapState } from 'vuex'
export default {
	computed: {
		sidebarUrl() {
      console.log(this.options)
      return this.options.sidebarImageUrl
    },
    ...mapState('app', {
      options: state => state.options
    })
	},
	methods: {
  }
}