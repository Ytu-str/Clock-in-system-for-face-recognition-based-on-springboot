package edu.sdp.vo;

import lombok.Data;

import java.sql.Timestamp;
import java.util.Date;
import java.util.UUID;

/**
 * 收件箱类
 */
@Data
public class Inbox {
    private String inboxFrom;  //发件人类
    private String inboxAddressee;  //收件人类
    private Date inboxDate;   //发送邮件的时间
    private String inboxContent;  //内容
    private Integer inboxState;  //状态  0看过，1没看过
    private String inboxId;  //邮件唯一标识
    private String inboxType;

    public Inbox(){
        this.inboxState=1;
        this.inboxDate= new Timestamp(System.currentTimeMillis());
        this.inboxId= UUID.randomUUID().toString().replace("-","").toUpperCase();
    }
}
