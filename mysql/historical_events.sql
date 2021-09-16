/*
 Navicat Premium Data Transfer

 Source Server         : mySQL
 Source Server Type    : MySQL
 Source Server Version : 80026
 Source Host           : localhost:3306
 Source Schema         : historical_events

 Target Server Type    : MySQL
 Target Server Version : 80026
 File Encoding         : 65001

 Date: 16/09/2021 17:51:10
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for events
-- ----------------------------
DROP TABLE IF EXISTS `events`;
CREATE TABLE `events`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `periodID` int NOT NULL,
  `title` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `year` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `imgSrc` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `content` longtext CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `period`(`periodID`) USING BTREE,
  CONSTRAINT `period` FOREIGN KEY (`periodID`) REFERENCES `period` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of events
-- ----------------------------
INSERT INTO `events` VALUES (1, 6, '九一八事变', '1931', 'http://localhost:3005/static/images/0918.jpg', '<p>\n九一八事变（又称奉天事变、柳条湖事件），是日本在中国东北蓄意制造并发动的一场侵华战争，是日本帝国主义侵华的开端。1931年9月18日夜，在日本关东军安排下，铁道“守备队”炸毁沈阳柳条湖附近日本修筑的南满铁路路轨，并栽赃嫁祸于中国军队。日军以此为借口，炮轰沈阳北大营，是为“九一八事变”。次日，日军侵占沈阳，又陆续侵占了东北三省。1932年2月，东北全境沦陷。此后，日本在中国东北建立了伪满洲国傀儡政权，开始了对东北人民长达14年之久的奴役和殖民统治。</p>\n<p>\n“九一八事变”是日本帝国主义长期以来推行对华侵略扩张政策的必然结果，也是企图把中国变成其独占的殖民地而采取的重要步骤。它同时标志着世界反法西斯战争的开始，揭开了第二次世界大战东方战场的序幕。</p>');
INSERT INTO `events` VALUES (2, 6, '西安事变', '1936', 'http://localhost:3005/static/images/1212.jpg', '<p>\n（又称“双十二事变”），是1936年12月12日张学良和杨虎城为了达到劝谏蒋介石改变“攘外必先安内”的既定国策，停止内战，一致抗日的目的，在西安发动“兵谏”的历史事件。</p>\n<p>\n1936年12月25日，在中共中央和周恩来主导下，以蒋介石接受“停止内战，联共抗日”的主张而和平解决。西安事变的和平解决为抗日民族统一战线的建立提供了必要的前提，成为由国内战争走向抗日民族战争的转折点。\n</p>');
INSERT INTO `events` VALUES (3, 6, '“七七”卢沟桥事变', '1937', 'http://localhost:3005/static/images/0707.jpg', '<p>1937年7月7日夜，日军在北平西南卢沟桥附近演习时，借口一名士兵“失踪”，要求进入宛平县城搜查，遭到中国守军第29军严辞拒绝。日军遂向中国守军开枪射击，又炮轰宛平城。第29军奋起抗战。这就是震惊中外的七七事变，又称卢沟桥事变。七七事变是日本帝国主义全面侵华战争的开始，也是中华民族进行全面抗战的起点。</p>');
INSERT INTO `events` VALUES (4, 6, '淞沪会战 ', '1937', 'http://localhost:3005/static/images/0813.jpg', '<p>(又称八一三战役，日本称为第二次上海事变)，是中日双方在抗日战争中的第一场大型会战，也是整个中日战争中进行的规模最大、战斗最惨烈的一场战役。\n淞沪会战开始于1937年8月13日，是卢沟桥事变后，蒋介石为了把日军由北向南的入侵方向引导改变为由东向西，以利于长期作战，而在上海采取主动反击的战役。\n淞沪会战中日军因遭到国民党的顽强抵抗而损失惨重，这场战役对于中国而言，标志两国之间不宣而战、全面战争的真正开始，卢沟桥事变后的地区性冲突升级为全面战争，并彻底粉碎了日本“三个月灭亡中国”计划。</p>');
INSERT INTO `events` VALUES (5, 6, '太原会战', '1937', 'http://localhost:3005/static/images/ty10.jpeg', '<p>包括有：天镇战役、平型关战役、忻口战役、娘子关战役、太原保卫战。1937年(民国二十六年)10月至11月，在抗日战争中，中国第2战区部队同日军华北方面军在山西省北部、东部和中部地区进行的大规模的战略性防御战役。</p><p>太原会战历时2个月，是抗战初期华北战场上规模最大、战斗最激烈、持续时间最长、战绩最显著的一次会战。日军参战总兵力约合4个半师团共14万人，伤亡近3万人。中国军队参战总兵力6个集团军计52个师(旅)共28万余人，伤亡10万人以上。八路军在会战中有力地配合友军作战，平型关伏击战打破了\"日军不可战胜\"的神话。忻口会战大量消耗日军有生力量，牵制了日军沿平汉铁路(北平-汉口)南下的作战行动。惟娘子关方面防范疏漏，被日军乘虚而入山西省会太原，虽然最后会战以失利告终，但太原会战是八年抗战中，华北规模最大的一次对日会战。太原会战中光忻口战役就伤亡日军约两万人，创造了华北歼灭日军人数的最高纪录，从此国民革命军在华北的正规战争宣告结束。</p>');
INSERT INTO `events` VALUES (6, 6, '徐州会战', '1938', 'http://localhost:3005/static/images/0813.jpg', '<p>是抗日战争时期中日双方在以江苏省徐州为中心的津浦(天津至浦口)、陇海(宝鸡至连云港)铁路地区进行的一次大规模防御战役，其中以1938年三四月间的台儿庄大战最为著名，因围歼日军一万余人，史称之为台儿庄大捷。徐州会战对日军给予了巨大的打击，大大迟滞了日军进攻的脚步，为中方部署武汉会战赢得了时间。</p>');
INSERT INTO `events` VALUES (7, 6, '武汉会战', '1938', NULL, '<p>是抗日战争时期中国军队在武汉地区同日本侵略军展开的一场会战。1938年6月至10月，中国第5、第9战区部队在武汉外围沿长江南北两岸展开，战场遍及安徽、河南、江西、湖北4省广大地区，是抗日战争战略防御阶段规模最大、时间最长、歼敌最多的一次战役。</p>');
INSERT INTO `events` VALUES (8, 6, '百团大战', '1941', NULL, '<p>是中国抗日战争中由中国共产党所率领的国民革命军第十八集团军(以下皆以八路军称呼)在1940年8月至1941年1月间发动的以破坏华北日军占领的交通线、矿山为目的的破袭作战(又称晋南游击战)。</p>');
INSERT INTO `events` VALUES (9, 6, '抗战胜利，日本投降', '1945', NULL, '<p>1945年8月15日正午，日本裕仁天皇通过广播发表《终战诏书》，宣布无条件投降。8月16日，苏军总参谋部发表声明指出：“日本天皇8月15日所发表的投降声明，仅仅是无条件投降的一般宣言，并未向武装部队发布停止敌对行动的命令，而且日本军阀仍在继续抵抗，因此，日本尚未实际投降……远东苏军将继续对日攻势作战。”此段时间，由于日军的敢死队出动，导致苏联伤亡颇为惨重。战事直到8月23日苏军占领旅顺港口才真正结束。</p><p>1945年9月2日，参加对日作战的同盟国代表接受日本投降签字仪式在停泊于日本东京湾的美军军舰“密苏里”号上举行。日本代表在无条件投降书上签字，中、美、英、苏等9国代表相继签字。至此，中国抗日战争胜利结束，世界反法西斯战争也落下帷幕。</p>');

-- ----------------------------
-- Table structure for period
-- ----------------------------
DROP TABLE IF EXISTS `period`;
CREATE TABLE `period`  (
  `id` int NOT NULL,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `startYear` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `endYear` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of period
-- ----------------------------
INSERT INTO `period` VALUES (1, '十九世纪三十到六十年代', '1839', '1860');
INSERT INTO `period` VALUES (2, '洋务运动', '1861', '1895');
INSERT INTO `period` VALUES (3, '旧民主主义革命时期3', '1894', '1915');
INSERT INTO `period` VALUES (4, '新文化运动', '1915', '1923');
INSERT INTO `period` VALUES (5, '新民主主义革命时期1', '1919', '1931');
INSERT INTO `period` VALUES (6, '抗日战争', '1931', '1945');
INSERT INTO `period` VALUES (7, '解放战争', '1946', '1949');

SET FOREIGN_KEY_CHECKS = 1;
