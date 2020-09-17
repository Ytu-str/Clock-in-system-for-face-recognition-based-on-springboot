package edu.sdp.service;

import edu.sdp.vo.admin.*;

import javax.mail.MessagingException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public interface AdminService {
    /**
     * 查询所有的系别
     * @return
     */
    List<Department> selectSystemService();

    /**
     * 查询班级
     * @param userUid
     * @return
     */
    List<Dclass> selectClassService(String userUid);

    /**
     * 查询用户信息
     * @param userName
     * @param userType
     * @param userSystem
     * @param userClass
     * @param num
     * @return
     */
    Map selectUserInformationService(String userName, String userType, String userSystem, String userClass, int num);

    /**
     * 创建用户
     * @param userNumber
     * @param userPass
     * @param userJion
     * @param userStunum
     * @param userSystem
     * @param userClass
     * @param userQues
     * @param userAnswer
     * @return
     */
    boolean createUserService(String userNumber, String userPass, String userJion, String userStunum, String userSystem, String userClass, String userQues, String userAnswer);

    /**
     * 删除用户
     * @param list
     * @return
     */
    void delectUserService(List<String> list);

    /**
     * 修改用户信息
     * @param adminUser
     * @return
     */
    boolean updateUserService(AdminUser adminUser);

    /**
     * 查询课程信息
     * @param className
     * @param teacherName
     * @param num
     * @return
     */
    Map searchTeacherClassService(String className, String teacherName, int num);

    /**
     * 查询所有教师姓名 id
     * @return
     */
    List<Teacher> selectTeacherService();

    /**
     * 创建课程
     * @param clsName
     * @param cls
     * @param clsAscription
     * @return
     */
    boolean adminInsertCurriculum(String clsName, String cls, String clsAscription);

    /**
     * 删除课程
     * @param
     * @return
     */
    void adminDeleteCurriculumService(ArrayList clsIdList);

    /**
     * 修改课程信息
     * @param clsName
     * @param cls
     * @param clsAscription
     * @param clsId
     * @return
     */
    boolean adminUpdateCurriculumService(String clsName, String cls, String clsAscription, String clsId);

    /**
     * 请假信息
     * @param clsSystem
     * @param className
     * @param userName
     * @param num
     * @return
     */
    Map adminLeaveInformationService(String clsSystem, String className, String userName, int num);

    /**
     * 删除请假信息
     * @param leaveList
     */
    void adminDeleteLeaveInformationService(ArrayList<String> leaveList);

    /**
     * 修改请假信息
     * @param state
     * @param content
     * @return
     */
    boolean adminUpdateLeaveInformationService(String state, String content,String leaveId,String userId,String leaveTeacher,String leaveType);

    /**
     * 查询系别和班级信息
     * @param num
     * @param system
     * @param dclass
     * @return
     */
    Map adminSelectSystemAndClass(int num, String system, String dclass);

    /**
     * 修改班级所属的系别
     * @param system
     * @param dclass
     * @return
     */
    boolean adminUpdateBeLongToSystemService(String system, String dclass);

    /**
     * 添加系别
     * @param systemName
     * @return
     */
    boolean adminInsertSystemService(String systemName);

    /**
     * 添加班级
     * @param className
     * @param systemId
     * @return
     */
    boolean adminInsertClassService(String className, String systemId);

    /**
     * 删除班级或者系
     * @param systemList
     * @param classList
     */
    void adminDeleteSystemPerhapsClassService(ArrayList systemList, ArrayList classList);

    /**
     * 查询首页4个数量
     * @return
     */
    List<Integer> adminIndexIntInformationService();

    /**
     * 发送邮件
     * @param content
     * @return
     */
    boolean adminSendMailService(String content) throws MessagingException;

    /**
     * 发布公告
     * @param content
     * @return
     */
    boolean adminInsertNoticeService(String content);

    /**
     * 查询公告
     * @param content
     * @return
     */
    Map adminSelectNoticeService(String content,int num);

    /**
     * 学生和教师的公告
     * @return
     */
    List<Notice> teacherAndStudentNoticeService();

    /**
     * 删除公告
     * @param list
     */
    void adminDeleteNoticeService(ArrayList list);

    /**
     * 修改公告
     * @param content
     * @return
     */
    boolean adminUpdateService(String content,String noticeId);
}
