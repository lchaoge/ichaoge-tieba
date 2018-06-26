/*
 * Description: vuex-getters.js
 * User: chaoge
 * Date: 2018/04/16
*/

import state from './state.js'

export default {
  mandt (state) {
		return state.mandt;
	},
  indu (state) {
		return state.indu;
	},
  siteNo (state) {
		return state.siteNo;
	}
}