/*
 * Description: vuex-getters.js
 * User: chaoge
 * Date: 2018/04/16
*/

import state from './state.js'

export default {
	currentUser (state) {
		return state.currentUser;
	},
  	isLogin (state) {
		return state.isLogin;
	}
}