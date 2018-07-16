/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50528
Source Host           : localhost:3306
Source Database       : blog

Target Server Type    : MYSQL
Target Server Version : 50528
File Encoding         : 65001

Date: 2018-07-14 09:32:53
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for about_blog
-- ----------------------------
DROP TABLE IF EXISTS `about_blog`;
CREATE TABLE `about_blog` (
  `blog_id` int(8) NOT NULL AUTO_INCREMENT COMMENT '用户ID',
  `blog_keyword` varchar(255) NOT NULL COMMENT '博客关键字',
  `blog_description` varchar(255) NOT NULL COMMENT '博客描述',
  `blog_name` varchar(36) NOT NULL COMMENT '博客名称',
  `blog_title` varchar(128) NOT NULL COMMENT '博客标题',
  PRIMARY KEY (`blog_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='博客信息表';

-- ----------------------------
-- Records of about_blog
-- ----------------------------

-- ----------------------------
-- Table structure for ad
-- ----------------------------
DROP TABLE IF EXISTS `ad`;
CREATE TABLE `ad` (
  `ad_id` int(8) NOT NULL AUTO_INCREMENT COMMENT '自增ID',
  `position_id` int(8) NOT NULL COMMENT '0,站外广告;从1开始代表的是该广告所处的广告位,同表ad_postition中的字段position_id的值',
  `media_type` int(3) NOT NULL DEFAULT '0' COMMENT '广告类型,0图片;1flash;2代码3文字',
  `ad_name` varchar(60) NOT NULL COMMENT '该条广告记录的广告名称',
  `ad_link` varchar(255) NOT NULL COMMENT '广告链接地址',
  `ad_code` text NOT NULL COMMENT '广告链接的表现,文字广告就是文字或图片和flash就是它们的地址',
  `start_time` datetime NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '广告开始时间',
  `end_time` datetime NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '广告结束时间',
  `link_man` varchar(60) NOT NULL COMMENT '广告联系人',
  `link_email` varchar(60) NOT NULL COMMENT '广告联系人的邮箱',
  `link_phone` varchar(60) NOT NULL COMMENT '广告联系人得电话',
  `click_count` int(8) NOT NULL DEFAULT '0' COMMENT '广告点击次数',
  `enabled` int(3) NOT NULL DEFAULT '1' COMMENT '该广告是否关闭;1开启; 0关闭; 关闭后广告将不再有效',
  PRIMARY KEY (`ad_id`)
) ENGINE=MyISAM AUTO_INCREMENT=13 DEFAULT CHARSET=utf8 COMMENT='广告表';

-- ----------------------------
-- Records of ad
-- ----------------------------

-- ----------------------------
-- Table structure for article
-- ----------------------------
DROP TABLE IF EXISTS `article`;
CREATE TABLE `article` (
  `article_id` int(8) NOT NULL AUTO_INCREMENT COMMENT '日志自增ID号',
  `article_name` varchar(128) DEFAULT NULL COMMENT '文章名称',
  `article_time` datetime DEFAULT NULL COMMENT '发布时间',
  `article_ip` varchar(15) DEFAULT NULL COMMENT '发布IP',
  `article_click` int(10) DEFAULT '0' COMMENT '查看人数',
  `sort_article_id` int(8) DEFAULT NULL COMMENT '所属分类',
  `user_id` int(8) DEFAULT NULL COMMENT '所属用户ID',
  `type_id` int(3) DEFAULT '1' COMMENT '文章分类ID 0：贴吧 1：个人主页  ',
  `article_type` int(13) DEFAULT '1' COMMENT '文章的模式:0:仅自己可见，1:所有人可见，2:仅好友可见',
  `article_content` text COMMENT '文章内容',
  `article_up` int(3) DEFAULT '0' COMMENT '是否置顶:0为否，1为是',
  `article_support` int(3) DEFAULT '0' COMMENT '是否博主推荐:0为否，1为是',
  `essence` int(3) DEFAULT '0' COMMENT '精华:0为否，1为是',
  PRIMARY KEY (`article_id`),
  KEY `文章分类外检` (`type_id`)
) ENGINE=MyISAM AUTO_INCREMENT=77 DEFAULT CHARSET=utf8 COMMENT='文章表';

-- ----------------------------
-- Records of article
-- ----------------------------
INSERT INTO `article` VALUES ('65', '23232323', '2018-07-10 16:49:41', '111.203.188.110', '0', '1', '19', '1', '1', '123123123123', '0', '0', '0');
INSERT INTO `article` VALUES ('63', '222222222', '2018-07-10 16:43:35', '111.203.188.110', '0', '1', '19', '1', '1', '33333333333', '0', '0', '0');
INSERT INTO `article` VALUES ('64', '222', '2018-07-10 16:48:09', '111.203.188.110', '0', '1', '19', '1', '1', '3333', '0', '0', '0');
INSERT INTO `article` VALUES ('70', '太搞笑了！用啊这个姿势看球 无敌了', '2018-07-11 13:07:50', '111.203.188.110', '23', '1', '19', '0', '1', '老兄独一无二的观赛姿势，本以为是个真汉子，没想到振兴竟然是......', '0', '0', '0');
INSERT INTO `article` VALUES ('69', '11', '2018-07-10 17:13:43', '111.203.188.110', '1', '1', '19', '1', '1', '2222222222222222', '0', '0', '0');
INSERT INTO `article` VALUES ('68', '1', '2018-07-10 17:02:03', '111.203.188.110', '0', '1', '19', '1', '1', '2', '0', '0', '1');
INSERT INTO `article` VALUES ('67', '111', '2018-07-10 16:53:49', '111.203.188.110', '2', '1', '19', '0', '1', '222', '0', '0', '1');
INSERT INTO `article` VALUES ('66', '4444444444444444', '2018-07-10 16:52:16', '111.203.188.110', '1', '1', '19', '0', '1', '232222222222', '0', '0', '0');
INSERT INTO `article` VALUES ('62', '1', '2018-07-10 16:37:29', '111.203.188.110', '0', '1', '19', '0', '1', '2', '0', '0', '0');
INSERT INTO `article` VALUES ('61', '1', '2018-07-10 16:37:11', '111.203.188.110', '0', '1', '19', '0', '1', '2', '0', '0', '0');
INSERT INTO `article` VALUES ('60', 'uuuuuuuuuuuuuuuuuuu', '2018-07-10 15:19:37', '111.203.188.110', '0', '1', '19', '1', '1', 'yyyyyyyyyyyyyyyyyyyyyyyyyyyyyy', '0', '0', '0');
INSERT INTO `article` VALUES ('59', '1213', '2018-07-10 15:16:52', '111.203.188.110', '1', '1', '19', '0', '1', '123233333333', '0', '0', '0');
INSERT INTO `article` VALUES ('57', '我成功了', '2018-07-10 13:48:20', '111.203.188.110', '0', '1', '19', '1', '1', '成功了成功了成功率', '0', '0', '0');
INSERT INTO `article` VALUES ('56', '1111111111111111111111111', '2018-07-09 17:50:49', '111.203.188.110', '0', '1', '19', '1', '1', '2222222222222222222222222', '0', '0', '0');
INSERT INTO `article` VALUES ('55', '1111111111111', '2018-07-09 17:49:34', '111.203.188.110', '4', '2', '19', '1', '1', '22222222222222222', '0', '0', '0');
INSERT INTO `article` VALUES ('72', '', '2018-07-12 14:00:13', '111.203.188.110', '0', '-1', '19', '0', '1', '没有没有标题，只有内容', '0', '0', '0');
INSERT INTO `article` VALUES ('73', '', '2018-07-12 14:31:37', '111.203.188.110', '4', '3', '19', '1', '1', '龟吧 ，内容', '0', '0', '0');
INSERT INTO `article` VALUES ('74', '', '2018-07-12 14:48:24', '111.203.188.110', '0', '2', '19', '1', '1', '漫画吧第一个内容', '0', '0', '0');
INSERT INTO `article` VALUES ('75', '', '2018-07-12 14:57:37', '111.203.188.110', '0', '2', '19', '1', '1', '漫画吧内容', '0', '0', '0');
INSERT INTO `article` VALUES ('76', '', '2018-07-12 15:12:32', '111.203.188.110', '5', '3', '19', '0', '1', '龟吧的第一条内容', '0', '0', '0');

-- ----------------------------
-- Table structure for article_image
-- ----------------------------
DROP TABLE IF EXISTS `article_image`;
CREATE TABLE `article_image` (
  `article_image_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '文章图片ID',
  `article_id` int(11) DEFAULT NULL COMMENT '文章ID',
  `article_image_url` text COMMENT '路径',
  PRIMARY KEY (`article_image_id`)
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=utf8 COMMENT='文章图片表';

-- ----------------------------
-- Records of article_image
-- ----------------------------
INSERT INTO `article_image` VALUES ('28', '56', '../../static/uploads/images/img-1531129849022.png');
INSERT INTO `article_image` VALUES ('29', '56', '../../static/uploads/images/img-1531129849054.png');
INSERT INTO `article_image` VALUES ('30', '55', '../../static/uploads/images/img-1531129849054.png');
INSERT INTO `article_image` VALUES ('31', '55', '../../static/uploads/images/img-1531129849054.png');
INSERT INTO `article_image` VALUES ('32', '55', '../../static/uploads/images/img-1531129849054.png');
INSERT INTO `article_image` VALUES ('34', '57', '../../static/uploads/images/img-1531201700097.jpg');
INSERT INTO `article_image` VALUES ('35', '57', '../../static/uploads/images/img-1531201700167.jpg');
INSERT INTO `article_image` VALUES ('36', '57', '../../static/uploads/images/img-1531201700221.jpg');
INSERT INTO `article_image` VALUES ('37', '58', '../../static/uploads/images/img-1531203535095.jpg');
INSERT INTO `article_image` VALUES ('38', '59', '../../static/uploads/images/img-1531207012841.png');
INSERT INTO `article_image` VALUES ('39', '60', '../../static/uploads/images/img-1531207177377.png');
INSERT INTO `article_image` VALUES ('40', '60', '../../static/uploads/images/img-1531207177397.png');
INSERT INTO `article_image` VALUES ('41', '70', '../../static/uploads/images/img-1531285670470.jpg');
INSERT INTO `article_image` VALUES ('42', '70', '../../static/uploads/images/img-1531285670479.jpg');
INSERT INTO `article_image` VALUES ('43', '70', '../../static/uploads/images/img-1531285670489.jpg');
INSERT INTO `article_image` VALUES ('44', '70', '../../static/uploads/images/img-1531285670504.jpg');
INSERT INTO `article_image` VALUES ('45', '70', '../../static/uploads/images/img-1531285670527.jpg');
INSERT INTO `article_image` VALUES ('46', '72', '../../static/uploads/images/img-1531375213305.jpg');
INSERT INTO `article_image` VALUES ('47', '73', '../../static/uploads/images/img-1531377097653.jpg');
INSERT INTO `article_image` VALUES ('48', '74', '../../static/uploads/images/img-1531378104596.jpg');
INSERT INTO `article_image` VALUES ('49', '74', '../../static/uploads/images/img-1531378104705.jpg');
INSERT INTO `article_image` VALUES ('50', '75', '../../static/uploads/images/img-1531378657729.jpg');
INSERT INTO `article_image` VALUES ('51', '76', '../../static/uploads/images/img-1531379552081.jpg');

-- ----------------------------
-- Table structure for article_sort
-- ----------------------------
DROP TABLE IF EXISTS `article_sort`;
CREATE TABLE `article_sort` (
  `sort_article_id` int(8) NOT NULL AUTO_INCREMENT COMMENT '文章分类自增ID',
  `sort_article_name` varchar(60) NOT NULL COMMENT '分类名称',
  `image_url` text COMMENT '图片',
  `desc` varchar(255) DEFAULT NULL COMMENT '描述',
  PRIMARY KEY (`sort_article_id`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COMMENT='文章分类表';

-- ----------------------------
-- Records of article_sort
-- ----------------------------
INSERT INTO `article_sort` VALUES ('1', '甲壳虫', '../../static/images/tieba.jpg', null);
INSERT INTO `article_sort` VALUES ('2', '漫画', '../../static/images/tieba.jpg', null);
INSERT INTO `article_sort` VALUES ('3', '龟', '../../static/images/tieba.jpg', null);
INSERT INTO `article_sort` VALUES ('4', '荒野行动', '../../static/images/tieba.jpg', null);
INSERT INTO `article_sort` VALUES ('5', '孔雀鱼', '../../static/images/tieba.jpg', null);
INSERT INTO `article_sort` VALUES ('6', '采育', '../../static/images/tieba.jpg', null);

-- ----------------------------
-- Table structure for article_sort_user
-- ----------------------------
DROP TABLE IF EXISTS `article_sort_user`;
CREATE TABLE `article_sort_user` (
  `art_s_user_id` int(8) NOT NULL AUTO_INCREMENT,
  `user_id` int(8) DEFAULT NULL,
  `article_sort_id` int(8) DEFAULT NULL,
  PRIMARY KEY (`art_s_user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COMMENT='关注的吧';

-- ----------------------------
-- Records of article_sort_user
-- ----------------------------
INSERT INTO `article_sort_user` VALUES ('1', '19', '1');
INSERT INTO `article_sort_user` VALUES ('2', '19', '2');
INSERT INTO `article_sort_user` VALUES ('3', '19', '3');
INSERT INTO `article_sort_user` VALUES ('4', '19', '4');
INSERT INTO `article_sort_user` VALUES ('5', '19', '5');

-- ----------------------------
-- Table structure for friend
-- ----------------------------
DROP TABLE IF EXISTS `friend`;
CREATE TABLE `friend` (
  `f_id` int(8) NOT NULL AUTO_INCREMENT COMMENT '自增ID',
  `user_id` int(8) NOT NULL COMMENT '用户ID',
  `friend_id` int(8) NOT NULL COMMENT '好友ID',
  PRIMARY KEY (`f_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='好友表';

-- ----------------------------
-- Records of friend
-- ----------------------------

-- ----------------------------
-- Table structure for friendly_link
-- ----------------------------
DROP TABLE IF EXISTS `friendly_link`;
CREATE TABLE `friendly_link` (
  `link_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '友情链接自增ID',
  `link_name` varchar(255) NOT NULL COMMENT '友情链接名称',
  `link_url` varchar(255) NOT NULL COMMENT '链接地址',
  `link_logo` varchar(255) NOT NULL COMMENT 'LOGO图片',
  `show_order` varchar(255) NOT NULL COMMENT '在页面显示的顺序',
  PRIMARY KEY (`link_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='友情链接';

-- ----------------------------
-- Records of friendly_link
-- ----------------------------

-- ----------------------------
-- Table structure for phone_message
-- ----------------------------
DROP TABLE IF EXISTS `phone_message`;
CREATE TABLE `phone_message` (
  `phone_id` int(8) NOT NULL AUTO_INCREMENT COMMENT '自增ID号',
  `phone_num` varchar(12) NOT NULL COMMENT '用户手机号码',
  `contents` varchar(255) NOT NULL COMMENT '发送内容',
  `send_time` datetime NOT NULL COMMENT '发送时间',
  `user_id` int(8) NOT NULL COMMENT '用户ID',
  PRIMARY KEY (`phone_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='短信记录表';

-- ----------------------------
-- Records of phone_message
-- ----------------------------

-- ----------------------------
-- Table structure for photo_sort
-- ----------------------------
DROP TABLE IF EXISTS `photo_sort`;
CREATE TABLE `photo_sort` (
  `sort_img_id` int(8) NOT NULL AUTO_INCREMENT COMMENT '相册ID',
  `sort_img_name` varchar(20) NOT NULL COMMENT '相册名',
  `sort_img_type` varchar(20) NOT NULL COMMENT '展示方式 0->仅主人可见,1->输入密码即可查看,2->仅好友能查看,3->回答问题即可查看',
  `img_password` varchar(32) NOT NULL COMMENT '查看密码',
  `user_id` int(8) NOT NULL COMMENT '所属用户ID',
  `img_sort_question` varchar(255) NOT NULL COMMENT '访问问题',
  `img_sort_answer` varchar(255) NOT NULL COMMENT '访问问题的答案',
  `type_id` int(3) NOT NULL DEFAULT '1' COMMENT '默认1表示相册板块',
  `top_pic_src` varchar(128) NOT NULL COMMENT '封面图片的路径',
  PRIMARY KEY (`sort_img_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='相片分类表';

-- ----------------------------
-- Records of photo_sort
-- ----------------------------

-- ----------------------------
-- Table structure for photos
-- ----------------------------
DROP TABLE IF EXISTS `photos`;
CREATE TABLE `photos` (
  `photo_id` int(8) NOT NULL AUTO_INCREMENT COMMENT '相片ID',
  `photo_name` varchar(255) NOT NULL COMMENT '相片名称',
  `photo_src` varchar(255) NOT NULL COMMENT '图片路径',
  `photo_description` varchar(255) NOT NULL COMMENT '图片描述',
  `user_id` int(8) NOT NULL COMMENT '所属用户ID',
  `sort_id` int(8) NOT NULL COMMENT '所属相册ID',
  `upload_time` datetime NOT NULL COMMENT '图片上传时间',
  `upload_ip` varchar(15) NOT NULL COMMENT '图片操作上传IP地址',
  PRIMARY KEY (`photo_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='相片表';

-- ----------------------------
-- Records of photos
-- ----------------------------

-- ----------------------------
-- Table structure for power_list
-- ----------------------------
DROP TABLE IF EXISTS `power_list`;
CREATE TABLE `power_list` (
  `p_id` int(8) NOT NULL AUTO_INCREMENT COMMENT '自增ID',
  `power_id` int(8) NOT NULL COMMENT '权限ID',
  `power_name` varchar(36) DEFAULT NULL COMMENT '权限描述',
  PRIMARY KEY (`p_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='功能权限表';

-- ----------------------------
-- Records of power_list
-- ----------------------------

-- ----------------------------
-- Table structure for secret_message
-- ----------------------------
DROP TABLE IF EXISTS `secret_message`;
CREATE TABLE `secret_message` (
  `secret_id` int(8) NOT NULL AUTO_INCREMENT COMMENT '自增私信ID',
  `send_id` int(8) NOT NULL COMMENT '发信者ID',
  `receive_id` int(8) NOT NULL COMMENT '收信者ID',
  `message_topic` varchar(64) NOT NULL COMMENT '私信标题',
  `message_content` varchar(255) NOT NULL COMMENT '私信内容',
  PRIMARY KEY (`secret_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='用户私信表';

-- ----------------------------
-- Records of secret_message
-- ----------------------------

-- ----------------------------
-- Table structure for shuoshuo
-- ----------------------------
DROP TABLE IF EXISTS `shuoshuo`;
CREATE TABLE `shuoshuo` (
  `shuo_id` int(8) NOT NULL AUTO_INCREMENT COMMENT '说说记录ID',
  `user_id` int(8) NOT NULL COMMENT '用户ID',
  `shuo_time` datetime NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '发布时间',
  `shuo_ip` varchar(15) NOT NULL COMMENT '说说发布时的IP地址',
  `shuoshuo` varchar(255) NOT NULL COMMENT '说说内容',
  `type_id` int(3) NOT NULL DEFAULT '3' COMMENT '栏目ID,默认为3',
  PRIMARY KEY (`shuo_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of shuoshuo
-- ----------------------------

-- ----------------------------
-- Table structure for stay_message
-- ----------------------------
DROP TABLE IF EXISTS `stay_message`;
CREATE TABLE `stay_message` (
  `stay_id` int(8) NOT NULL AUTO_INCREMENT COMMENT '留言表自增ID',
  `user_id` int(8) NOT NULL COMMENT '用户ID',
  `stay_user_id` int(8) NOT NULL COMMENT '留言者ID',
  `message_content` varchar(255) NOT NULL COMMENT '留言内容',
  `stay_user_ip` varchar(15) NOT NULL COMMENT '留言用户的IP地址',
  `message_stay_time` datetime NOT NULL COMMENT '留言时间',
  `place` varchar(64) NOT NULL COMMENT '地区',
  PRIMARY KEY (`stay_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='用户留言表';

-- ----------------------------
-- Records of stay_message
-- ----------------------------

-- ----------------------------
-- Table structure for system_message
-- ----------------------------
DROP TABLE IF EXISTS `system_message`;
CREATE TABLE `system_message` (
  `system_id` int(8) NOT NULL COMMENT '系统通知ID',
  `send_id` int(8) NOT NULL COMMENT '接受者ID',
  `group_id` int(8) NOT NULL COMMENT '用户组ID',
  `send_default` int(3) NOT NULL COMMENT '1时发送所有用户，0时则不采用',
  `system_topic` varchar(60) NOT NULL COMMENT '通知内容',
  `system_content` varchar(255) NOT NULL COMMENT '通知内容',
  PRIMARY KEY (`system_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='系统通知表';

-- ----------------------------
-- Records of system_message
-- ----------------------------

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `user_id` int(8) NOT NULL AUTO_INCREMENT COMMENT '用户ID',
  `group_id` int(8) DEFAULT NULL COMMENT '用户组ID',
  `user_name` varchar(32) DEFAULT NULL COMMENT '用户名',
  `user_pwd` varchar(32) DEFAULT NULL COMMENT '密码',
  `user_phone` varchar(12) DEFAULT NULL COMMENT '用户手机号码',
  `user_sex` varchar(6) DEFAULT NULL COMMENT '用户性别',
  `user_qq` varchar(9) DEFAULT NULL COMMENT '用户QQ号码',
  `user_email` varchar(64) DEFAULT NULL COMMENT '用户EMAIL地址',
  `user_address` varchar(255) DEFAULT NULL COMMENT '用户地址',
  `user_mark` varchar(8) DEFAULT NULL COMMENT '用户积分',
  `user_rank_id` int(3) DEFAULT NULL COMMENT '用户等级',
  `user_last_login_ip` varchar(15) DEFAULT NULL COMMENT '用户上一次登录IP地址',
  `user_birthday` int(13) DEFAULT NULL COMMENT '用户生日',
  `user_description` varchar(255) DEFAULT NULL COMMENT '自我描述',
  `user_image_url` varchar(255) DEFAULT NULL COMMENT '用户头像存储路径',
  `user_school` varchar(255) DEFAULT NULL COMMENT '毕业学校',
  `user_register_time` datetime DEFAULT NULL COMMENT '用户注册时间',
  `user_register_ip` varchar(15) DEFAULT NULL COMMENT '用户注册时IP地址',
  `user_last_update_time` datetime DEFAULT NULL COMMENT '用户上次更新博客时间',
  `user_weibo` varchar(255) DEFAULT NULL COMMENT '用户微博',
  `user_blood_type` varchar(3) DEFAULT NULL COMMENT '用户血型',
  `user_says` varchar(255) DEFAULT NULL COMMENT '用户语录',
  `user_lock` int(3) DEFAULT NULL COMMENT '是否锁定，0为不锁定，1为锁定',
  `user_freeze` int(3) DEFAULT NULL COMMENT '是否冻结，0为不冻结，1为冻结',
  `user_power` varchar(255) DEFAULT NULL COMMENT '拥有权限',
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8 COMMENT='user 用户表';

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('19', null, 'chaoge', 'e10adc3949ba59abbe56e057f20f883e', null, null, null, null, null, null, null, null, null, null, '../../static/images/user.jpg', null, null, null, null, null, null, null, null, null, null);

-- ----------------------------
-- Table structure for user_attention
-- ----------------------------
DROP TABLE IF EXISTS `user_attention`;
CREATE TABLE `user_attention` (
  `a_id` int(8) NOT NULL AUTO_INCREMENT COMMENT '自增ID',
  `user_id` int(8) NOT NULL COMMENT '用户ID',
  `attention_id` int(8) NOT NULL COMMENT '关注ID',
  PRIMARY KEY (`a_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='用户关注表';

-- ----------------------------
-- Records of user_attention
-- ----------------------------

-- ----------------------------
-- Table structure for user_comment
-- ----------------------------
DROP TABLE IF EXISTS `user_comment`;
CREATE TABLE `user_comment` (
  `c_id` int(8) NOT NULL AUTO_INCREMENT COMMENT '评论自增ID号',
  `user_id` int(8) NOT NULL COMMENT '收到评论的用户ID',
  `type_id` int(3) NOT NULL COMMENT '评论栏目ID',
  `commit_id` int(8) NOT NULL COMMENT '评论内容的ID',
  `commit_content` varchar(255) NOT NULL COMMENT '评论内容',
  `commit_user_id` int(8) NOT NULL COMMENT '评论者ID',
  `commit_time` datetime NOT NULL COMMENT '评论时间',
  `commit_ip` varchar(15) NOT NULL COMMENT '评论时的IP地址',
  PRIMARY KEY (`c_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='用户评论表';

-- ----------------------------
-- Records of user_comment
-- ----------------------------

-- ----------------------------
-- Table structure for user_group
-- ----------------------------
DROP TABLE IF EXISTS `user_group`;
CREATE TABLE `user_group` (
  `g_id` int(8) NOT NULL AUTO_INCREMENT COMMENT '自增ID号',
  `group_id` int(8) DEFAULT NULL COMMENT '用户组ID',
  `group_name` varchar(20) DEFAULT NULL COMMENT '用户组名',
  `group_power` varchar(20) DEFAULT NULL COMMENT '用户权限',
  PRIMARY KEY (`g_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='用户组表';

-- ----------------------------
-- Records of user_group
-- ----------------------------

-- ----------------------------
-- Table structure for user_rank
-- ----------------------------
DROP TABLE IF EXISTS `user_rank`;
CREATE TABLE `user_rank` (
  `rank_id` int(8) NOT NULL AUTO_INCREMENT COMMENT '自增ID',
  `user_rank_id` int(8) DEFAULT NULL COMMENT '等级ID',
  `rank_mark` int(8) DEFAULT NULL COMMENT '等级积分',
  `rank_name` varchar(32) DEFAULT NULL COMMENT '等级名称',
  PRIMARY KEY (`rank_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='用户权限表';

-- ----------------------------
-- Records of user_rank
-- ----------------------------

-- ----------------------------
-- Table structure for visitor
-- ----------------------------
DROP TABLE IF EXISTS `visitor`;
CREATE TABLE `visitor` (
  `v_id` int(8) NOT NULL AUTO_INCREMENT COMMENT '访客记录ID',
  `visitor_id` int(8) NOT NULL COMMENT '访客ID',
  `visitor_time` datetime NOT NULL COMMENT '来访时间',
  `user_id` int(8) NOT NULL COMMENT '被访用户ID',
  `visitor_ip` varchar(15) NOT NULL COMMENT '访客IP地址',
  `type_id` int(3) NOT NULL COMMENT '访问板块ID',
  `where_id` int(8) NOT NULL COMMENT '查看某板块的某个子项目，如查看相册板块的第3个相册，该ID对应该相册的ID号',
  PRIMARY KEY (`v_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='最近访客表';

-- ----------------------------
-- Records of visitor
-- ----------------------------
