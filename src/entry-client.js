import { createApp } from './app'
import Amplify, { Auth } from 'aws-amplify';
import LocalCookieStorage from '../src-server/LocalCookieStorage'
import aws_exports from './aws-exports'

if (window.location.hostname == 'localhost') {
  aws_exports.Auth = {
    storage: new LocalCookieStorage()
  }
} else {
  aws_exports.Auth = {
    cookieStorage: {
      domain: 'y15e.io'
    }
  }
}
Amplify.configure(aws_exports)

const { app, router, store } = createApp()

router.onReady(() => {
  app.$mount('#app')
})
