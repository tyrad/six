import Vue from 'vue'

import {library, config} from '@fortawesome/fontawesome-svg-core'
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'

import {faAngleDown} from '@fortawesome/free-solid-svg-icons/faAngleDown'
import {faCalendarAlt} from '@fortawesome/free-solid-svg-icons/faCalendarAlt'
import {faLink} from '@fortawesome/free-solid-svg-icons/faLink'
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons/faArrowLeft'
import {faArrowRight} from '@fortawesome/free-solid-svg-icons/faArrowRight'
import {faFolder} from '@fortawesome/free-solid-svg-icons/faFolder'
import {faArrowUp} from '@fortawesome/free-solid-svg-icons/faArrowUp'
import {faAdjust} from '@fortawesome/free-solid-svg-icons/faAdjust'
import {faBars} from '@fortawesome/free-solid-svg-icons/faBars'
import {faArrowDown} from '@fortawesome/free-solid-svg-icons/faArrowDown'

library.add(faAngleDown, faCalendarAlt, faLink, faArrowLeft, faArrowRight, faFolder, faArrowUp, faAdjust, faBars, faArrowDown)

Vue.component('fa', FontAwesomeIcon)

// refer to: https://stackoverflow.com/questions/59897864/nuxt-vendor-app-is-too-big-font-awesome-too-big
