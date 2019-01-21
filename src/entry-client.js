import { createApp } from './app'
import Amplify, { Auth, Hub, Logger } from 'aws-amplify';
import LocalCookieStorage from '../src-server/LocalCookieStorage'

import aws_exports from './aws-exports'
Amplify.configure(aws_exports)

if (window.location.hostname == 'localhost') {
  Amplify.configure({
    Auth: {
      storage: new LocalCookieStorage()
    }
  })
} else {
  //const cookieDomain = window.location.hostname
  const cookieDomain = 'd6er.com'
  Amplify.configure({
    Auth: {
      cookieStorage: {
        domain: cookieDomain,
      }
    }
  })
}

const { app, router, store } = createApp()

// Hub
const alex = new Logger('Alexander_the_auth_watcher')
alex.onHubCapsule = (capsule) => {
  console.log('[entry-client.js Hub] ' + capsule.payload.event)
}
Hub.listen('auth', alex)

router.onReady(() => {
  app.$mount('#app')
})
