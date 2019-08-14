<template>
  <div class="sidebar behavior_1" 
    :class="{'sidebar-image': sidebarUrl !== ''}"
    :style="imageStyle">
      <div class="wrap">
        <div class="profile">
          <router-link to="/">
            <img src="/img/wow.png" alt="binperson的小站">
          </router-link>
          <span :style="{ 'color': '#fff' }" >binperson的小站</span>
        </div>
        <ul class="buttons">
          <li v-for="(item, index) in menu" :key="index">
            <router-link 
              :style="buttonColor"  
              :to="{ path: item.url }" :title="item.label">
              <i class="iconfont" :class="'icon-' + item.option"></i>
              <span>{{item.label}}</span>
            </router-link>
          </li>
        </ul>
        <ul class="buttons">
        <li>
          <a class="inline" :style="buttonColor"
            rel="nofollow" target="_blank">
            <i class="iconfont icon-github-v" title="GitHub"></i></a>
          <a class="inline" :style="buttonColor"
            rel="nofollow" target="_blank">
            <i class="iconfont icon-twitter-v" title="Twitter"></i></a>
        </li>
      </ul>
      </div>
  </div>
</template>
<script type='text/ecmascript-6'>
import mixin from '@/mixin/image'
export default {
  mixins: [mixin],
  data () {
    return {
      menu: [
        {
          url: '',
          label: '首页',
          option: 'home'
        },
        {
          url: '',
          label: '友链',
          option: 'link'
        },
        {
          url: '',
          label: '开源',
          option: 'stackoverflow'
        }
      ]
    }
  },
	computed: {
    buttonColor() {
      return { 'color': '#fff' }
    },
		imageStyle() {
      const sidebarUrl = this.sidebarUrl
      
      const sidebarMoveCss = sidebarUrl ? this.options.sidebarMoveCss : ''
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

.sidebar {
  background-color: #202020;
  height: 100%;
  left: 0;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  position: fixed;
  top: 0;
  width: 250px;
  z-index: 1
}
.sidebar-image {
  background-position: left center;
  background-repeat: no-repeat;
  background-size: cover;
  overflow: auto;
}

.sidebar-image:hover {
  background-position: right center;
}
.sidebar-mask {
  background-color: rgba(255, 255, 255, 0);
  bottom: 0;
  display: none;
  left: 0;
  overflow: hidden;
  position: absolute;
  right: 0;
  top: 0;
  z-index: 999
}

.sidebar li,
.sidebar ul {
  list-style: none;
  margin: 0;
  padding: 0
}

.sidebar .profile {
  padding-top: 40px;
  padding-bottom: 10px
}

.sidebar .buttons {
  margin: 0 0 20px
}

.sidebar .profile a,
.sidebar .profile img {
  border-radius: 70px;
  height: 140px;
  overflow: hidden;
  width: 140px
}

.sidebar .profile a {
  display: block;
  margin: 0 auto
}

.sidebar .profile span {
  color: #999;
  display: block;
  font-size: 18px;
  padding: 10px 0;
  text-align: center
}

.sidebar .buttons li {
  display: block;
  font-size: 16px;
  height: 45px;
  line-height: 45px;
  width: 100%
}

.sidebar .buttons li a {
  color: #999;
  display: block;
  padding-left: 25px;
  text-decoration: none;
  -webkit-transition: color .2s cubic-bezier(.4, .01, .165, .99);
  transition: color .2s cubic-bezier(.4, .01, .165, .99)
}

.sidebar .buttons li a i,
.sidebar .buttons li a span {
  display: inline-block;
  vertical-align: middle
}

.sidebar .buttons li a i {
  font-size: 20px;
  height: 45px;
  line-height: 45px;
  margin-right: 20px;
  text-align: center;
  width: 25px
}

.sidebar .buttons li a:hover {
  color: rgba(153, 153, 153, .8)
}

.sidebar .buttons li a.inline {
  display: inline-block;
  width: 40px
}  
</style>