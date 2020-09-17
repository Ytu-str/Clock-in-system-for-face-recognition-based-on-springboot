package edu.sdp.controller;

import edu.sdp.service.InboxService;
import edu.sdp.vo.InboxContent;
import edu.sdp.vo.StudentInbox;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller
public class InboxController {

    @Autowired
    private InboxService inboxService;



    /**
     * 学生收到的信件
     * @param num 分页
     * @return
     */
    @GetMapping("/studentReceive")
    @ResponseBody
    public List<StudentInbox> studentReceive(@RequestParam(value = "num")int num){
        return inboxService.studentReceiveService(num);
    }



    /**
     * 学生或老师收件总数
     */
    @GetMapping("/InboxNum")
    @ResponseBody
    public int studentInboxNum(){
        return inboxService.studentInboxNumService();
    }


    /**
     * 查询邮件信息
     */
    @GetMapping("/selectInboxContent")
    @ResponseBody
    public InboxContent selectInboxContent(){
        return inboxService.selectInboxContentService();
    }


    /**
     * 发送发布作业邮件
     */
    @GetMapping("/homeWork")
    @ResponseBody
    public boolean homeWork(@RequestParam(value = "clsId")String clsId,
                            @RequestParam(value = "content")String content){
        return inboxService.homeWorkService(clsId,content);
    }

}
