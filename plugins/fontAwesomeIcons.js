import Vue from 'vue'

import {library, config} from '@fortawesome/fontawesome-svg-core'
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'

// This is important, we are going to let Nuxt.js worry about the CSS
config.autoAddCss = false

import {faAngleDown} from '@fortawesome/free-solid-svg-icons'
import {faCalendarAlt} from '@fortawesome/free-solid-svg-icons'
import {faLink} from '@fortawesome/free-solid-svg-icons'
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons'
import {faArrowRight} from '@fortawesome/free-solid-svg-icons'
import {faFolder} from '@fortawesome/free-solid-svg-icons'
import {faArrowUp} from '@fortawesome/free-solid-svg-icons'
import {faAdjust} from '@fortawesome/free-solid-svg-icons'
import {faBars} from '@fortawesome/free-solid-svg-icons'
import {faArrowDown} from '@fortawesome/free-solid-svg-icons'

library.add(faAngleDown, faCalendarAlt, faLink, faArrowLeft, faArrowRight, faFolder, faArrowUp, faAdjust, faBars, faArrowDown)

Vue.component('fa', FontAwesomeIcon)

// refer to: https://stackoverflow.com/questions/59897864/nuxt-vendor-app-is-too-big-font-awesome-too-big
