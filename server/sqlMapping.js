module.exports = {
	// 用户表
	user:{
		queryAllUser : 'select * from user order by ad_id desc limit ?, ?',  //分页
		add : 'insert into user(user_phone,user_pwd,user_image_url,user_name) values (?,?,?,?)',  //注册
		login : 'select * from user where user_phone = ? and user_pwd = ?',  //登录
		queryByUserPhone : 'select * from user where user_phone = ?',  //查询手机号是否存在
		follow : 'select * from user as u where u.user_id in (select ua.attention_id from user_attention as ua where ua.user_id = ?)', // 我关注的
		fans : 'select * from user as u where u.user_id in (select ua.user_id from user_attention as ua where ua.attention_id = 19)',  // 粉丝
	},
	// 帖子表
	article:{
		queryAllArticle : 'select * from article order by article_id desc limit ?, ?', // 分页
		insert : 'insert into article(type_id,article_name,article_time,article_ip,article_click,sort_article_id,user_id,article_type,article_content,article_up,article_support) values (?,?,?,?,?,?,?,?,?,?,?)', // 插入文章
		index : 'SELECT art.article_id,art.article_name,art.article_content,art.article_time,art.article_click,art.type_id,art_s.sort_article_name,art_s.sort_article_id,u.user_image_url,u.user_name FROM article AS art JOIN article_sort AS art_s ON art.sort_article_id = art_s.sort_article_id LEFT JOIN USER AS u ON u.user_id = art.user_id where art.type_id=0 ORDER BY art.article_time DESC LIMIT ?,?',
		count : 'select count(*) as count from article',
		queryByArticleId : 'select art.article_id,art.article_name,art.article_content,art.article_click,art.article_time,u.user_name,u.user_id,u.user_image_url,art_s.sort_article_name,art_s.sort_article_id from article as art left join article_sort as art_s on art.sort_article_id=art_s.sort_article_id left join user as u on art.user_id=u.user_id where art.article_id = ?',
		updateClickByArticleId : 'update article set article_click=article_click+1 where article_id = ?',
		queryArticleByUserId : 'select * from article as art join article_sort as art_s on art.sort_article_id = art_s.sort_article_id where art.user_id = ?' // 根据用户ID查询
	},
	// 贴吧表
	articleSort:{
		queryAllArticleSort : 'select * from article_sort order by sort_article_id desc limit ?, ?', // 分页
		articleSortIndex : 'SELECT art.article_id,art.article_name,art.article_content,art.article_time,art.article_click,art_s.sort_article_name,u.user_image_url,u.user_name,art_s.sort_article_id	FROM article AS art left JOIN article_sort AS art_s ON art.sort_article_id = art_s.sort_article_id left JOIN USER AS u ON u.user_id = art.user_id where art.sort_article_id = ? and art.essence = ? ORDER BY art.article_time desc limit ?,?',
		queryById : 'select * from article_sort where article_sort.sort_article_id = ?', // 根据id查询贴吧
		follow : 'select * from article_sort as art_s where art_s.sort_article_id in (select art_s_u.article_sort_id from article_sort_user as art_s_u where art_s_u.user_id = ?)', // 用户关注的
//		latelys : '' // 最近逛的吧
		likeArtsName : 'select * from article_sort where article_sort.sort_article_name like "?%"', // 搜索贴吧名
	},
	// 帖子图片表
	articleImages:{
		insert : 'insert into article_image (article_id,article_image_url)values((select a.article_id from article as a where a.user_id = ? order by a.article_id desc limit 1),?)', // 插入图片
		queryByArticleId : 'select * from article_image where article_id = ?'
	},
	// 评论表
	stayMessage:{
		queryByFloor :'select floor from stay_message order by floor desc limit 1', // 查询最后一个插入的楼层
		insert : 'insert into stay_message (article_id,user_id,stay_user_id,parent_id,floor,message_content,stay_user_ip,message_stay_time)values(?,?,?,?,?,?,?,?)', // 插入评论
	}
}
