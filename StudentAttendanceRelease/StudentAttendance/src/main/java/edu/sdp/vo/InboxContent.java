package edu.sdp.vo;

import lombok.Data;

/**
 * 邮件内容
 */
@Data
public class InboxContent {
    private String userName; //发送人姓名
    private String inboxDate;  //时间
    private String inboxContent; //内容
    private String inboxType;  //类型

}
