package edu.sdp.controller;

import edu.sdp.service.LeaveService;
import edu.sdp.util.InboxUtil;
import edu.sdp.vo.Information;
import edu.sdp.vo.Leave;
import edu.sdp.vo.LeaveInformation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.List;

@Controller
public class LeaveController {
    @Autowired
    private LeaveService leaveService;

    @Autowired
    private InboxUtil inboxUtil;

    @Autowired
    private HttpSession session;

    @Autowired
    private HttpServletRequest request;

    /**
     * 请假
     * @param teacher_name 老师唯一标识
     * @param leave_time 请假时间
     * @param leave_type 请假类型
     * @param leave_reason 请假原因
     * @return
     */
    @PostMapping("/leave")
    @ResponseBody
    public String leave(@RequestParam(value = "teacherName",required = false) String teacher_name,
                         @RequestParam(value = "leaveTime",required = false) String leave_time,
                         @RequestParam(value = "leaveType",required = false) String leave_type,
                         @RequestParam(value = "leaveReason",required = false) String leave_reason){
        session=request.getSession();
        String id=(String)session.getAttribute("uuid");
        Information information=leaveService.searchStudent(id);
        if (information.getUserName().equals("null")||information.getUserStunum().equals("null")||information.getUserSystem().equals("null")||information.getUserClass().equals("null")){
            return "请完善信息";
        }
        Leave leave=new Leave();
        leave.setLeaveStudent(id);
        leave.setLeaveTeacher(teacher_name);
        leave.setLeaveReason(leave_reason);
        leave.setLeaveType(leave_type);
        leave.setLeaveTime(leave_time);
        leaveService.leaveService(leave);
        int inbox=inboxUtil.writeToInbox(id,teacher_name,leave_reason,"请假");
        if (inbox!=0){
            return "发送成功";
        }
        return "出现错误";
    }

    /**
     * 返回学生完善的信息
     * @return
     */
    @PostMapping("/searchStudent")
    @ResponseBody
    public Information searchStudent(){
        session=request.getSession();
        String id=(String)session.getAttribute("uuid");
        return leaveService.searchStudent(id);
    }

    /**
     * 学生请假信息
     */
    @GetMapping("/studentLeaveInformation")
    @ResponseBody
    public List<LeaveInformation> studentLeaveInformation(@RequestParam(value = "num")int num,
                                                          @RequestParam(value = "state")int state){
        session=request.getSession();
        String id=(String)session.getAttribute("uuid");
        return leaveService.studentLeaveInformationService(id,num,state);
    }
    /**
     * 查询学生请假信息数量
     */
    @GetMapping("/studentLeaveInformationNum")
    @ResponseBody
    public int studentLeaveInformationNum(@RequestParam(value = "state")int state){
        session=request.getSession();
        String id=(String)session.getAttribute("uuid");
        return leaveService.studentLeaveInformationNumService(id,state);
    }

    /**
     * 修改请假状态
     * @param id 请假信息唯一标识
     * @param content 审批内容
     * @param state 状态码
     * @param userId 学生唯一标识
     */
    @GetMapping("/modifyLeaveStatus")
    @ResponseBody
    public boolean modifyLeaveStatus(@RequestParam(value = "id")String id,
                                  @RequestParam(value = "content",required = false)String content,
                                  @RequestParam(value = "state")String state,
                                  @RequestParam(value = "userId")String userId){
        return leaveService.modifyLeaveStatusService(id,content,state,userId);
    }



}
