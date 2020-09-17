package edu.sdp.dao;

import edu.sdp.vo.*;
import org.apache.ibatis.annotations.Mapper;

import java.sql.Timestamp;
import java.util.List;

@Mapper
public interface LeaveDao {

    /**
     * 请假
     * @param
     * @return
     */
    int leaveMapper(Leave leave);

    /**
     * 查询学生完善的信息
     * @param id
     * @return
     */
    Information searchStudentMapper(String id);

    /**
     * 写入收件箱信息
     * @param inbox
     * @return
     */
    int writeToInboxServiceMapper(Inbox inbox);

    /**
     * 学生请假信息
     * @param id
     * @return
     */
    List<LeaveInformation> studentLeaveInformationMapper(String id,int num,int classNum,int state);

    /**
     * 学生请假信息数量
     * @param id
     * @return
     */
    int studentLeaveInformationNumMapper(String id,int state);

    /**
     * 查询要更新的请假信息
     * @param id
     * @return
     */
    Leave selectLeaveInforation(String id);

    /**
     * 查询老师姓名
     * @param leaveTeacher
     * @return
     */
    String selecetTeacehrName(String leaveTeacher);

    /**
     * 更改请假表状态
     * @param
     * @param state
     * @return
     */
    int ChangeLeaveStatusMapper(String id, String state,String content);

    /**
     * 写入信箱
     * @param leaveTeacher
     * @param userId
     * @param timestamp
     * @param s
     * @param s1
     * @param
     * @return
     */
    int inbox(String leaveTeacher, String userId, Timestamp timestamp, String s, String s1, String id,String q);
}
