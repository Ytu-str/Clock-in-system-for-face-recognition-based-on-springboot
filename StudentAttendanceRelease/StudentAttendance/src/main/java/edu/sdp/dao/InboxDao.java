package edu.sdp.dao;

import edu.sdp.vo.InboxContent;
import edu.sdp.vo.StudentInbox;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface InboxDao {
    /**
     * 查询未读的邮件
     * @param id
     * @return
     */
    List<StudentInbox> studentReceiveMapper(String id,int num,int classNum);



    /**
     * 改变信件状态
     * @param id
     * @return
     */
    boolean AccessChangeStatusMapper(String id);

    /**
     * 学生收件总数
     * @param id  收件人唯一标识
     * @return
     */
    int studentInboxNumMapper(String id);

    /**
     * 查询邮件信息
     * @param id 邮件唯一标识
     * @return
     */
    InboxContent selectInboxContentMapper(String id);
}
