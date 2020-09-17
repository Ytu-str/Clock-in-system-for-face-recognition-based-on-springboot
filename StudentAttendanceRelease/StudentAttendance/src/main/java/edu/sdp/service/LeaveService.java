package edu.sdp.service;

import edu.sdp.vo.*;

import java.util.List;

public interface LeaveService {
    /**
     * 请假
     * @param
     * @return
     */
    boolean leaveService(Leave leave);

    /**
     * 查询学生完善的信息
     * @param id
     * @return
     */
    Information searchStudent(String id);

    /**
     * 写入收件箱内容
     * @param inbox
     * @return
     */
    int writeToInboxService(Inbox inbox);

    /**
     * 学生请假信息
     * @param id
     * @return
     */
    List<LeaveInformation> studentLeaveInformationService(String id,int num,int state);

    /**
     * 学生请假信息数量
     * @param id
     * @return
     */
    int studentLeaveInformationNumService(String id,int state);

    /**
     * 修改请假信息状态
     * @param id
     * @param content
     * @param state
     */
    boolean modifyLeaveStatusService(String id, String content, String state,String userId);
}
