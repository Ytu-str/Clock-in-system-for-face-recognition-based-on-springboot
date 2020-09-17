package edu.sdp.util;

import edu.sdp.service.LeaveService;
import edu.sdp.vo.Inbox;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

/**
 * 收件箱工具类
 */
@Component
public class InboxUtil {

    @Autowired
    private LeaveService leaveService;


    public int writeToInbox(String fromId,String addresseeId,String Content,String type){
        Inbox inbox=new Inbox();
        inbox.setInboxFrom(fromId);
        inbox.setInboxAddressee(addresseeId);
        inbox.setInboxContent(Content);
        inbox.setInboxType(type);
        return leaveService.writeToInboxService(inbox);
    }
}
