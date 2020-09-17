package edu.sdp.controller;

import edu.sdp.service.LoginService;
import edu.sdp.service.SignService;
import edu.sdp.util.GsonUtils;
import edu.sdp.vo.PersonnelList;
import edu.sdp.vo.Sign;
import edu.sdp.vo.SignNum;
import edu.sdp.vo.SignTask;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.sql.Timestamp;
import java.text.ParseException;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/login")
@SessionAttributes(value = "useinf")
public class SignController {
    @Autowired
    private SignService signService;

    @Autowired
    private LoginService loginService;

    @RequestMapping("/searchface")
    @ResponseBody
    public  String searchface(@RequestBody @RequestParam(name = "imagebast64") StringBuffer imagebast64,
                              Model model, HttpServletRequest request,
                              @RequestParam(value = "taskId", required = false)String taskId) throws IOException {
        HttpSession session = request.getSession();
        Map<String, Object> searchface = signService.searchface(imagebast64);
        if(searchface==null||searchface.get("user_id")==null){
            String flag="fail";
            String s = GsonUtils.toJson(flag);
            return s;
        }
        String user_id = searchface.get("user_id").toString();
        String user_name=loginService.serachUserName(user_id);
        String score=searchface.get("score").toString().substring(0,2);
        int i = Integer.parseInt(score);
        if(i>80){
            Timestamp timeStamp = new Timestamp(System.currentTimeMillis());
            Sign sign=new Sign();
            sign.setSignId(user_id);
            sign.setSignName(user_name);
            sign.setSignTime(timeStamp);
            sign.setSclaId(taskId);
            signService.signSuccess(sign); //签到
            signService.deletSign(user_id);
            model.addAttribute("userinf",user_name);
            session.setAttribute("userinf",user_name);
        }
        String s = GsonUtils.toJson(searchface);
        return s;


    }
    @RequestMapping("/facesucceed")
    public String Faceloginsucceed(){
        return "client/student/succeed";
    }

    /**
     * 发布签到任务
     * @param id 课程唯一标识
     * @param
     * @return
     */
    @PostMapping("/issueSignIn")
    @ResponseBody
    public boolean issueSignIn(@RequestParam(value = "clsId",required = false) String id,
                               @RequestParam(value = "time",required = false)Long time){
        return signService.issueSignIn(id,time);
    }

    /**
     * 教师折线图，近七次签到情况
     *@param
     */
    @GetMapping("/signNums")
    @ResponseBody
    public List<SignNum> signNums() throws ParseException {
        return signService.signNumsService();
    }

    /**
     * 上次未签到学生信息
     * @return
     */
    @GetMapping("/PersonnelList")
    @ResponseBody
    public List<PersonnelList> PersonnelList(){
        return signService.PersonnelListServie();
    }

    /**
     * 查看那个课程需要签到
     * @return
     */
    @GetMapping("/CheckInStatus")
    @ResponseBody
    public List<SignTask> CheckInStatus(){
        return signService.CheckInStatusService();
    }
}
