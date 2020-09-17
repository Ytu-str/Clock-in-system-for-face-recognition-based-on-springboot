package edu.sdp.service;

import edu.sdp.vo.PersonnelList;
import edu.sdp.vo.Sign;
import edu.sdp.vo.SignNum;
import edu.sdp.vo.SignTask;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.text.ParseException;
import java.util.List;
import java.util.Map;

public interface SignService {
    /**
     * 人脸识别接收图片
     * @param imagebase64
     * @return
     * @throws IOException
     */
    Map<String,Object> searchface(StringBuffer imagebase64) throws IOException;

    /**
     * 人脸注册
     * @param
     * @return
     * @throws IOException
     */
    Map<String,Object> registrationface(MultipartFile file, String user_id) throws IOException;

    /**
     * 打卡成功
     */

    int signSuccess(Sign sign);

    /**
     * 删除未打卡人名
     * @param user_id
     */
    void deletSign(String user_id);

    /**
     * 发布签到任务
     * @param id 课程唯一标识
     * @param
     * @return
     */
    boolean issueSignIn(String id,Long time);


    /**
     * 教师端折线图，近七次签到情况
     * @param
     * @return
     */
    List<SignNum> signNumsService() throws ParseException;

    /**
     * 上次未签到学生信息
     * @return
     */
    List<PersonnelList> PersonnelListServie();

    /**
     * 查看那个课程可以签到
     * @return
     */
    List<SignTask> CheckInStatusService();
}
