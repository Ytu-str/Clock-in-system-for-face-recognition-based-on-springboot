package edu.sdp.dao;
import edu.sdp.vo.LeaveInformation;
import edu.sdp.vo.TeacherClass;
import edu.sdp.vo.admin.*;
import org.apache.ibatis.annotations.Mapper;

import java.sql.Timestamp;
import java.util.List;

@Mapper
public interface AdminDao {
    /**
     * 查询所有系别
     * @return
     */
    List<Department> selectSystemMapper();

    /**
     * 查询班级
     * @param userUid
     * @return
     */
    List<Dclass> selectClassMapper(String userUid);

    /**
     * 查询用户信息
     * @param userName  用户姓名
     * @param userType 权限
     * @param userSystem 所属系别
     * @param userClass 所属班级
     * @param num
     * @param classNum
     * @return
     */
    List<AdminUser> selectUserInformationMapper(String userName, String userType, String userSystem, String userClass, int num, int classNum);

    /**
     * 查询总条数
     * @param userName
     * @param userType
     * @param userSystem
     * @param userClass
     * @return
     */
    int selectNumMapper(String userName, String userType, String userSystem, String userClass);

    /**
     * 创建用户
     @param userNumber 用户账号
      * @param userPass 用户密码
     * @param userJion 用户权限
     * @param userStunum 用户学号
     * @param userSystem 所属系别唯一标识
     * @param userClass 所属班级唯一标识
     * @param userQues 密保问题
     * @param userAnswer 密保答案
     * @param userId 用户唯一标识
     * @return
     */
    boolean createUserMapper(String userNumber, String userPass, String userJion, String userStunum, String userSystem, String userClass, String userQues, String userAnswer, String userId,String userPortrait);

    /**
     * 删除用户
     * @param x
     * @return
     */
    void delectUserMapper(String x);

    /**
     * 修改用户信息
     * @param adminUser
     * @return
     */
    boolean updateUserMapper(AdminUser adminUser);

    /**
     * 查询课程信息
     * @param className
     * @param teacherName
     * @param num
     * @param classNum
     * @return
     */
    List<TeacherClass> searchTeacherClassMapper(String className, String teacherName, int num, int classNum);

    /**
     * 查询课程信息条数
     * @param className
     * @param teacherName
     * @return
     */
    int selectTeacherClassNumMapper(String className, String teacherName);

    /**
     * 查询所有教师姓名 id
     * @return
     */
    List<Teacher> selectTeacherMapper();

    /**
     * 删除课程
     * @param clsId
     * @return
     */
    void adminDeleteCurriculumMapper(String clsId);

    /**
     * 创建课程
     * @param clsName
     * @param cls
     * @param clsAscription
     * @param clsId
     * @param timeStamp
     * @param clsPhoto
     * @return
     */
    boolean adminInsertCurriculumMapper(String clsName, String cls, String clsAscription, String clsId, Timestamp timeStamp, String clsPhoto);

    /**
     * 修改课程信息
     * @param clsName 课程名称
     * @param cls 课程说明
     * @param clsAscription  所属老师id
     * @param clsId 唯一标识
     * @return
     */
    boolean adminUpdateCurriculumMapper(String clsName, String cls, String clsAscription, String clsId);

    /**
     * 将信息存入加入的班级表
     * @param clsAscription
     * @param clsName
     */
    void adminInsertMyclass(String clsAscription, String clsName);

    /**
     * 将课程信息从创建的课程表中删除
     * @param toString
     */
    void adminDeleteMyclassMapper(String toString);

    /**
     * 请假信息
     * @param clsSystem 系别
     * @param className 班级
     * @param userName 姓名
     * @param num
     * @param classNum
     * @return
     */
    List<LeaveInformation> adminLeaveInformationMapper(String clsSystem, String className, String userName, int num, int classNum);

    /**
     * 请假信息条数
     * @param clsSystem
     * @param className
     * @param userName
     * @return
     */
    int adminLeaveInformationNumMapper(String clsSystem, String className, String userName);

    /**
     * 删除请假信息
     * @param x 请假信息唯一标识
     */
    void adminDeleteLeaveInformationMapper(String x);

    /**
     * 修改请假信息
     * @param state
     * @param content
     * @return
     */
    int adminUpdateLeaveInformationMapper(String state, String content,String leaveId);

    /**
     * 查询对应教师姓名
     * @param leaveTeacher
     * @return
     */
    String selectLeaveTeacherName(String leaveTeacher);

    /**
     * 查询系别和班级信息
     * @param num
     * @param classNum
     * @param system
     * @param dclass
     * @return
     */
    List<Department> adminSelectSystemAndClassMapper(int num, int classNum, String system, String dclass);

    /**
     * 查询系别和班级信息数量
     * @param system
     * @param dclass
     * @return
     */
    Integer adminSelectSystemAndClassNumMapper(String system, String dclass);

    /**
     * 修改班级所属的系别
     * @param system
     * @param dclass
     * @return
     */
    boolean adminUpdateBeLongToSystemMapper(String system, String dclass);

    /**
     * 添加系别
     * @param systemName 系别名称
     * @param systemId 唯一标识
     * @return
     */
    boolean adminInsertSystemMapper(String systemName, String systemId);

    /**
     * 添加班级
     * @param className 课程名称
     * @param classId 课程唯一标识
     * @param systemId 系别唯一标识
     * @return
     */
    boolean adminInsertClassMapper(String className, String classId, String systemId);

    /**
     * 删除系别
     * @param x
     */
    void deleteSystemMapper(String x);

    /**
     * 删除系别下的班级
     * @param
     */
    void deleteSystemOnClassMapper(String x);

    /**
     * 删除班级
     * @param
     */
    void delectClassMapper(String x);


    /**
     * 用户数量
     * @return
     */
    int selectUserNum();

    /**
     * 课程数量
     * @return
     */
    int selectCurrNum();

    /**
     * 签到任务数量
     * @return
     */
    int selectSignNum();

    /**
     * 查询系别数量
     * @return
     */
    int selectDepartNum();

    /**
     * 发布公告
     * @param content
     * @param noticeId
     * @param timeStamp
     * @return
     */
    boolean adminInsertNoticeMapper(String content, String noticeId, Timestamp timeStamp);

    /**
     * 查询公告
     * @param content
     * @return
     */
    List<Notice> adminSelectNoticeMapper(String content,int num, int classNum);

    /**
     * 学生和教师的公告
     * @return
     */
    List<Notice> teacherAndStudentNoticeMapper();

    /**
     * 查询公告条数
     * @param content
     * @return
     */
    int selectNoticeNum(String content);

    /**
     * 删除公告
     * @param x
     */
    void adminDeleteNoticeMapper(String x);

    /**
     * 修改公告
     * @param content
     * @return
     */
    boolean adminUpdateMapper(String content,String noticeId);

}
