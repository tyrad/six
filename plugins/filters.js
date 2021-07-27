import Vue from 'vue'
import {parserTimeEn} from "~/utils"

Vue.filter('capitalize', val => val.toUpperCase())

Vue.filter('toParseTime', val => parserTimeEn(val))

