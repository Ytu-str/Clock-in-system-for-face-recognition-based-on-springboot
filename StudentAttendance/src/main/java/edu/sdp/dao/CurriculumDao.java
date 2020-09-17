package edu.sdp.dao;

import edu.sdp.vo.Curriculum;
import edu.sdp.vo.ExportData;
import edu.sdp.vo.StudentClass;
import edu.sdp.vo.TeacherClass;
import org.apache.ibatis.annotations.Mapper;

import java.sql.Timestamp;
import java.util.List;

@Mapper
public interface CurriculumDao {
    /**
     * 查询学生加入的班级
     * @param stu_id
     * @return
     */

    List<StudentClass> SearchClassMapper(String stu_id,int num,int classNum);

    /**
     * 加入班级
     * @param cls_id
     * @param id
     * @return
     */
    int joinClassMapper(String cls_id,String id);

    /**
     * 教师创建的班级
     * @param id
     * @return
     */
    List<TeacherClass> SearchTeacherClassMapper(String id,int num,int classNum);

    /**
     * 查询是否已经加入班级
     * @param cls_id
     * @param id
     * @return
     */
    int existenceClassMapper(String cls_id, String id);

    /**
     * 查询班级是否存在
     * @param cls_id
     * @return
     */
    int selectIsThereAnyClassMapper(String cls_id);

    /**
     * 教师课程信息
     * @param id
     * @return
     */
    TeacherClass searchTeacherClassInformationMapper(String id);

    /**
     * 教师或学生班级的数量
     * @param id
     * @return
     */
    int classNumCountMapper(String id);

    /**
     * 导出数据
     * @param id 课程唯一标识
     * @return
     */
    List<ExportData> exportDataMapper(String id);

    /**
     * 导出数据的课程名称
     * @param id
     * @return
     */
    String selectClsName(String id);

    /**
     * 创建课程
     * @param name 班级名称  cls_name
     * @param cls 班级说明
     * @param id  创建人唯一标识
     * @param clsId  课程唯一标识
     * @param timeStamp 创建时间
     * @param photoUrl 课程图片url
     * @return
     */
    boolean creatingCoursesMapper(String name, String cls, String id, String clsId, Timestamp timeStamp, String photoUrl);

    /**
     * 将创建的班级的信息加入myclass
     * @param id
     * @param clsId
     */
    void insterMyclass(String id, String clsId);
}
