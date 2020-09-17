package edu.sdp.service.impl;

import edu.sdp.dao.SignDao;
import edu.sdp.pojo.Setingmodel;
import edu.sdp.service.SignService;
import edu.sdp.util.BaiduAIFace;
import edu.sdp.util.MyRunnable;
import edu.sdp.util.SignInboxRunnableUtil;
import edu.sdp.vo.PersonnelList;
import edu.sdp.vo.Sign;
import edu.sdp.vo.SignNum;
import edu.sdp.vo.SignTask;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import sun.misc.BASE64Encoder;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.sql.Time;
import java.sql.Timestamp;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class SignServiceImpl implements SignService {
    @Autowired
    private BaiduAIFace faceapi;

    @Autowired
    private SignDao signDao;

    @Autowired
    private HttpSession session;
    @Autowired
    private HttpServletRequest request;


    @Override
    public int signSuccess(Sign sign) {
        return signDao.signMapper(sign);
    }

    @Override
    public void deletSign(String user_id) {
        System.out.println(user_id);
        signDao.deletSignMapper(user_id);
    }

    @Override
    public boolean issueSignIn(String id,Long ti) {
        Timestamp timeStamp = new Timestamp(System.currentTimeMillis());
        String signId = UUID.randomUUID().toString().replace("-","").toUpperCase(); //签到任务的唯一标识
        session=request.getSession();
        session.setAttribute("signId",signId);
        String uuid=(String) session.getAttribute("uuid"); //老师的唯一标识
        SignTask signTask=new SignTask();
        signTask.setTsignUid(signId);
        signTask.setTsignClassId(id);
        signTask.setTsignStartDate(timeStamp);
        Calendar afterTime = Calendar.getInstance();
        afterTime.add(Calendar.MINUTE, Math.toIntExact(ti)); //结束时间
        Date afterDate = afterTime.getTime();
        Timestamp endTime = new Timestamp(afterDate.getTime());
        signTask.setTsignEndDate(endTime);
        signDao.issueSignInMapper(signTask);
        List list=signDao.joinClassStudentId(id);   //加入班级学生的id
        list.stream().filter(x->!x.toString().equals(uuid)).collect(Collectors.toList());
        String clsName=signDao.selectContent(id);
        SignInboxRunnableUtil signInboxRunnableUtil=new SignInboxRunnableUtil(list,uuid,clsName);
        Thread thread1 = new Thread(signInboxRunnableUtil);
        thread1.start();
        int num=0;
        for (Object l: list) {
            if (l.toString().equals(uuid)){
                continue;
            }
            num=signDao.addunsignMapper(signId,l.toString());
        }
        if (num!=0){
            Long time=ti*60*1000;
            MyRunnable myRunnable=new MyRunnable(time,signId);
            Thread thread = new Thread(myRunnable);
            thread.start();   //开启新的线程
            return true;
        }
        return false;
    }


    @Override
    public List<SignNum> signNumsService(){
        session = request.getSession();
        String id = (String) session.getAttribute("clsId");
        List<String> list = signDao.selecSevenTime(id); //查询最近七次任务的时间
        List<SignNum> listSignNum = new ArrayList();
        SignNum signNums;
        for (int i = 0; i < list.size(); i++) {
            String time = list.get(i);
            signNums = signDao.signNumMapper(id, time);
            signNums.setTime(time);
            listSignNum.add(signNums);
        }
        return listSignNum;
    }

    @Override
    public List<PersonnelList> PersonnelListServie() {
        session=request.getSession();
        String id=(String) session.getAttribute("clsId");
        return signDao.PersonnelListMapper(id);
    }

    @Override
    public List<SignTask> CheckInStatusService() {
        session=request.getSession();
        String id=(String) session.getAttribute("uuid");
        return signDao.CheckInStatusMapper(id);
    }


    public Map<String,Object> searchface(StringBuffer imagebase64) throws IOException {
        Setingmodel setingmodel=new Setingmodel();
        String substring = imagebase64.substring(imagebase64.indexOf(",")+1, imagebase64.length());
        setingmodel.setImgpath(substring);
        setingmodel.setGroupID("yq1466779249");
        Map map = faceapi.FaceSearch(setingmodel);
        return map;

    }

    @Override
    public Map<String, Object> registrationface(MultipartFile file, String user_id) throws IOException {
        BASE64Encoder base64Encoder =new BASE64Encoder();
        String base64EncoderImg = file.getOriginalFilename()+","+ base64Encoder.encode(file.getBytes());
        String substring = base64EncoderImg.substring(base64EncoderImg.indexOf(",")+1, base64EncoderImg.length());
        Setingmodel setingmodel=new Setingmodel();
        setingmodel.setGroupID("yq1466779249");
        setingmodel.setUserID(user_id);
        setingmodel.setImgpath(substring);
        Map map=faceapi.FaceRegistration(setingmodel);
        return map;
    }


}
