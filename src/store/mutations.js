/*
 * Description: vuex-mutation.js
 * User: zhaoyiming
 * Date: 2017/9/17
*/

import getters from './getters.js'

export default {
	
	// 更改用户状态信息
	userStatus(state,user){
		if(user){
			state.currentUser = user
			state.isLogin = true
		}else{
			state.currentUser = null
			state.isLogin = false
		}
	}
}