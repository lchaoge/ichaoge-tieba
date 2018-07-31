/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50528
Source Host           : localhost:3306
Source Database       : blog

Target Server Type    : MYSQL
Target Server Version : 50528
File Encoding         : 65001

Date: 2018-07-31 17:59:57
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
  `sort_article_id` int(8) DEFAULT NULL COMMENT '贴吧分类id',
  `user_id` int(8) DEFAULT NULL COMMENT '所属用户ID',
  `type_id` int(3) DEFAULT '1' COMMENT '文章分类ID 0：贴吧 1：个人主页  ',
  `article_type` int(13) DEFAULT '1' COMMENT '文章的模式:0:仅自己可见，1:所有人可见，2:仅好友可见',
  `article_content` text COMMENT '文章内容',
  `article_up` int(3) DEFAULT '0' COMMENT '是否置顶:0为否，1为是',
  `article_support` int(3) DEFAULT '0' COMMENT '是否博主推荐:0为否，1为是',
  `essence` int(3) DEFAULT '0' COMMENT '精华:0为否，1为是',
  `image_type_id` int(8) DEFAULT '1' COMMENT '上传文件类型 1：图片 0：视频',
  PRIMARY KEY (`article_id`),
  KEY `文章分类外检` (`type_id`)
) ENGINE=MyISAM AUTO_INCREMENT=98 DEFAULT CHARSET=utf8 COMMENT='文章表';

-- ----------------------------
-- Records of article
-- ----------------------------
INSERT INTO `article` VALUES ('65', '', '2018-07-10 16:49:41', '111.203.188.110', '1', '1', '19', '1', '1', '万能的贴吧，谁能告诉我那只大的蛋龟到底是什么品种。 公的腹甲有十厘米，大JJ，想给他找个老婆。', '0', '0', '0', '1');
INSERT INTO `article` VALUES ('63', '', '2018-07-10 16:43:35', '111.203.188.110', '0', '1', '19', '1', '1', '手把手教你简洁巨蛋缸的规划设计与制作', '0', '0', '0', '1');
INSERT INTO `article` VALUES ('64', '', '2018-07-10 16:48:09', '111.203.188.110', '0', '1', '19', '1', '1', '4只大亚成窄桥出售！2公2母！', '0', '0', '0', '1');
INSERT INTO `article` VALUES ('70', '太搞笑了！用啊这个姿势看球 无敌了', '2018-07-11 13:07:50', '111.203.188.110', '149', '1', '19', '0', '1', '老兄独一无二的观赛姿势，本以为是个真汉子，没想到振兴竟然是......', '0', '0', '0', '1');
INSERT INTO `article` VALUES ('69', '今年剃刀苗子什么行情', '2018-07-10 17:13:43', '111.203.188.110', '1', '1', '19', '1', '1', '兰州本地出一只墨蛋700剃刀200蛇颈180只限自提', '0', '0', '0', '1');
INSERT INTO `article` VALUES ('68', '', '2018-07-10 17:02:03', '111.203.188.110', '0', '1', '19', '1', '1', '**是买不起的，这辈子都不可能的。也就养养wc才能维持的了爱好。想问wc天天喂催肥好吗', '0', '0', '1', '1');
INSERT INTO `article` VALUES ('67', '甲壳虫', '2018-07-10 16:53:49', '111.203.188.110', '2', '1', '19', '0', '1', '上海同城出售个精品果核蛋龟状态好的不行蛋龟和龟 从小养大的蛋龟状态好只限自提明码450 本交易支持自', '0', '0', '1', '1');
INSERT INTO `article` VALUES ('66', '', '2018-07-10 16:52:16', '111.203.188.110', '2', '1', '19', '0', '1', '一年cb 背甲有点黑斑点 不明显满纹，其他全品，明码3600，价格一分不刀谢谢，有意私聊', '0', '0', '0', '1');
INSERT INTO `article` VALUES ('62', '', '2018-07-10 16:37:29', '111.203.188.110', '0', '1', '19', '0', '1', '新手准备入一只蛋龟，求教麝香还是剃刀，主要考虑不咬人，咬人不疼… 谢谢', '0', '0', '0', '1');
INSERT INTO `article` VALUES ('61', '', '2018-07-10 16:37:11', '111.203.188.110', '0', '1', '19', '0', '1', '来了三天趴沉木上不吃不动，后来撤了沉木还是不动不开食，求教。再有麻烦各位看看品相如何？', '0', '0', '0', '1');
INSERT INTO `article` VALUES ('60', '', '2018-07-10 15:19:37', '111.203.188.110', '0', '1', '19', '1', '1', '看来最近要缓缓了 还是你们几个让我比较省心', '0', '0', '0', '1');
INSERT INTO `article` VALUES ('59', '', '2018-07-10 15:16:52', '111.203.188.110', '1', '1', '19', '0', '1', '向吧里大佬们求助，不开食怎么办啊，已经静养一两天了，该喂什么才能开食啊', '0', '0', '0', '1');
INSERT INTO `article` VALUES ('57', '', '2018-07-10 13:48:20', '111.203.188.110', '1', '1', '19', '1', '1', '成功了成功了成功率', '0', '0', '0', '1');
INSERT INTO `article` VALUES ('56', '', '2018-07-09 17:50:49', '111.203.188.110', '0', '1', '19', '1', '1', '德彩super到底有没有营养？手里有三色 善玉菌 虾干，是不是可以把德彩扔掉了？？', '0', '0', '0', '1');
INSERT INTO `article` VALUES ('55', '', '2018-07-09 17:49:34', '111.203.188.110', '5', '2', '19', '1', '1', '2.5cm小麝香苗来家里5天了，每次在晒台上看到我立马就扑通跳进水里，以为自己养的是青蛙呢，这货不疼', '0', '0', '0', '1');
INSERT INTO `article` VALUES ('72', '', '2018-07-12 14:00:13', '111.203.188.110', '1', '-1', '19', '0', '1', '没有没有标题，只有内容', '0', '0', '0', '1');
INSERT INTO `article` VALUES ('73', '', '2018-07-12 14:31:37', '111.203.188.110', '4', '3', '19', '1', '1', '龟吧 ，内容', '0', '0', '0', '1');
INSERT INTO `article` VALUES ('74', '', '2018-07-12 14:48:24', '111.203.188.110', '0', '2', '19', '1', '1', '漫画吧第一个内容', '0', '0', '0', '1');
INSERT INTO `article` VALUES ('75', '', '2018-07-12 14:57:37', '111.203.188.110', '5', '2', '19', '1', '1', '漫画吧内容', '0', '0', '0', '1');
INSERT INTO `article` VALUES ('76', '', '2018-07-12 15:12:32', '111.203.188.110', '10', '3', '19', '0', '1', '龟吧的第一条内容', '0', '0', '0', '1');
INSERT INTO `article` VALUES ('77', '', '2018-07-18 17:46:29', '111.203.188.110', '3', '1', '21', '0', '1', '发布在甲壳虫吧的内容', '0', '0', '0', '1');
INSERT INTO `article` VALUES ('78', '', '2018-07-18 17:50:31', '111.203.188.110', '5', '1', '21', '0', '1', '我发表了一篇视频贴，大伙来看看吧~', '0', '0', '0', '1');
INSERT INTO `article` VALUES ('79', '', '2018-07-18 17:50:52', '111.203.188.110', '4', '1', '21', '0', '1', '发布测试2', '0', '0', '0', '1');
INSERT INTO `article` VALUES ('80', '', '2018-07-18 17:51:05', '111.203.188.110', '0', '-1', '21', '1', '1', '发布测试3', '0', '0', '0', '1');
INSERT INTO `article` VALUES ('81', '', '2018-07-18 17:51:27', '111.203.188.110', '0', '-1', '21', '1', '1', '发布测试4', '0', '0', '0', '1');
INSERT INTO `article` VALUES ('82', '', '2018-07-18 17:52:23', '111.203.188.110', '0', '1', '21', '0', '1', '发布测试33', '0', '0', '0', '1');
INSERT INTO `article` VALUES ('83', '', '2018-07-18 17:53:00', '111.203.188.110', '29', '1', '21', '0', '1', '发布测试4444', '0', '0', '0', '1');
INSERT INTO `article` VALUES ('84', '', '2018-07-18 17:54:26', '111.203.188.110', '35', '1', '21', '0', '1', '发布测试5555555555555', '0', '0', '0', '1');
INSERT INTO `article` VALUES ('85', '', '2018-07-20 17:31:15', '111.203.188.110', '37', '3', '21', '0', '1', '当晚到家  状态不错  折腾完环境再发记录图', '0', '0', '0', '1');
INSERT INTO `article` VALUES ('86', '', '2018-07-23 17:31:24', '111.203.188.110', '7', '9', '19', '0', '1', '草缸的第一帖', '0', '0', '0', '1');
INSERT INTO `article` VALUES ('87', '', '2018-07-24 13:20:19', '111.203.188.110', '0', '-1', '19', '1', '1', '甲壳虫', '0', '0', '0', '1');
INSERT INTO `article` VALUES ('88', '', '2018-07-25 11:42:42', '111.203.188.110', '0', '-1', '19', '1', '1', '发布到个人主页', '0', '0', '0', '1');
INSERT INTO `article` VALUES ('89', '', '2018-07-26 13:32:31', '111.203.188.110', '0', '-1', '19', '1', '1', '视频文件伤处你', '0', '0', '0', '1');
INSERT INTO `article` VALUES ('90', '', '2018-07-26 13:48:25', '111.203.188.110', '0', '-1', '19', '1', '1', '视频测试2', '0', '0', '0', '0');
INSERT INTO `article` VALUES ('91', '', '2018-07-26 13:50:10', '111.203.188.110', '0', '-1', '19', '1', '1', '奥术大师多', '0', '0', '0', '0');
INSERT INTO `article` VALUES ('92', '', '2018-07-26 13:50:39', '111.203.188.110', '2', '-1', '28', '1', '1', '测试', '0', '0', '0', '0');
INSERT INTO `article` VALUES ('93', '', '2018-07-26 13:52:35', '111.203.188.110', '1', '-1', '28', '1', '1', '测试', '0', '0', '0', '0');
INSERT INTO `article` VALUES ('94', '', '2018-07-26 14:28:51', '111.203.188.110', '13', '1', '19', '0', '1', '测试，发布到甲壳虫吧视频', '0', '0', '0', '0');
INSERT INTO `article` VALUES ('95', '', '2018-07-26 14:33:10', '111.203.188.110', '78', '1', '19', '0', '1', '测试视频', '0', '0', '0', '0');
INSERT INTO `article` VALUES ('96', '', '2018-07-27 17:03:51', '111.203.188.110', '153', '10', '19', '0', '1', 'sdasdasdasdadasdasdasdasd', '0', '0', '0', '0');
INSERT INTO `article` VALUES ('97', '', '2018-07-30 14:10:33', '111.203.188.110', '54', '24', '29', '0', '1', '50发布帖子', '0', '0', '0', null);

