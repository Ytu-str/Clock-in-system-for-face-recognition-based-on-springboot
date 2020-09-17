package edu.sdp.controller;

import edu.sdp.service.AdminService;
import edu.sdp.vo.admin.*;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;


import javax.mail.MessagingException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;


@Controller
public class AdminController {

    @Autowired
    private AdminService adminService;

    /**
     * 查询系别
     * @return
     */
    @GetMapping("/selectSystem")
    @ResponseBody
    public List<Department> selectSystem(){
        return adminService.selectSystemService();
    }

    /**
     * 查询班级
     * @param userUid  系别唯一标识
     * @return
     */
    @GetMapping("/selectClass")
    @ResponseBody
    public List<Dclass> selectClass(@RequestParam(value ="userUid")String userUid){
        return adminService.selectClassService(userUid);
    }

    /**
     * 查询用户数据
     * @param userName 用户姓名
     * @param userType 用户类别
     * @param userSystem 用户所属系别
     * @param userClass 用户所属班级
     * @return
     */
    @GetMapping("/selectUserInformation")
    @ResponseBody
    public Map selectUserInformation(@RequestParam(value = "userName",required = false)String userName,
                                     @RequestParam(value = "userType",required = false)String userType,
                                     @RequestParam(value = "userSystem",required = false)String userSystem,
                                     @RequestParam(value = "userClass",required = false)String userClass,
                                     @RequestParam(value = "num",required = false)int num){
        return adminService.selectUserInformationService(userName, userType, userSystem, userClass, num);
    }

    /**
     * 创建用户
     * @param userNumber 用户账号
     * @param userPass 用户密码
     * @param userJion 用户权限
     * @param userStunum 用户学号
     * @param userSystem 所属系别唯一标识
     * @param userClass 所属班级唯一标识
     * @param userQues 密保问题
     * @param userAnswer 密保答案
     * @return
     */
    @GetMapping("/createUser")
    @ResponseBody
    public boolean createUser(@RequestParam(value = "userNumber",required = false)String userNumber,
                              @RequestParam(value = "userPass",required = false)String userPass,
                              @RequestParam(value = "userJion",required = false)String userJion,
                              @RequestParam(value = "userStunum")String userStunum,
                              @RequestParam(value = "userSystem")String userSystem,
                              @RequestParam(value = "userClass")String userClass,
                              @RequestParam(value = "userQues")String userQues,
                              @RequestParam(value = "userAnswer")String userAnswer){
        return adminService.createUserService(userNumber,userPass,userJion,userStunum,userSystem,userClass,userQues,userAnswer);
    }

    /**
     * 删除用户
     */
    @GetMapping("/delectUser")
    @ResponseBody
    public void delectUser(@RequestParam(value = "list") ArrayList<String> list){
        adminService.delectUserService(list);
    }

    /**
     * 修改用户信息
     */
    @GetMapping("/updateUser")
    @ResponseBody
    public boolean updateUser(AdminUser adminUser){
       return adminService.updateUserService(adminUser);
    }

    /**
     * 查询课程信息
     * @param className 课程名称
     * @param teacherName 教师名字
     * @param num
     * @return
     */
    @GetMapping("/searchTeacherClass")
    @ResponseBody
    public Map searchTeacherClass(@RequestParam(value = "className",required = false)String className,
                                                 @RequestParam(value = "teacherName",required = false)String teacherName,
                                                 @RequestParam(value = "num")int num){
        return adminService.searchTeacherClassService(className,teacherName,num);
    }

    /**
     * 查询所有老师
     */
    @GetMapping("/selectTeacher")
    @ResponseBody
    public List<Teacher> selectTeacher(){
        return adminService.selectTeacherService();
    }

    /**
     * 添加课程
     * @param clsName 课程名称
     * @param cls 课程说明
     * @param clsAscription 所属老师唯一标识
     * @return
     */
    @GetMapping("/adminInsertCurriculum")
    @ResponseBody
    public boolean adminInsertCurriculum(@RequestParam(value = "clsName")String clsName,
                                         @RequestParam(value = "cls")String cls,
                                         @RequestParam(value = "clsAscription")String clsAscription){
    return adminService.adminInsertCurriculum(clsName,cls,clsAscription);
    }

    /**
     * 删除课程
     */
    @GetMapping("/adminDeleteCurriculum")
    @ResponseBody
    public void adminDeleteCurriculum(@RequestParam(value = "list")ArrayList<String> clsIdList){
         adminService.adminDeleteCurriculumService(clsIdList);
    }

    /**
     * 修改课程信息
     * @param clsName 课程名称
     * @param cls 课程说明
     * @param clsAscription  所属老师id
     * @param clsId 唯一标识
     * @return
     */
    @GetMapping("/adminUpdateCurriculum")
    @ResponseBody
    public boolean adminUpdateCurriculum(@RequestParam(value = "clsName")String clsName,
                                         @RequestParam(value = "cls")String cls,
                                         @RequestParam(value = "clsAscription")String clsAscription,
                                         @RequestParam(value = "clsId")String clsId){
        return adminService.adminUpdateCurriculumService(clsName,cls,clsAscription,clsId);
    }

