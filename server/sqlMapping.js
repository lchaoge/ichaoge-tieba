module.exports = {
	// 用户表
	user:{
		add : 'insert into user(user_name,user_pwd) values (?,?)',
		login : 'select user_name,user_pwd from `user` where user_name = ? and user_pwd = ?',
		queryAllUser : 'select * from user order by ad_id desc limit ?, ?'
	},
	// 文章表
	article:{
		queryAllUser : 'select * from article order by article_id desc limit ?, ?'
	}
}
