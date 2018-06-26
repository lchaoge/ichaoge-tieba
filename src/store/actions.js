/*
 * Description: 应用
 * User: chaoge
 * Date: 2018/04/16
*/


import mutations from './mutations.js'

export default {
	// 设置mandt
	setUser({commit},user){
		commit("userStatus",user)
	}
}