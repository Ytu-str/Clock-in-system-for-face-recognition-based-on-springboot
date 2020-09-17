package edu.sdp.service;

import javax.security.auth.message.callback.PrivateKeyCallback;
import javax.servlet.http.HttpServletRequest;

public interface LoginService {
    /**
     * 验证密码
     * @param name 用户名
     * @param password 密码
     * @return 1：密码正确 2：密码错误 3：用户名不存在
     */
    Integer validatePassword(String name, String password);

    /**
     * 根据人脸库返回的id查询对应姓名
     * @param user_id
     * @return
     */
    String serachUserName(String user_id);

    /**
     * 得到密保问题
     * @param userNumber
     * @return
     */
    String secretGuardService(String userNumber);

    /**
     * 修改密码
     * @param userNumber
     * @param userAnswer
     * @param userPass
     * @return
     */
    boolean changePasswordService(String userNumber, String userAnswer, String userPass);


}