-- ----------------------------
-- Table structure for article_image
-- ----------------------------
DROP TABLE IF EXISTS `article_image`;
CREATE TABLE `article_image` (
  `article_image_id` int(8) NOT NULL AUTO_INCREMENT COMMENT '文章图片ID',
  `article_id` int(8) DEFAULT NULL COMMENT '文章ID',
  `article_image_url` text COMMENT '路径',
  `createtime` datetime DEFAULT NULL COMMENT '创建时间',
  `image_type_id` int(8) DEFAULT '1' COMMENT '上传文件类型 1：图片 0：视频',
  PRIMARY KEY (`article_image_id`)
) ENGINE=InnoDB AUTO_INCREMENT=68 DEFAULT CHARSET=utf8 COMMENT='文章图片表';

-- ----------------------------
-- Records of article_image
-- ----------------------------
INSERT INTO `article_image` VALUES ('28', '56', '../../static/uploads/images/img-1531129849022.png', '2018-07-26 13:52:35', '1');
INSERT INTO `article_image` VALUES ('29', '56', '../../static/uploads/images/img-1531129849054.png', '2018-07-26 13:52:35', '1');
INSERT INTO `article_image` VALUES ('30', '55', '../../static/uploads/images/img-1531129849054.png', '2018-07-26 13:52:35', '1');
INSERT INTO `article_image` VALUES ('31', '55', '../../static/uploads/images/img-1531129849054.png', '2018-07-26 13:52:35', '1');
INSERT INTO `article_image` VALUES ('32', '55', '../../static/uploads/images/img-1531129849054.png', '2018-07-26 13:52:35', '1');
INSERT INTO `article_image` VALUES ('34', '57', '../../static/uploads/images/img-1531201700097.jpg', '2018-07-26 13:52:35', '1');
INSERT INTO `article_image` VALUES ('35', '57', '../../static/uploads/images/img-1531201700167.jpg', '2018-07-26 13:52:35', '1');
INSERT INTO `article_image` VALUES ('36', '57', '../../static/uploads/images/img-1531201700221.jpg', '2018-07-26 13:52:35', '1');
INSERT INTO `article_image` VALUES ('37', '58', '../../static/uploads/images/img-1531203535095.jpg', '2018-07-26 13:52:35', '1');
INSERT INTO `article_image` VALUES ('38', '59', '../../static/uploads/images/img-1531207012841.png', '2018-07-26 13:52:35', '1');
INSERT INTO `article_image` VALUES ('39', '60', '../../static/uploads/images/img-1531207177377.png', '2018-07-26 13:52:35', '1');
INSERT INTO `article_image` VALUES ('40', '60', '../../static/uploads/images/img-1531207177397.png', '2018-07-26 13:52:35', '1');
INSERT INTO `article_image` VALUES ('41', '70', '../../static/uploads/images/img-1531285670470.jpg', '2018-07-26 13:52:35', '1');
INSERT INTO `article_image` VALUES ('42', '70', '../../static/uploads/images/img-1531285670479.jpg', '2018-07-26 13:52:35', '1');
INSERT INTO `article_image` VALUES ('43', '70', '../../static/uploads/images/img-1531285670489.jpg', '2018-07-26 13:52:35', '1');
INSERT INTO `article_image` VALUES ('44', '70', '../../static/uploads/images/img-1531285670504.jpg', '2018-07-26 13:52:35', '1');
INSERT INTO `article_image` VALUES ('45', '70', '../../static/uploads/images/img-1531285670527.jpg', '2018-07-26 13:52:35', '1');
INSERT INTO `article_image` VALUES ('46', '72', '../../static/uploads/images/img-1531375213305.jpg', '2018-07-26 13:52:35', '1');
INSERT INTO `article_image` VALUES ('47', '73', '../../static/uploads/images/img-1531377097653.jpg', '2018-07-26 13:52:35', '1');
INSERT INTO `article_image` VALUES ('48', '74', '../../static/uploads/images/img-1531378104596.jpg', '2018-07-26 13:52:35', '1');
INSERT INTO `article_image` VALUES ('49', '74', '../../static/uploads/images/img-1531378104705.jpg', '2018-07-26 13:52:35', '1');
INSERT INTO `article_image` VALUES ('50', '75', '../../static/uploads/images/img-1531378657729.jpg', '2018-07-26 13:52:35', '1');
INSERT INTO `article_image` VALUES ('51', '76', '../../static/uploads/images/img-1531379552081.jpg', '2018-07-26 13:52:35', '1');
INSERT INTO `article_image` VALUES ('52', '77', '../../static/uploads/images/img-1531907189243.png', '2018-07-26 13:52:35', '1');
INSERT INTO `article_image` VALUES ('53', '78', '../../static/uploads/images/img-1531907431808.jpg', '2018-07-26 13:52:35', '1');
INSERT INTO `article_image` VALUES ('54', '79', '../../static/uploads/images/img-1531907452762.jpg', '2018-07-26 13:52:35', '1');
INSERT INTO `article_image` VALUES ('55', '80', '../../static/uploads/images/img-1531907465105.jpg', '2018-07-26 13:52:35', '1');
INSERT INTO `article_image` VALUES ('56', '81', '../../static/uploads/images/img-1531907487964.png', '2018-07-26 13:52:35', '1');
INSERT INTO `article_image` VALUES ('57', '82', '../../static/uploads/images/img-1531907543164.png', '2018-07-26 13:52:35', '1');
INSERT INTO `article_image` VALUES ('58', '83', '../../static/uploads/images/img-1531907580719.png', '2018-07-26 13:52:35', '1');
INSERT INTO `article_image` VALUES ('59', '83', '../../static/uploads/images/img-1531907580748.png', '2018-07-26 13:52:35', '1');
INSERT INTO `article_image` VALUES ('60', '84', '../../static/uploads/images/img-1531907666600.png', '2018-07-26 13:52:35', '1');
INSERT INTO `article_image` VALUES ('61', '84', '../../static/uploads/images/img-1531907666601.png', '2018-07-26 13:52:35', '1');
INSERT INTO `article_image` VALUES ('62', '88', '../../static/uploads/images/img-1532490162592.jpg', '2018-07-26 13:52:35', '1');
INSERT INTO `article_image` VALUES ('63', '89', '../../static/uploads/images/img-1532583149215.mp4', '2018-07-26 13:52:35', '0');
INSERT INTO `article_image` VALUES ('64', '93', '../../static/uploads/images/img-1532584352234.mp4', '2018-07-26 13:52:35', '0');
INSERT INTO `article_image` VALUES ('65', '94', '../../static/uploads/images/img-1532586528524.mp4', '2018-07-26 14:28:51', '0');
INSERT INTO `article_image` VALUES ('66', '95', '../../static/uploads/images/img-1532586787373.mp4', '2018-07-26 14:33:10', '0');
INSERT INTO `article_image` VALUES ('67', '96', '../../static/uploads/images/img-1532682226761.mp4', '2018-07-27 17:03:51', '0');

