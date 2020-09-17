package edu.sdp.service;

import edu.sdp.vo.StudentClass;
import edu.sdp.vo.TeacherClass;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

public interface CurriculumService {

    /**
     * 查询学生所加入的班级
     * @param stu_id 学生唯一标识
     * @return
     */
    List<StudentClass> SearchClass(String stu_id,int num);

    /**
     * 学生加入班级
     * @param cls_id 班级码
     * @param id 用户标识
     * @return
     */
    boolean joinClassService(String cls_id,String id);

    /**
     * 教师创建的班级
     * @param id
     * @return
     */
    List<TeacherClass> searchTeacherClass(String id,int num);

    /**
     * 查询是否已经加入班级
     * @param cls_id
     * @param id
     * @return
     */
    int existenceClass(String cls_id, String id);

    /**
     * 查询班级是否存在
     * @param cls_id
     * @return
     */
    int selectIsThereAnyClass(String cls_id);

    /**
     * 教师课程信息
     * @param id
     * @return
     */
    TeacherClass searchTeacherClassInformation(String id);

    /**
     * 查询教师或学生班级数量
     * @return
     */
    int classNumCountService();

    /**
     * 导出数据
     */
    void exportDataService(HttpServletResponse response,String id);

    /**
     * 创建课程
     * @param name
     * @param cls
     * @param clsPhoto
     * @return
     */
    boolean creatingCoursesService(String name, String cls, MultipartFile clsPhoto) throws IOException;
}
