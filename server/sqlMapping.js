module.exports = {
	// 用户表
	user:{
		queryAllUser : 'select * from user order by ad_id desc limit ?, ?',  //分页
		add : 'insert into user(user_name,user_pwd) values (?,?)',  //注册
		login : 'select * from user where user_name = ? and user_pwd = ?',  //登录
	},
	// 文章表
	article:{
		queryAllArticle : 'select * from article order by article_id desc limit ?, ?', // 分页
		insert : 'insert into article(article_name,article_time,article_ip,article_click,sort_article_id,user_id,article_type,article_content,article_up,article_support) values (?,?,?,?,?,?,?,?,?,?)', // 插入文章
	},
	// 文章分类表
	articleSort:{
		queryAllArticleSort : 'select * from article_sort order by sort_article_id desc limit ?, ?', // 分页
		queryAllByUserId : 'select * from article_sort where user_id = ?'   // 用户关注的
	},
	articleImages:{
		insert : 'insert into article_image (article_id,article_image_url)values((select a.article_id from article as a where a.user_id = ? order by a.article_id desc limit 1),?)' // 插入图片
	}
}