-- ----------------------------
-- Table structure for article_sort
-- ----------------------------
DROP TABLE IF EXISTS `article_sort`;
CREATE TABLE `article_sort` (
  `sort_article_id` int(8) NOT NULL AUTO_INCREMENT COMMENT '文章分类自增ID',
  `sort_article_name` varchar(60) NOT NULL COMMENT '分类名称',
  `image_url` text COMMENT '图片',
  `desc` varchar(255) DEFAULT NULL COMMENT '描述',
  `createtime` datetime DEFAULT NULL,
  PRIMARY KEY (`sort_article_id`)
) ENGINE=MyISAM AUTO_INCREMENT=46 DEFAULT CHARSET=utf8 COMMENT='文章分类表';

-- ----------------------------
-- Records of article_sort
-- ----------------------------
INSERT INTO `article_sort` VALUES ('1', '甲壳虫', '../../static/images/tieba.jpg', null, null);
INSERT INTO `article_sort` VALUES ('2', '漫画', '../../static/images/tieba.jpg', null, null);
INSERT INTO `article_sort` VALUES ('3', '龟', '../../static/images/tieba.jpg', null, null);
INSERT INTO `article_sort` VALUES ('4', '荒野行动', '../../static/images/tieba.jpg', null, null);
INSERT INTO `article_sort` VALUES ('5', '孔雀鱼', '../../static/images/tieba.jpg', null, null);
INSERT INTO `article_sort` VALUES ('6', '采育', '../../static/images/tieba.jpg', null, null);
INSERT INTO `article_sort` VALUES ('7', '水陆缸', '../../static/images/tieba.jpg', null, null);
INSERT INTO `article_sort` VALUES ('8', '水槽造景', '../../static/images/tieba.jpg', null, null);
INSERT INTO `article_sort` VALUES ('9', '草缸', '../../static/images/tieba.jpg', null, null);
INSERT INTO `article_sort` VALUES ('10', '造景', '../../static/images/tieba.jpg', null, null);
INSERT INTO `article_sort` VALUES ('11', '一度水草造景', '../../static/images/tieba.jpg', null, null);
INSERT INTO `article_sort` VALUES ('12', '巴西龟', '../../static/images/tieba.jpg', null, null);
INSERT INTO `article_sort` VALUES ('13', '我们爱龟', '../../static/images/tieba.jpg', null, null);
INSERT INTO `article_sort` VALUES ('14', 'gif', '../../static/images/tieba.jpg', null, null);
INSERT INTO `article_sort` VALUES ('15', '中华草龟', '../../static/images/tieba.jpg', null, null);
INSERT INTO `article_sort` VALUES ('16', '观赏虾', '../../static/images/tieba.jpg', null, null);
INSERT INTO `article_sort` VALUES ('17', '鳌虾', '../../static/images/tieba.jpg', null, null);
INSERT INTO `article_sort` VALUES ('18', '龟缸', '../../static/images/tieba.jpg', null, null);
INSERT INTO `article_sort` VALUES ('19', '陆龟', '../../static/images/tieba.jpg', null, null);
INSERT INTO `article_sort` VALUES ('20', '蛋龟交易', '../../static/images/tieba.jpg', null, null);
INSERT INTO `article_sort` VALUES ('21', '黄蜡石', '../../static/images/tieba.jpg', null, null);
INSERT INTO `article_sort` VALUES ('22', '泰鳄', '../../static/images/tieba.jpg', null, null);
INSERT INTO `article_sort` VALUES ('23', '水晶虾', '../../static/images/tieba.jpg', null, null);
INSERT INTO `article_sort` VALUES ('24', '红警2', '../../static/images/tieba.jpg', null, null);
INSERT INTO `article_sort` VALUES ('25', '内涵', '../../static/images/tieba.jpg', null, null);
INSERT INTO `article_sort` VALUES ('26', '扒皮', '../../static/images/tieba.jpg', null, null);
INSERT INTO `article_sort` VALUES ('27', '鳄龟', '../../static/images/tieba.jpg', null, null);
INSERT INTO `article_sort` VALUES ('28', '黄喉', '../../static/images/tieba.jpg', null, null);
INSERT INTO `article_sort` VALUES ('29', '长颈龟', '../../static/images/tieba.jpg', null, null);
INSERT INTO `article_sort` VALUES ('30', 'web前端开发', '../../static/images/tieba.jpg', null, null);
INSERT INTO `article_sort` VALUES ('31', '孔雀鱼', '../../static/images/tieba.jpg', null, null);
INSERT INTO `article_sort` VALUES ('32', '李毅', '../../static/images/tieba.jpg', null, null);
INSERT INTO `article_sort` VALUES ('33', '电子烟', '../../static/images/tieba.jpg', null, null);
INSERT INTO `article_sort` VALUES ('34', '荒野行动', '../../static/images/tieba.jpg', null, null);
INSERT INTO `article_sort` VALUES ('35', '处对象', '../../static/images/tieba.jpg', null, null);
INSERT INTO `article_sort` VALUES ('36', 'smart', '../../static/images/tieba.jpg', null, null);
INSERT INTO `article_sort` VALUES ('37', '情侣头像', '../../static/images/tieba.jpg', null, null);
INSERT INTO `article_sort` VALUES ('38', '中央名族大学', '../../static/images/tieba.jpg', null, null);
INSERT INTO `article_sort` VALUES ('39', '组缸', '../../static/images/tieba.jpg', null, null);
INSERT INTO `article_sort` VALUES ('40', '系统缸', '../../static/images/tieba.jpg', null, null);
INSERT INTO `article_sort` VALUES ('41', '头像', '../../static/images/tieba.jpg', null, null);
INSERT INTO `article_sort` VALUES ('42', '拉布拉多', '../../static/images/tieba.jpg', null, null);
INSERT INTO `article_sort` VALUES ('43', '台球', '../../static/images/tieba.jpg', null, null);
INSERT INTO `article_sort` VALUES ('44', '长子营', '../../static/images/tieba.jpg', null, null);
INSERT INTO `article_sort` VALUES ('45', 'iphone壁纸', '../../static/images/tieba.jpg', null, null);

