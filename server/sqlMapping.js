module.exports = {
	// 用户表
	user:{
		queryAllUser : 'select * from user order by ad_id desc limit ?, ?',  //分页
		add : 'insert into user(user_phone,user_pwd,user_image_url,user_name) values (?,?,?,?)',  //注册
		login : 'select * from user where user_phone = ? and user_pwd = ?',  //登录
		queryByUserPhone : 'select * from user where user_phone = ?',  //查询手机号是否存在
	},
	// 用户关注
	userAttention:{
		followCount : 'select count(*) as count from user_attention where user_id = ?',
		follow : 'select u.user_id,u.user_name,u.user_image_url,u.user_description,ua.createtime from user as u join user_attention as ua on ua.attention_id = u.user_id where ua.user_id = ? order by ua.createtime desc limit ?,?', // 我关注的
		follow2 : 'select user_id from user_attention where attention_id = ? and user_id in (select attention_id from user_attention where user_id = ?)', // 我关注的并且关注我的用户
		insert : 'insert into user_attention (user_id,attention_id,createtime)values(?,?,?)',
		delete : 'delete from user_attention where user_id = ? and attention_id = ?',
		fans : 'select u.user_id,u.user_name,u.user_image_url,u.user_description from user as u where u.user_id in (select ua.user_id from user_attention as ua where ua.attention_id =?) limit ?,?',  // 用户的粉丝
		fans2 : 'select u.user_id,u.attention_id from user_attention as u where u.user_id in(select ua.user_id from user_attention as ua where ua.attention_id = ?)', // 粉丝关注的用户
		fansCount : 'select count(*) as count from user_attention where attention_id = ?' // 用户粉丝总数
		 
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
		followPage : 'select art_s.*,art_s_u.createtime from article_sort as art_s join article_sort_user art_s_u on art_s.sort_article_id = art_s_u.article_sort_id where art_s_u.user_id = ?  order by art_s_u.createtime limit ?,?', // 用户关注的吧分页 
		likeArtsName : 'select * from article_sort where article_sort.sort_article_name like "?%"', // 搜索贴吧名
	},
	// 帖子图片表
	articleImages:{
		insert : 'insert into article_image (article_id,article_image_url)values((select a.article_id from article as a where a.user_id = ? order by a.article_id desc limit 1),?)', // 插入图片
		queryByArticleId : 'select * from article_image where article_id = ?'
	},
	// 评论表
	stayMessage:{
		queryByFloor :'select floor from stay_message where article_id = ? order by floor desc limit 1', // 查询最后一个插入的楼层
		insert : 'insert into stay_message (article_id,user_id,stay_user_id,parent_id,floor,message_content,stay_user_ip,message_stay_time)values(?,?,?,?,?,?,?,?)', // 插入评论
		queryFloorAll : 'select sm.*,u.user_name,u.user_image_url from `user` as u join stay_message as sm on u.user_id = sm.stay_user_id where sm.article_id = ? group by sm.floor order by sm.floor',  // 楼层查询
//		queryFloorByParentId : 'select s.*,u.user_name,u.user_image_url from stay_message as s join user as u on s.stay_user_id = u.user_id where s.article_id = ? and s.parent_id = ? order by s.stay_id', // 楼层评论
	}
}
