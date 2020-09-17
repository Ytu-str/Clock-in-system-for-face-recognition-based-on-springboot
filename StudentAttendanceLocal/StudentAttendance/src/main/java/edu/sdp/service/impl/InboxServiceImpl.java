package edu.sdp.service.impl;

import edu.sdp.dao.InboxDao;
import edu.sdp.dao.SignDao;
import edu.sdp.service.InboxService;
import edu.sdp.util.InboxUtil;
import edu.sdp.vo.InboxContent;
import edu.sdp.vo.StudentInbox;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.List;

@Service
public class InboxServiceImpl implements InboxService {
    @Autowired
    private HttpSession session;
    @Autowired
    private HttpServletRequest request;

    @Autowired
    private SignDao signDao;

    @Autowired
    private InboxDao inboxDao;

    @Autowired
    private InboxUtil inboxUtil;

    @Override
    public List<StudentInbox> studentReceiveService(int num) {
        int classNum=5;
        session=request.getSession();
        String id=(String)session.getAttribute("uuid");
        return inboxDao.studentReceiveMapper(id,num,classNum);
    }



    @Override
    public int studentInboxNumService() {
        session=request.getSession();
        String id=(String)session.getAttribute("uuid");
        return inboxDao.studentInboxNumMapper(id);
    }

    @Override
    public InboxContent selectInboxContentService() {
        session=request.getSession();
        String id=(String)session.getAttribute("inboxId");
        inboxDao.AccessChangeStatusMapper(id); //改变状态
        return inboxDao.selectInboxContentMapper(id);
    }

    @Override
    public boolean homeWorkService(String clsId, String content) {
        List list=signDao.joinClassStudentId(clsId);
        String id=(String)session.getAttribute("uuid");
        list.forEach(x->{
            inboxUtil.writeToInbox(id,x.toString(),content,"作业");
        });
        return true;
    }
}
