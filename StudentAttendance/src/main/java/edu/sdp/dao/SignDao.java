package edu.sdp.dao;

import edu.sdp.vo.PersonnelList;
import edu.sdp.vo.Sign;
import edu.sdp.vo.SignNum;
import edu.sdp.vo.SignTask;
import org.apache.ibatis.annotations.*;

import java.sql.Timestamp;
import java.util.Date;
import java.util.List;


@Mapper
public interface SignDao {
    /**
     * 签到成功
     *
     */
    int signMapper(@Param("sign") Sign sign);

    /**
     * 删除未签到人名
     * @param user_id
     */
    void deletSignMapper(String user_id);

    /**
     * 删除上传证件照失败数据库信息
     */
    void deleteFail(String user_id);


    /**
     * 近七次签到情况
     * @param signId
     * @return
     */
    SignNum signNumMapper(String signId, String time);

    /**
     * 发布签到任务
     * @param signTask
     * @return
     */
    int issueSignInMapper(SignTask signTask);

    /**
     * 查询所有加入此班级学生的id
     * @param id
     * @return
     */
    List joinClassStudentId(String id);



    /**
     * 将加入班级的学生加入未签到表
     * @param
     * @param
     * @return
     */
    int addunsignMapper(String sign_id,String id);


    /**
     * 更改任务状态
     */
    int ChangeStatus(String id);

    /**
     * 查找哪个课程在签到
     * @param uuid  发送人id
     * @return
     */
    String selectContent(String uuid);

    /**
     * 查询最近七次签到任务的时间
     * @return
     */
    List<String> selecSevenTime(String id);

    /**
     * 上次未签到学生信息
     * @param id
     * @return
     */
    List<PersonnelList> PersonnelListMapper(String id);

    /**
     * 查看哪个课程可以签到
     * @param id 用户唯一标识
     * @return
     */
    List<SignTask> CheckInStatusMapper(String id);
}
