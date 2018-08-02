module.exports = {
	// 用户表
	user:{
		queryByUserId : 'select * from user where user_id = ?', // 根据ID查询用户
		queryAllUser : 'select * from user order by ad_id desc limit ?, ?',  //分页
		add : 'insert into user(user_phone,user_pwd,user_image_url,user_name) values (?,?,?,?)',  //注册
		login : 'select * from user where user_phone = ? and user_pwd = ?',  //登录
		queryByUserPhone : 'select * from user where user_phone = ?',  //查询手机号是否存在
		updateUser : 'update user as u set u.user_image_url = ?,u.user_phone = ?,u.user_name = ?,u.user_sex = ?,u.user_birthday = ?,u.user_address = ?,u.user_description = ? where u.user_id = ?' // 修改个人信息
	},
	// 用户关注
	userAttention:{
		queryById : 'select * from user_attention where user_id = ? and attention_id = ?', // 查询是否关注用户
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
		queryCountByUserId : 'select count(*) as count from article where user_id = ?', // 查询用户发布总数
		queryByUserId : 'select art.*,art_s.sort_article_name from article as art left join article_sort as art_s on art.sort_article_id = art_s.sort_article_id where art.user_id = ? order by art.article_time desc limit ?,?', // 用户帖子分页查询
		insert : 'insert into article(type_id,article_name,article_time,article_ip,article_click,sort_article_id,user_id,article_type,article_content,article_up,article_support,image_type_id) values (?,?,?,?,?,?,?,?,?,?,?,?)', // 插入文章
		index : 'SELECT art.*,art_s.sort_article_name,art_s.sort_article_id,u.user_image_url,u.user_name FROM article AS art JOIN article_sort AS art_s ON art.sort_article_id = art_s.sort_article_id LEFT JOIN USER AS u ON u.user_id = art.user_id where art.type_id=0 ORDER BY art.article_time DESC LIMIT ?,?',
		followIndex : 'select art.*,art_s.sort_article_name,art_s.sort_article_id,u.user_image_url,u.user_name from article as art join article_sort as art_s on art.sort_article_id = art_s.sort_article_id join user as u on u.user_id = art.user_id where art.user_id in (select ua.attention_id from user_attention as ua where ua.user_id = ?) ORDER BY art.article_time DESC LIMIT ?,?', // 首页-关注
		count : 'select count(*) as count from article where type_id = 0',
		queryByArticleId : 'select art.image_type_id,art.article_id,art.article_name,art.article_content,art.article_click,art.article_time,u.user_name,u.user_id,u.user_image_url,art_s.sort_article_name,art_s.image_url,art_s.sort_article_id from article as art left join article_sort as art_s on art.sort_article_id=art_s.sort_article_id left join user as u on art.user_id=u.user_id where art.article_id = ?',
		updateClickByArticleId : 'update article set article_click=article_click+1 where article_id = ?',
		queryArticleByUserId : 'select * from article as art join article_sort as art_s on art.sort_article_id = art_s.sort_article_id where art.user_id = ?', // 根据用户ID查询
		queryCountBySortId : 'select count(*) as count from article where sort_article_id = ?', // 查询贴吧发布了多少帖子
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
	// 用户关注的吧
	articleSortUser:{
		queryCountBySortId : 'select count(*) as count from article_sort_user where article_sort_id = ?', // 查询多少人关注了吧
		queryIsFollow : 'select * from article_sort_user where user_id = ? and article_sort_id = ?', // 查看用户是否关注某个吧
		insert : 'insert into article_sort_user (user_id,article_sort_id,createtime)values(?,?,?)',
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
		queryOneFloor : 'SELECT sm.*, u.user_name,u.user_image_url FROM `user` AS u JOIN stay_message AS sm ON u.user_id = sm.stay_user_id WHERE sm.article_id = ? and sm.floor=? GROUP BY sm.floor ORDER BY sm.floor', // 查询单个楼层
		queryOneFloorListCount : 'SELECT count(*) as count FROM stay_message WHERE article_id = ? AND floor = ? AND parent_id != ""', 
		queryOneFloorList : 'select sm.*,(select u.user_name from user as u where u.user_id = sm.user_id) as user_name,(select u.user_name from user as u where u.user_id = sm.stay_user_id) as stay_user_name from stay_message as sm where sm.article_id = ? and sm.floor = ? and sm.parent_id !="" order by sm.message_stay_time limit ?,?', // 查看单个楼层的子评论
	},
	// 浏览帖子历史
	browseHistory:{
		isExist : 'select * from browse_history where user_id = ? and article_id = ?', // 查看是不是存在这条记录
		update : 'update browse_history as b set b.user_id = ?,b.article_id = ?,b.createtime = ? where b.b_id = ?',
		insert : 'insert into browse_history (user_id,article_id,createtime)values(?,?,?)',
		historyPage : 'select art.*,art_s.sort_article_name,b.createtime from article as art join article_sort as art_s on art.sort_article_id = art_s.sort_article_id join browse_history as b on b.article_id = art.article_id where b.user_id = ? order by b.createtime desc limit ?,?',
		countByUserId : 'select count(*) as count from browse_history where user_id = ?',
		empty : 'delete from browse_history where user_id = ?',
	}
}
