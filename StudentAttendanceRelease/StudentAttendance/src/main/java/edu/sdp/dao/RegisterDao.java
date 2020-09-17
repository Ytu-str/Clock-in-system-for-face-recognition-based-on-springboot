package edu.sdp.dao;

import edu.sdp.vo.Information;
import edu.sdp.vo.teacherHead;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Component;

import java.util.List;

@Mapper
public interface RegisterDao {
    /**
     * 查看是否有该账号
     * @param number 账号
     * @return 1：是 0：否
     */
    Integer registerNumber(String number);

    /**
     * 注册账号
     * @param number 账号
     * @param password 密码
     * @param question 密保问题
     * @param answer 密保答案
     * @param iName 昵称
     * @param portrait 头像网址
     * @param id 唯一标识
     */
    void registerPass(String number, String password, String question, String answer, String iName, String portrait, String id);

    /**
     * 判断此唯一标识是否与数据库重复
     * @param id 唯一标识
     * @return 1：是 0：否
     */
    Integer repetitionUuid(String id);

    /**
     * 实名认证
     * @param name 姓名
     * @param identity 身份证号
     * @return
     */
    int realNameMapper(String name, String identity,String id);

    /**
     * 修改个人信息
     * @param user_iname 昵称
     * @param user_stunum 学号
     * @param user_system 系别
     * @param user_class 班级
     * @return
     */
    int modifyInformationMapper(String user_iname, String user_stunum, String user_system, String user_class,String id);

    /**
     * 查找个人信息
     * @param id
     * @return
     */
    Information selectInformationMapper(String id);

    /**
     * 教师姓名头像
     * @param id
     * @return
     */
    List<teacherHead> teacherInformationHeadMapper(String id);

    /**
     * 累计发布签到次数
     * @param id
     * @return
     */
    int studentNum(String id);

    /**
     * 未读邮件数量
     * @param id
     * @return
     */
    int inboxNum(String id);

    /**
     * 待审批的请假
     * @param id
     * @return
     */
    int leaveNum(String id);

    /**
     * 课程总数
     * @param id
     * @return
     */
    int classNum(String id);

    /**
     * 更改头像
     * @param uploadFileUrl
     * @param id
     * @return
     */
    int ModifyTheAvatarMapper(String uploadFileUrl, String id);

    /**
     * 查询头像地址
     * @param id
     * @return
     */
    String findImageUrl(String id);
    /**
     * 判断实名认证成功
     */
    String RealNameAuthenticationSuccessfulMapper(String id);
}
