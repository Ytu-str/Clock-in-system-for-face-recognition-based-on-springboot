package edu.sdp.service;

import edu.sdp.vo.Information;
import edu.sdp.vo.teacherHead;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;

public interface RegisterService {
    /**
     * 注册账号
     * @param number 账号
     * @param password 密码
     * @param question 密保问题
     * @param answer 密保答案
     * @param iName 昵称
     * @param portrait 头像网址
     */
    String registerPass(String number, String password, String question, String answer, String iName, MultipartFile portrait) throws IOException;

    /**
     * 身份认证
     * @param name 姓名
     * @param Identity 身份证号
     * @return
     */
    boolean realName(String name,String Identity,MultipartFile Imag) throws IOException;

    /**
     * 修改个人信息
     * @param user_iname 昵称
     * @param user_stunum 学号
     * @param user_system 系别
     * @param user_class 班级
     * @return
     */
    boolean modifyInformationService(String user_iname, String user_stunum, String user_system, String user_class);

    /**
     * 查找个人信息
     * @return
     */
    Information selectInformationService();

    /**
     * 教师姓名头像
     * @return
     */
    List<teacherHead> teacherInformationHeadService();

    /**
     * 教师端4个数字
     * @return
     */
    List<Integer> teacherHeadFourNumService();

    /**
     * 修改头像
     * @param avatar
     * @return
     */
    String ModifyTheAvatarService(MultipartFile avatar) throws IOException;

    /**
     * 判断实名认证
     * @return
     */
    boolean RealNameAuthenticationSuccessfulService();
}
