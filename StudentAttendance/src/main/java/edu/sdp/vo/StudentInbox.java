package edu.sdp.vo;

import lombok.Data;

/**
 * 学生收件
 */
@Data
public class StudentInbox {
    private String inboxName; //发件人姓名
    private String timesTamp; //时间
    private String content; //内容
    private String id;//邮件唯一标识
    private String state;//邮件状态
    private String type; //邮件类型
}
