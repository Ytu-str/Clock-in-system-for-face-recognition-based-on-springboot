package edu.sdp.service.impl;

import edu.sdp.dao.LoginDao;
import edu.sdp.service.LoginService;
import edu.sdp.vo.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.security.auth.message.callback.PrivateKeyCallback;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

@Service
public class LoginServiceimpl implements LoginService {

    @Autowired
    private LoginDao ld;
    @Autowired
    private HttpSession session;
    @Autowired
    private HttpServletRequest request;

    @Override
    public Integer validatePassword(String name, String password) {
        User user = ld.validatePassword(name);
        if (user == null) {
            return 3;
        } else if (user.getUserPass().equals(password)) {
            session=request.getSession();
            session.setAttribute("uuid",user.getUserId());
            return 1;
        } else {
            return 2;
        }
    }

    @Override
    public String serachUserName(String user_id) {
        return ld.serachUserName(user_id);
    }

    @Override
    public String secretGuardService(String userNumber) {
        return ld.secretGuardMapper(userNumber);
    }

    @Override
    public boolean changePasswordService(String userNumber, String userAnswer, String userPass) {
        String Answer=ld.selectAnswer(userNumber);
        if (Answer.equals(userAnswer)){
            return ld.changePasswordMapper(userNumber,userPass);
        }
        return false;
    }
}
