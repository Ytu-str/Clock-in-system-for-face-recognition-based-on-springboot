package edu.sdp.dao;

import edu.sdp.vo.User;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Component;

@Mapper
public interface LoginDao {
    /**
     * 验证密码
     * @param name 用户账号
     * @return 用户数据
     */
    User validatePassword(String name);

    /**
     * 查询此用户姓名
     * @param user_id
     * @return
     */
    String serachUserName(String user_id);

    /**
     * 获取密保问题
     * @param userNumber
     * @return
     */
    String secretGuardMapper(String userNumber);

    /**
     * 修改密码
     * @param userNumber
     * @param userPass
     * @return
     */
    boolean changePasswordMapper(String userNumber, String userPass);

    /**
     * 查询密保答案
     * @param userNumber
     * @return
     */
    String selectAnswer(String userNumber);
    /**
     * 查询权限
     * @param id
     * @return
     */
    String searchJoin(String id);
}
