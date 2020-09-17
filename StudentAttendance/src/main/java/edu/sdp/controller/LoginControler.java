package edu.sdp.controller;

import edu.sdp.service.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.security.auth.message.callback.PrivateKeyCallback;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

@Controller
public class LoginControler {

    @Autowired
    private LoginService ls;

    @RequestMapping(value = "/validate_password")
    @ResponseBody
    public Integer validatePassword(@RequestParam( value ="name",required=false) String name,
                                    @RequestParam( value ="password",required=false) String password) {
        return ls.validatePassword(name, password);
    }

    /**
     * 得到密保问题
     * @param userNumber
     * @return
     */
    @GetMapping(value = "/secretGuard")
    @ResponseBody
    public String secretGuard(@RequestParam(value = "userNumber")String userNumber){
        return ls.secretGuardService(userNumber);
    }

    /**
     * 修改密码
     */
    @GetMapping(value = "/getChangPas")
    @ResponseBody
    public boolean loginChangePassword(@RequestParam(value = "userNumber")String userNumber,
                                  @RequestParam(value = "userAnswer")String userAnswer,
                                  @RequestParam(value = "userPass")String userPass){
        return ls.changePasswordService(userNumber,userAnswer,userPass);
    }
}
