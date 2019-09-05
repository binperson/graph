import router from './router'
import { setDocumentTitle, domTitle } from '@/utils/domUtil'
router.beforeEach((to, from, next) => {
  to.meta && (typeof to.meta.title !== 'undefined' && setDocumentTitle(`${to.meta.title} - ${domTitle}`))
  next()
})
