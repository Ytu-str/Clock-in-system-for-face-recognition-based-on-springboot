package edu.sdp.controller;

import edu.sdp.service.CurriculumService;
import edu.sdp.vo.StudentClass;
import edu.sdp.vo.TeacherClass;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.List;
@Controller
public class CurriculumController {

    @Autowired
    private CurriculumService curriculumService;
    @Autowired
    private HttpSession session;
    @Autowired
    private HttpServletRequest request;

    /**
     * 学生查找加入的班级
     * @return
     */
    @GetMapping("/searchClass")
    @ResponseBody
    public List searchStudentClass(@RequestParam(value = "num")int num){
        session=request.getSession();
        String id= (String) session.getAttribute("uuid");
        List<StudentClass> list= curriculumService.SearchClass(id,num);
        return list;
    }
    /**
     * 学生加入班级
     */
    @GetMapping("/joinClass")
    @ResponseBody
    public String joinClass(@RequestParam( value ="id")String cls_id){
        session=request.getSession();
        String id= (String) session.getAttribute("uuid");
        int numClass=curriculumService.selectIsThereAnyClass(cls_id);
        if (numClass!=0){
            int num=curriculumService.existenceClass(cls_id,id);
            if (num==0){
                boolean state=curriculumService.joinClassService(cls_id,id);
                if (state){
                    return "加入成功";
                }
            }else {
                return "已加入此班级";
            }
        }
        return "班级不存在";
    }

    /**
     * 教师创建的班级
     * @return
     */
    @GetMapping("/searchStudentClass")
    @ResponseBody
    public List searchTeacherClass(@RequestParam(value = "teacherClassNum")int num){
        session=request.getSession();
        String id= (String) session.getAttribute("uuid");
        return curriculumService.searchTeacherClass(id,num);
    }
    /**
     * 教师的班级信息
     */
    @GetMapping("/searchTeacherClassInformation")
    @ResponseBody
    public TeacherClass searchTeacherClassInformation(){
        session=request.getSession();
        String id= (String) session.getAttribute("clsId");
        return curriculumService.searchTeacherClassInformation(id);
    }

    /**
     * 教师创建班级数量或学生加入班级的总数
     */
    @GetMapping("/classNumCount")
    @ResponseBody
    public int classNumCount(){
        return curriculumService.classNumCountService();
    }

    /**
     * 导出数据
     * @param response
     * @param id 课程唯一标识
     */
    @GetMapping("/exportData")
    @ResponseBody
    public void exportData(HttpServletResponse response,
                           @RequestParam(value = "clsId")String id){
        curriculumService.exportDataService(response,id);
    }

    /**
     * 创建课程
     * @param name 课程名称
     * @param cls 课程说明
     * @param clsPhoto 课程图片
     * @return
     */
    @PostMapping("/creatingCourses")
    @ResponseBody
    public boolean creatingCourses(@RequestParam(value = "clsName",required = false)String name,
                                   @RequestParam(value = "cls",required = false)String cls,
                                   @RequestParam(value = "clsPhoto",required = false) MultipartFile clsPhoto) throws IOException {
        return curriculumService.creatingCoursesService(name,cls,clsPhoto);
    }
}