-- ----------------------------
-- Table structure for article_sort_user
-- ----------------------------
DROP TABLE IF EXISTS `article_sort_user`;
CREATE TABLE `article_sort_user` (
  `art_s_user_id` int(8) NOT NULL AUTO_INCREMENT,
  `user_id` int(8) DEFAULT NULL COMMENT '用户id',
  `article_sort_id` int(8) DEFAULT NULL COMMENT '贴吧分类id',
  `createtime` datetime DEFAULT NULL COMMENT '创建时间',
  PRIMARY KEY (`art_s_user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8 COMMENT='关注的吧';

-- ----------------------------
-- Records of article_sort_user
-- ----------------------------
INSERT INTO `article_sort_user` VALUES ('1', '19', '1', null);
INSERT INTO `article_sort_user` VALUES ('2', '19', '2', null);
INSERT INTO `article_sort_user` VALUES ('3', '19', '3', null);
INSERT INTO `article_sort_user` VALUES ('4', '19', '4', null);
INSERT INTO `article_sort_user` VALUES ('5', '19', '5', null);
INSERT INTO `article_sort_user` VALUES ('6', '19', '6', null);
INSERT INTO `article_sort_user` VALUES ('7', '19', '7', null);
INSERT INTO `article_sort_user` VALUES ('8', '19', '8', null);
INSERT INTO `article_sort_user` VALUES ('9', '19', '9', null);
INSERT INTO `article_sort_user` VALUES ('10', '19', '10', null);
INSERT INTO `article_sort_user` VALUES ('11', '19', '11', null);
INSERT INTO `article_sort_user` VALUES ('12', '19', '12', null);
INSERT INTO `article_sort_user` VALUES ('13', '19', '13', null);
INSERT INTO `article_sort_user` VALUES ('14', '19', '14', null);
INSERT INTO `article_sort_user` VALUES ('15', '19', '15', null);
INSERT INTO `article_sort_user` VALUES ('16', '19', '16', null);
INSERT INTO `article_sort_user` VALUES ('17', '19', '17', null);
INSERT INTO `article_sort_user` VALUES ('18', '19', '18', null);
INSERT INTO `article_sort_user` VALUES ('19', '19', '19', null);
INSERT INTO `article_sort_user` VALUES ('20', '19', '20', null);
INSERT INTO `article_sort_user` VALUES ('21', '19', '21', null);
INSERT INTO `article_sort_user` VALUES ('22', '19', '22', null);
INSERT INTO `article_sort_user` VALUES ('23', '19', '23', null);
INSERT INTO `article_sort_user` VALUES ('24', '19', '24', null);
INSERT INTO `article_sort_user` VALUES ('25', '19', '25', null);
INSERT INTO `article_sort_user` VALUES ('26', '19', '26', null);
INSERT INTO `article_sort_user` VALUES ('27', '19', '27', null);
INSERT INTO `article_sort_user` VALUES ('28', '19', '29', null);
INSERT INTO `article_sort_user` VALUES ('29', '19', '30', null);
INSERT INTO `article_sort_user` VALUES ('30', '19', '31', null);
INSERT INTO `article_sort_user` VALUES ('31', '19', '33', null);
INSERT INTO `article_sort_user` VALUES ('32', '19', '35', null);
INSERT INTO `article_sort_user` VALUES ('36', '21', '24', '2018-07-30 15:55:24');
INSERT INTO `article_sort_user` VALUES ('37', '21', '1', '2018-07-30 16:27:46');

-- ----------------------------
-- Table structure for browse_history
-- ----------------------------
DROP TABLE IF EXISTS `browse_history`;
CREATE TABLE `browse_history` (
  `b_id` int(8) NOT NULL AUTO_INCREMENT COMMENT '自增ID',
  `user_id` int(8) DEFAULT NULL COMMENT '用户ID',
  `article_id` int(8) DEFAULT NULL COMMENT '文章ID',
  `createtime` datetime DEFAULT NULL COMMENT '创建时间',
  PRIMARY KEY (`b_id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of browse_history
-- ----------------------------
INSERT INTO `browse_history` VALUES ('1', '19', '96', '2018-07-31 14:49:24');
INSERT INTO `browse_history` VALUES ('2', '19', '95', '2018-07-30 16:26:31');
INSERT INTO `browse_history` VALUES ('3', '21', '96', '2018-07-31 16:30:02');
INSERT INTO `browse_history` VALUES ('4', '19', '85', '2018-07-30 14:08:05');
INSERT INTO `browse_history` VALUES ('5', '19', '78', '2018-07-30 14:29:35');
INSERT INTO `browse_history` VALUES ('6', '19', '97', '2018-07-30 14:30:52');
INSERT INTO `browse_history` VALUES ('7', '19', '83', '2018-07-30 14:35:03');
INSERT INTO `browse_history` VALUES ('8', '19', '86', '2018-07-30 14:35:59');
INSERT INTO `browse_history` VALUES ('9', '21', '97', '2018-07-31 13:12:07');
INSERT INTO `browse_history` VALUES ('10', '21', '95', '2018-07-30 16:31:16');
INSERT INTO `browse_history` VALUES ('11', '21', '75', '2018-07-31 12:59:30');
INSERT INTO `browse_history` VALUES ('12', '21', '79', '2018-07-31 13:10:29');
INSERT INTO `browse_history` VALUES ('13', '29', '96', '2018-07-31 16:40:59');
INSERT INTO `browse_history` VALUES ('14', '30', '96', '2018-07-31 16:47:45');

-- ----------------------------
-- Table structure for friend
-- ----------------------------
DROP TABLE IF EXISTS `friend`;
CREATE TABLE `friend` (
  `f_id` int(8) NOT NULL AUTO_INCREMENT COMMENT '自增ID',
  `user_id` int(8) NOT NULL COMMENT '用户ID',
  `friend_id` int(8) NOT NULL COMMENT '好友ID',
  `createtime` datetime DEFAULT NULL,
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
  `createtime` datetime DEFAULT NULL,
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
-- Table structure for power_list
-- ----------------------------
DROP TABLE IF EXISTS `power_list`;
CREATE TABLE `power_list` (
  `p_id` int(8) NOT NULL AUTO_INCREMENT COMMENT '自增ID',
  `power_id` int(8) NOT NULL COMMENT '权限ID',
  `power_name` varchar(36) DEFAULT NULL COMMENT '权限描述',
  `createtime` datetime DEFAULT NULL,
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
  `createtime` datetime DEFAULT NULL,
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
  `article_id` int(8) NOT NULL COMMENT '文章id',
  `user_id` int(8) NOT NULL COMMENT '用户ID',
  `stay_user_id` int(8) NOT NULL COMMENT '评论者ID',
  `parent_id` int(8) DEFAULT NULL COMMENT '评论父id',
  `floor` int(8) NOT NULL COMMENT '楼层',
  `message_content` varchar(255) NOT NULL COMMENT '评论内容',
  `stay_user_ip` varchar(15) DEFAULT NULL COMMENT '评论用户的IP地址',
  `message_stay_time` datetime NOT NULL COMMENT '评论时间',
  PRIMARY KEY (`stay_id`)
) ENGINE=MyISAM AUTO_INCREMENT=13167 DEFAULT CHARSET=utf8 COMMENT='用户评论表';

-- ----------------------------
-- Records of stay_message
-- ----------------------------
INSERT INTO `stay_message` VALUES ('13147', '96', '19', '19', null, '4', '我就是大萨达过去问v安神定志小彩蛋抢我大萨达请问撒大声地大萨达请问查实的1我请稍等阿萨德去外地阿萨德群工人房v大哥任天野化粪池v三地方三地方三地方', '111.203.188.110', '2018-07-30 13:55:58');
INSERT INTO `stay_message` VALUES ('13148', '96', '19', '19', null, '5', '55555555555555555555555555', '111.203.188.110', '2018-07-30 13:56:54');
INSERT INTO `stay_message` VALUES ('13149', '96', '19', '19', null, '6', '6666666666666666', '111.203.188.110', '2018-07-30 13:56:58');
INSERT INTO `stay_message` VALUES ('13150', '96', '19', '19', null, '7', '7777777777777777777', '111.203.188.110', '2018-07-30 13:57:05');
INSERT INTO `stay_message` VALUES ('13151', '95', '19', '19', null, '4', '1', '111.203.188.110', '2018-07-30 16:16:26');
INSERT INTO `stay_message` VALUES ('13152', '95', '19', '21', null, '5', '3333333333333333', '111.203.188.110', '2018-07-30 16:31:46');
INSERT INTO `stay_message` VALUES ('13153', '96', '19', '21', null, '8', '', '111.203.188.110', '2018-07-31 14:52:42');
INSERT INTO `stay_message` VALUES ('13154', '96', '19', '21', null, '9', '发布信息', '111.203.188.110', '2018-07-31 14:58:15');
INSERT INTO `stay_message` VALUES ('13155', '96', '19', '21', null, '10', '我留言', '111.203.188.110', '2018-07-31 15:25:33');
INSERT INTO `stay_message` VALUES ('13156', '96', '19', '21', null, '11', '我给你浏览', '111.203.188.110', '2018-07-31 15:26:25');
INSERT INTO `stay_message` VALUES ('13133', '85', '21', '21', null, '1', '评论测试一下啊1', '111.203.188.110', '2018-07-20 17:58:23');
INSERT INTO `stay_message` VALUES ('13134', '85', '21', '21', null, '2', '评测测试一下啊2', '111.203.188.110', '2018-07-20 17:58:46');
INSERT INTO `stay_message` VALUES ('13135', '85', '21', '21', null, '3', '评测测试3', '111.203.188.110', '2018-07-20 17:58:57');
INSERT INTO `stay_message` VALUES ('13136', '85', '21', '21', null, '4', '评论实测4', '111.203.188.110', '2018-07-20 18:00:47');
INSERT INTO `stay_message` VALUES ('13137', '85', '21', '21', null, '5', '评论测试5', '111.203.188.110', '2018-07-20 18:00:57');
INSERT INTO `stay_message` VALUES ('13138', '85', '21', '21', null, '6', '评论测试6', '111.203.188.110', '2018-07-20 18:01:04');
INSERT INTO `stay_message` VALUES ('13139', '85', '21', '21', null, '7', '评论测试7', '111.203.188.110', '2018-07-20 18:01:12');
INSERT INTO `stay_message` VALUES ('13140', '85', '21', '21', '13133', '1', '评测试试', '111.123.213.213', '2018-07-20 18:03:14');
INSERT INTO `stay_message` VALUES ('13141', '95', '19', '28', null, '1', '我来站个楼', '111.203.188.110', '2018-07-26 14:55:15');
INSERT INTO `stay_message` VALUES ('13142', '95', '19', '28', null, '2', '我是二楼', '111.203.188.110', '2018-07-26 14:55:41');
INSERT INTO `stay_message` VALUES ('13143', '95', '19', '28', null, '3', '三楼三楼三楼', '111.203.188.110', '2018-07-26 14:59:03');
INSERT INTO `stay_message` VALUES ('13144', '96', '19', '19', null, '1', '111111111111111111111111', '111.203.188.110', '2018-07-30 13:54:37');
INSERT INTO `stay_message` VALUES ('13145', '96', '19', '19', null, '2', '222222222222222222222', '111.203.188.110', '2018-07-30 13:55:48');
INSERT INTO `stay_message` VALUES ('13146', '96', '19', '19', null, '3', '33333333333333333333333', '111.203.188.110', '2018-07-30 13:55:53');
INSERT INTO `stay_message` VALUES ('13157', '96', '19', '21', '13156', '11', '我来的撒气温气温前端阿萨德阿萨德前端阿萨德', '111.203.188.110', '2018-07-31 15:28:43');
INSERT INTO `stay_message` VALUES ('13158', '96', '19', '21', '13156', '11', '我热吃饭', '111.203.188.110', '2018-07-31 15:29:02');
INSERT INTO `stay_message` VALUES ('13159', '96', '19', '21', '13156', '11', '个问的', '111.203.188.110', '2018-07-31 15:29:40');
INSERT INTO `stay_message` VALUES ('13160', '96', '19', '21', '13156', '11', '问阿萨德说的打算阿萨德阿萨德阿萨德 阿萨德阿萨德阿萨德', '111.203.188.110', '2018-07-31 16:17:37');
INSERT INTO `stay_message` VALUES ('13161', '96', '19', '21', '13155', '10', '我的ad阿萨德前端阿萨德按时阿萨德阿萨德阿萨德阿萨德阿萨德', '111.203.188.110', '2018-07-31 16:19:39');
INSERT INTO `stay_message` VALUES ('13162', '96', '19', '29', '13155', '10', '我就是50', '111.203.188.110', '2018-07-31 16:30:49');
INSERT INTO `stay_message` VALUES ('13163', '96', '19', '29', '13147', '4', '位大萨达阿萨德去外地阿萨德阿达说的阿萨德阿萨德', '111.203.188.110', '2018-07-31 16:36:18');
INSERT INTO `stay_message` VALUES ('13164', '96', '29', '29', '13147', '4', '去外地阿萨德阿萨德阿萨德大萨达阿萨德阿萨德阿萨德阿萨德阿萨德', '111.203.188.110', '2018-07-31 16:36:29');
INSERT INTO `stay_message` VALUES ('13165', '96', '21', '30', '13155', '10', 'WD ASD QD ASD ASD QDASD R AS', '111.203.188.110', '2018-07-31 16:48:03');
INSERT INTO `stay_message` VALUES ('13166', '96', '19', '30', '13147', '4', '12312314123SDFASSD QDW ', '111.203.188.110', '2018-07-31 16:48:44');

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
  `user_sex` varchar(6) DEFAULT '0' COMMENT '用户性别 0:女 1:男',
  `user_qq` varchar(9) DEFAULT NULL COMMENT '用户QQ号码',
  `user_email` varchar(64) DEFAULT NULL COMMENT '用户EMAIL地址',
  `user_address` varchar(255) DEFAULT NULL COMMENT '用户地址',
  `user_mark` varchar(8) DEFAULT '0' COMMENT '用户积分',
  `user_rank_id` int(3) DEFAULT '0' COMMENT '用户等级',
  `user_last_login_ip` varchar(15) DEFAULT NULL COMMENT '用户上一次登录IP地址',
  `user_birthday` date DEFAULT NULL COMMENT '用户生日',
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
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8 COMMENT='user 用户表';

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('19', null, '朝歌', 'e10adc3949ba59abbe56e057f20f883e', '13260094140', '1', null, null, '', null, null, null, '2018-07-31', '我就是我,不一样的', '../../static/uploads/images/img-1532507819260.png', null, '2010-07-24 15:32:51', null, null, null, null, null, null, null, null);
INSERT INTO `user` VALUES ('20', null, '甲壳虫', 'e10adc3949ba59abbe56e057f20f883e', '13260094141', '0', null, null, null, null, null, null, null, null, '../../static/images/user.jpg', null, '2012-06-26 15:32:54', null, null, null, null, null, null, null, null);
INSERT INTO `user` VALUES ('21', null, '13260094142', 'e10adc3949ba59abbe56e057f20f883e', '13260094142', '0', null, null, null, null, null, null, null, null, '../../static/images/user.jpg', null, '2013-07-18 15:33:01', null, null, null, null, null, null, null, null);
INSERT INTO `user` VALUES ('22', null, '13260094143', 'e10adc3949ba59abbe56e057f20f883e', '13260094143', '0', null, null, null, null, null, null, null, null, '../../static/images/user.jpg', null, '2012-07-20 15:33:05', null, null, null, null, null, null, null, null);
INSERT INTO `user` VALUES ('23', null, '13260094144', 'e10adc3949ba59abbe56e057f20f883e', '13260094144', '0', null, null, null, null, null, null, null, null, '../../static/images/user.jpg', null, '2013-07-24 15:33:09', null, null, null, null, null, null, null, null);
INSERT INTO `user` VALUES ('24', null, '13260094145', 'e10adc3949ba59abbe56e057f20f883e', '13260094145', '0', null, null, null, null, null, null, null, null, '../../static/images/user.jpg', null, '2011-06-24 15:33:13', null, null, null, null, null, null, null, null);
INSERT INTO `user` VALUES ('25', null, '13260094146', 'e10adc3949ba59abbe56e057f20f883e', '13260094146', '0', null, null, null, null, null, null, null, null, '../../static/images/user.jpg', null, '2012-07-06 15:33:17', null, null, null, null, null, null, null, null);
INSERT INTO `user` VALUES ('26', null, '13260094147', 'e10adc3949ba59abbe56e057f20f883e', '13260094147', '0', null, null, null, null, null, null, null, null, '../../static/images/user.jpg', null, '2013-07-11 15:33:24', null, null, null, null, null, null, null, null);
INSERT INTO `user` VALUES ('27', null, '13260094148', 'e10adc3949ba59abbe56e057f20f883e', '13260094148', '0', null, null, null, null, null, null, null, null, '../../static/images/user.jpg', null, '2018-07-28 15:33:29', null, null, null, null, null, null, null, null);
INSERT INTO `user` VALUES ('28', null, '朝歌朝', 'e10adc3949ba59abbe56e057f20f883e', '13260094149', '0', null, null, 'null', null, null, null, '2018-07-26', '朝歌个性签名', '../../static/uploads/images/img-1532601437572.jpg', null, '2018-07-28 15:33:29', null, null, null, null, null, null, null, null);
INSERT INTO `user` VALUES ('29', null, '13260094150', 'e10adc3949ba59abbe56e057f20f883e', '13260094150', '0', null, null, null, null, null, null, null, null, '../../static/images/user.jpg', null, '2018-07-28 15:33:29', null, null, null, null, null, null, null, null);
INSERT INTO `user` VALUES ('30', null, '13260094151', 'e10adc3949ba59abbe56e057f20f883e', '13260094151', '0', null, null, null, null, null, null, null, null, '../../static/images/user.jpg', null, '2018-07-28 15:33:29', null, null, null, null, null, null, null, null);
INSERT INTO `user` VALUES ('31', null, '13260094152', 'e10adc3949ba59abbe56e057f20f883e', '13260094152', '0', null, null, null, null, null, null, null, null, '../../static/images/user.jpg', null, '2018-07-28 15:33:29', null, null, null, null, null, null, null, null);
INSERT INTO `user` VALUES ('32', null, '13260094153', 'e10adc3949ba59abbe56e057f20f883e', '13260094153', '0', null, null, null, null, null, null, null, null, '../../static/images/user.jpg', null, '2018-07-28 15:33:29', null, null, null, null, null, null, null, null);
INSERT INTO `user` VALUES ('33', null, '13260094154', 'e10adc3949ba59abbe56e057f20f883e', '13260094154', '0', null, null, null, null, null, null, null, null, '../../static/images/user.jpg', null, '2018-07-28 15:33:29', null, null, null, null, null, null, null, null);
INSERT INTO `user` VALUES ('34', null, '13260094155', 'e10adc3949ba59abbe56e057f20f883e', '13260094155', '0', null, null, null, null, null, null, null, null, '../../static/images/user.jpg', null, '2018-07-28 15:33:29', null, null, null, null, null, null, null, null);
INSERT INTO `user` VALUES ('35', null, '13260094156', 'e10adc3949ba59abbe56e057f20f883e', '13260094156', '0', null, null, null, null, null, null, null, null, '../../static/images/user.jpg', null, '2018-07-28 15:33:29', null, null, null, null, null, null, null, null);
INSERT INTO `user` VALUES ('36', null, '13260094157', 'e10adc3949ba59abbe56e057f20f883e', '13260094157', '0', null, null, null, null, null, null, null, null, '../../static/images/user.jpg', null, '2018-07-28 15:33:29', null, null, null, null, null, null, null, null);
INSERT INTO `user` VALUES ('37', null, '13260094158', 'e10adc3949ba59abbe56e057f20f883e', '13260094158', '0', null, null, null, null, null, null, null, null, '../../static/images/user.jpg', null, '2018-07-28 15:33:29', null, null, null, null, null, null, null, null);
INSERT INTO `user` VALUES ('38', null, '13260094159', 'e10adc3949ba59abbe56e057f20f883e', '13260094159', '0', null, null, null, null, null, null, null, null, '../../static/images/user.jpg', null, '2018-07-28 15:33:29', null, null, null, null, null, null, null, null);
INSERT INTO `user` VALUES ('39', null, '13260094160', 'e10adc3949ba59abbe56e057f20f883e', '13260094160', '0', null, null, null, null, null, null, null, null, '../../static/images/user.jpg', null, '2018-07-28 15:33:29', null, null, null, null, null, null, null, null);
INSERT INTO `user` VALUES ('40', null, '13260094161', 'e10adc3949ba59abbe56e057f20f883e', '13260094161', '0', null, null, null, null, null, null, null, null, '../../static/images/user.jpg', null, '2018-07-28 15:33:29', null, null, null, null, null, null, null, null);
INSERT INTO `user` VALUES ('41', null, '13260094162', 'e10adc3949ba59abbe56e057f20f883e', '13260094162', '0', null, null, null, null, null, null, null, null, '../../static/images/user.jpg', null, '2018-07-28 15:33:29', null, null, null, null, null, null, null, null);
INSERT INTO `user` VALUES ('42', null, '13260094163', 'e10adc3949ba59abbe56e057f20f883e', '13260094163', '0', null, null, null, null, null, null, null, null, '../../static/images/user.jpg', null, '2018-07-28 15:33:29', null, null, null, null, null, null, null, null);
INSERT INTO `user` VALUES ('43', null, '13260094164', 'e10adc3949ba59abbe56e057f20f883e', '13260094164', '0', null, null, null, null, null, null, null, null, '../../static/images/user.jpg', null, '2018-07-28 15:33:29', null, null, null, null, null, null, null, null);
INSERT INTO `user` VALUES ('44', null, '13260094165', 'e10adc3949ba59abbe56e057f20f883e', '13260094165', '0', null, null, null, null, null, null, null, null, '../../static/images/user.jpg', null, '2018-07-28 15:33:29', null, null, null, null, null, null, null, null);
INSERT INTO `user` VALUES ('45', null, '13260094166', 'e10adc3949ba59abbe56e057f20f883e', '13260094166', '0', null, null, null, null, null, null, null, null, '../../static/images/user.jpg', null, '2018-07-28 15:33:29', null, null, null, null, null, null, null, null);
INSERT INTO `user` VALUES ('46', null, '13260094167', 'e10adc3949ba59abbe56e057f20f883e', '13260094167', '0', null, null, null, null, null, null, null, null, '../../static/images/user.jpg', null, '2018-07-28 15:33:29', null, null, null, null, null, null, null, null);

-- ----------------------------
-- Table structure for user_attention
-- ----------------------------
DROP TABLE IF EXISTS `user_attention`;
CREATE TABLE `user_attention` (
  `a_id` int(8) NOT NULL AUTO_INCREMENT COMMENT '自增ID',
  `user_id` int(8) NOT NULL COMMENT '用户ID',
  `attention_id` int(8) NOT NULL COMMENT '关注ID',
  `createtime` datetime DEFAULT NULL COMMENT '创建时间',
  PRIMARY KEY (`a_id`)
) ENGINE=InnoDB AUTO_INCREMENT=73 DEFAULT CHARSET=utf8 COMMENT='用户关注表';

-- ----------------------------
-- Records of user_attention
-- ----------------------------
INSERT INTO `user_attention` VALUES ('7', '20', '21', null);
INSERT INTO `user_attention` VALUES ('8', '20', '22', null);
INSERT INTO `user_attention` VALUES ('9', '20', '30', null);
INSERT INTO `user_attention` VALUES ('10', '20', '31', null);
INSERT INTO `user_attention` VALUES ('14', '23', '22', null);
INSERT INTO `user_attention` VALUES ('15', '24', '22', null);
INSERT INTO `user_attention` VALUES ('17', '22', '20', null);
INSERT INTO `user_attention` VALUES ('18', '22', '21', null);
INSERT INTO `user_attention` VALUES ('22', '21', '25', null);
INSERT INTO `user_attention` VALUES ('23', '21', '24', '2018-07-23 12:17:32');
INSERT INTO `user_attention` VALUES ('25', '21', '23', '2018-07-23 12:18:22');
INSERT INTO `user_attention` VALUES ('27', '19', '26', null);
INSERT INTO `user_attention` VALUES ('28', '19', '27', null);
INSERT INTO `user_attention` VALUES ('29', '19', '28', null);
INSERT INTO `user_attention` VALUES ('31', '19', '30', null);
INSERT INTO `user_attention` VALUES ('32', '19', '31', null);
INSERT INTO `user_attention` VALUES ('33', '19', '32', null);
INSERT INTO `user_attention` VALUES ('34', '19', '33', null);
INSERT INTO `user_attention` VALUES ('36', '19', '35', null);
INSERT INTO `user_attention` VALUES ('37', '19', '36', null);
INSERT INTO `user_attention` VALUES ('38', '19', '37', null);
INSERT INTO `user_attention` VALUES ('39', '19', '38', null);
INSERT INTO `user_attention` VALUES ('40', '19', '39', null);
INSERT INTO `user_attention` VALUES ('41', '19', '40', null);
INSERT INTO `user_attention` VALUES ('42', '19', '41', null);
INSERT INTO `user_attention` VALUES ('43', '19', '42', null);
INSERT INTO `user_attention` VALUES ('44', '19', '43', null);
INSERT INTO `user_attention` VALUES ('45', '19', '44', null);
INSERT INTO `user_attention` VALUES ('58', '19', '24', '2018-07-24 10:26:07');
INSERT INTO `user_attention` VALUES ('66', '19', '41', '2018-07-27 16:39:41');
INSERT INTO `user_attention` VALUES ('67', '19', '29', '2018-07-30 14:22:53');
INSERT INTO `user_attention` VALUES ('68', '19', '21', '2018-07-30 14:34:23');
INSERT INTO `user_attention` VALUES ('69', '21', '29', '2018-07-30 16:10:36');
INSERT INTO `user_attention` VALUES ('71', '21', '19', '2018-07-30 16:30:25');
INSERT INTO `user_attention` VALUES ('72', '30', '19', '2018-07-31 16:47:49');

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
