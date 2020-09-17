package edu.sdp.controller;

import edu.sdp.dao.LoginDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

@Controller
public class UserInterceptor {
    @Autowired
    private HttpSession session;
    @Autowired
    private HttpServletRequest request;

    @Autowired
    private LoginDao loginDao;

    /**
     * 学生端
     * @return
     */
    @RequestMapping(value = "login")
    public String login() {
        return "client/login";
    }
    @PostMapping("/")
    public String a() {
        return "client/login";
    }

    @RequestMapping(value = "register")
    public String register() {
        return "client/register";
    }

    @RequestMapping(value = "changePassword")
    public  String changePassword() {
        return "client/change_password";
    }

    @RequestMapping(value = "index")
    public String index() {
        HttpSession session = request.getSession(true);
        if (session.isNew()) {
            return "client/login";
        }
        String id= (String) session.getAttribute("uuid");
        String joinId=loginDao.searchJoin(id);
            if (joinId.equals("0")){
                return "client/student/student";
            }else if (joinId.equals("1")){
                return "client/teacher/index";
            }else {
                return "admin/index";
            }
    }

    @RequestMapping(value ="realname")
    public String realname(){
        return "client/realname";
    }


    /**
     * 教师端
     * @return
     */

    @RequestMapping(value ="teacherIndex")
    public String teacherIndex(){
        return "client/teacher/index";
    }

    @GetMapping(value ="classSign")
    public String classSign(@RequestParam(value = "clsId")String id){
        session=request.getSession();
        session.setAttribute("clsId",id);
        return "client/teacher/tea_class_sign";
    }
    @RequestMapping(value ="teacherClass")
    public String teacherClass(){
return "client/teacher/tea_class";
}
    @RequestMapping(value ="teacherInbox")
    public String teacherInbox(){
        return "client/teacher/tea_inbox";
    }
    @RequestMapping(value ="teacherLeave")
    public String teacherLeave(){
        return "client/teacher/tea_leave";
    }

    @RequestMapping(value ="personal")
    public String personal(){
        return "client/personal_information";
    }

    @RequestMapping(value ="calendar")
    public String calendar(){
        return "client/teacher/calendar";
    }

    @RequestMapping(value ="inboxParticulars")
    public String inboxParticulars(@RequestParam(value = "inboxId")String inboxId){
        session=request.getSession();
        session.setAttribute("inboxId",inboxId);
        return "client/inbox_particulars";
    }


    /**
     * 管理端
     */
    @RequestMapping(value ="batchClass")
    public String batch_class(){
        return "admin/batch_class.html";
    }
    @RequestMapping(value ="batchCurriculum")
    public String batch_curriculum(){
        return "admin/batch_curriculum.html";
    }
    @RequestMapping(value ="batchLeave")
    public String batch_leave(){
        return "admin/batch_leave.html";
    }
    @RequestMapping(value ="batchUsers")
    public String batch_users(){
        return "admin/batch_users.html";
    }
    @RequestMapping(value ="batchIndex")
    public String batchIndex(){
        return "admin/index.html";
    }
    @RequestMapping(value ="manageClass")
    public String manage_class(){
        return "admin/manage_class.html";
    }
    @RequestMapping(value ="manageCurriculum")
    public String manage_curriculum(){
        return "admin/manage_curriculum.html";
    }
    @RequestMapping(value ="manageLeave")
    public String manage_leave(){
        return "admin/manage_leave.html";
    }
    @RequestMapping(value ="manageAnnouncement")
    public String manage_announcement(){
        return "admin/manage_announcement.html";
    }
    @RequestMapping(value ="manageUsers")
    public String manage_users(){
        return "admin/manage_users.html";
    }
    @RequestMapping(value ="batchAnnouncement")
    public String batch_announcement(){
        return "admin/batch_announcement.html";
    }

    @RequestMapping(value ="exitTeacher")
    public String exitTeacher(){
        session.removeAttribute("uuid");
        return "client/login";
    }

}
