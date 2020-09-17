package edu.sdp.controller;

import edu.sdp.service.RegisterService;
import edu.sdp.vo.Information;
import edu.sdp.vo.teacherHead;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.List;


@Controller
public class RegisterController {

    @Autowired
    private RegisterService rs;

    @RequestMapping(value = "/registerPass")
    @ResponseBody
    public String registerPass(@RequestParam( value ="number",required=false) String number,
                                @RequestParam( value ="password",required=false) String password,
                                @RequestParam( value ="question",required=false) String question,
                                @RequestParam( value ="answer",required=false) String answer,
                                @RequestParam( value ="iName",required=false) String iName,
                                @RequestParam( value = "portrait", required = false) MultipartFile portrait) throws IOException {
        return rs.registerPass(number, password, question, answer, iName, portrait);
    }

    /**
     * 实名认证
     * @param Imag
     * @param name
     * @param identity
     * @return
     * @throws IOException
     */
    @PostMapping("/realnameMessage")
    @ResponseBody
    public boolean realName(@RequestParam(name = "imag",required = false)MultipartFile Imag,
                            @RequestParam(name = "name",required = false)String name,
                            @RequestParam(name = "identity",required = false) String identity) throws IOException {
        return rs.realName(name,identity,Imag);
    }

    /**
     * 查找个人信息
     * @return
     */
    @PostMapping("/selectInformation")
    @ResponseBody
    public Information selectInformation(){
        return rs.selectInformationService();
    }



    /**
     * 修改个人信息
     * @param user_iname 昵称
     * @param user_stunum 学号
     * @param user_system 系别
     * @param user_class 班级
     * @return
     */
    @PostMapping("/modify")
    @ResponseBody
    public boolean ModifyInformation(@RequestParam(value = "iname",required=false)String user_iname,
                                     @RequestParam(value = "stunum",required=false) String user_stunum,
                                     @RequestParam(value = "system",required=false)String user_system,
                                     @RequestParam(value = "class",required=false)String user_class){

        return rs.modifyInformationService(user_iname,user_stunum,user_system,user_class);

    }

    /**
     * 教师姓名头像
     * @return
     */
    @GetMapping("/teacherInformationHead")
    @ResponseBody
    public List<teacherHead> teacherInformationHead(){
        return rs.teacherInformationHeadService();
    }

    /**
     * 教师端4个数字
     * @return
     */
    @GetMapping("/teacherHeadFourNum")
    @ResponseBody
    public List<Integer> teacherHeadFourNum(){
        return rs.teacherHeadFourNumService();
    }

    /**
     * 修改头像
     * @param avatar
     * @return
     */
    @PostMapping("/ModifyTheAvatar")
    @ResponseBody
    public String ModifyTheAvatar(@RequestParam(value = "avatar")MultipartFile avatar) throws IOException {
        return rs.ModifyTheAvatarService(avatar);
    }

    /**
     * 判断是否已经实名认证
     */
    @GetMapping("/RealNameAuthenticationSuccessful")
    @ResponseBody
    public boolean RealNameAuthenticationSuccessful(){
        return rs.RealNameAuthenticationSuccessfulService();
    }

}