    /**
     * 请假信息
     * @param clsSystem 系别
     * @param className 班级
     * @param userName 姓名
     * @param num 页数
     * @return
     */
    @GetMapping("/adminLeaveInformation")
    @ResponseBody
    public Map adminLeaveInformation(@RequestParam(value = "clsSystem",required = false)String clsSystem,
                                     @RequestParam(value = "className",required = false)String className,
                                     @RequestParam(value = "userName",required = false)String userName,
                                     @RequestParam(value = "num")int num){
        return adminService.adminLeaveInformationService(clsSystem,className,userName,num);
    }

    /**
     * 删除请假信息
     * @param leaveList
     */
    @GetMapping("/adminDeleteLeaveInformation")
    @ResponseBody
    public void adminDeleteLeaveInformation(@RequestParam(value = "leaveId")ArrayList<String> leaveList){
            adminService.adminDeleteLeaveInformationService(leaveList);
    }

    /**
     * 修改请假信息
     * @param state 状态
     * @param content 内容
     * @param leaveId 请假条Id
     * @param userId 学生id
     * @param leaveTeacher 老师Id
     * @param leaveType 邮件类型
     * @return
     */
    @GetMapping("/adminUpdateLeaveInformation")
    @ResponseBody
    public boolean adminUpdateLeaveInformation(@RequestParam(value = "state")String state,
                                               @RequestParam(value = "content")String content,
                                               @RequestParam(value = "leaveId")String leaveId,
                                               @RequestParam(value = "userId")String userId,
                                               @RequestParam(value = "leaveTeacher")String leaveTeacher,
                                               @RequestParam(value = "leaveType")String leaveType){
        return adminService.adminUpdateLeaveInformationService(state,content,leaveId,userId,leaveTeacher,leaveType);
    }

    /**
     * 查询系别和班级
     */
    @GetMapping("/adminSelectSystemAndClass")
    @ResponseBody
    public Map adminSelectSystemAndClass(@RequestParam(value = "num")int num,
                                          @RequestParam(value = "system",required = false)String system,
                                          @RequestParam(value = "dclass",required = false)String dclass){
        return adminService.adminSelectSystemAndClass(num,system,dclass);

    }

    /**
     * 修改班级的系别
     * @param system
     * @param dclass
     * @return
     */
    @GetMapping("/adminUpdateBeLongToSystem")
    @ResponseBody
    public boolean adminUpdateBeLongToSystem(@RequestParam(value = "system")String system,
                                             @RequestParam(value = "dclass")String dclass){
        return adminService.adminUpdateBeLongToSystemService(system,dclass);
    }

    /**
     * 添加系别
     * @param systemName 系别名称
     * @return
     */
    @GetMapping("/adminInsertSystem")
    @ResponseBody
    public boolean adminInsertSystem(@RequestParam(value = "systemName")String systemName){
        return adminService.adminInsertSystemService(systemName);
    }

    /**
     * 添加班级
     * @param className 班级名称
     * @param systemId 所属系别唯一标识
     * @return
     */
    @GetMapping("/adminInsertClass")
    @ResponseBody
    public boolean adminInsertClass(@RequestParam(value = "className")String className,
                                    @RequestParam(value = "systemId")String systemId){
        return adminService.adminInsertClassService(className,systemId);
    }

    /**
     * 删除班级或者系别
     * @param systemList 系别列表
     * @param classList 班级列表
     */
    @GetMapping("/adminDeleteSystemPerhapsClass")
    @ResponseBody
    public void adminDeleteSystemPerhapsClass(@RequestParam(value = "systemList",required = false)ArrayList systemList,
                                              @RequestParam(value = "classList",required = false)ArrayList classList){
        adminService.adminDeleteSystemPerhapsClassService(systemList,classList);
    }

    /**
     * 查询首页4个数字信息
     * @return
     */
    @GetMapping("/adminIndexIntInformation")
    @ResponseBody
    public List<Integer> adminIndexIntInformation(){
        return adminService.adminIndexIntInformationService();
    }

    /**
     * 意见邮箱
     * @param content
     * @return
     * @throws MessagingException
     */
    @GetMapping("/adminSendMail")
    @ResponseBody
    public boolean adminSendMail(@RequestParam(value = "content")String content) throws MessagingException {
        return adminService.adminSendMailService(content);
    }

    /**
     * 添加公告
     * @return
     */
    @GetMapping("/adminInsertNotice")
    @ResponseBody
    public boolean adminInsertNotice(@RequestParam(value = "content")String content){
        return adminService.adminInsertNoticeService(content);
    }

    /**
     * 查询公告
     * @param content
     * @return
     */
    @GetMapping("/adminSelectNotice")
    @ResponseBody
    public Map adminSelectNotice(@RequestParam(value = "content",required = false)String content,
                                          @RequestParam(value = "num")int num){
        return adminService.adminSelectNoticeService(content,num);
    }

    /**
     * 学生和教师的公告
     * @return
     */
    @GetMapping("/teacherAndStudentNotice")
    @ResponseBody
    public List<Notice> teacherAndStudentNotice(){
        return adminService.teacherAndStudentNoticeService();
    }

    /**
     * 删除公告
     */
    @GetMapping("/adminDeleteNotice")
    @ResponseBody
    public void adminDeleteNotice(@RequestParam(value = "list")ArrayList list){
        adminService.adminDeleteNoticeService(list);
    }

    /**
     * 修改公告
     */
    @GetMapping("/adminUpdateNotice")
    @ResponseBody
    public boolean adminUpdateNotice(@RequestParam(value = "content")String content,
                                     @RequestParam(value = "noticeId")String noticeId){
        return adminService.adminUpdateService(content,noticeId);
    }
}
