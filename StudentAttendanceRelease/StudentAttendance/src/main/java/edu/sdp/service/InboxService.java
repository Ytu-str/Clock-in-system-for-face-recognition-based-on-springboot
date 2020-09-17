package edu.sdp.service;

import edu.sdp.vo.InboxContent;
import edu.sdp.vo.StudentInbox;

import java.util.List;

public interface InboxService {
    /**
     * 学生信件
     * @return
     */
    List<StudentInbox> studentReceiveService(int num);



    /**
     * x学生收件总数
     * @return
     */
    int studentInboxNumService();

    /**
     * 查询邮件信息
     * @return
     */
    InboxContent selectInboxContentService();

    /**
     * 发布作业邮件
     * @param clsId
     * @param content
     * @return
     */
    boolean homeWorkService(String clsId, String content);
}
