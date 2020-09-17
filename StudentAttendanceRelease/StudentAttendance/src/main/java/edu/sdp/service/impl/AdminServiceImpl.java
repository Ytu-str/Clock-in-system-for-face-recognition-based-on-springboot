package edu.sdp.service.impl;

import edu.sdp.dao.AdminDao;
import edu.sdp.service.AdminService;
import edu.sdp.util.InboxUtil;
import edu.sdp.vo.LeaveInformation;
import edu.sdp.vo.TeacherClass;
import edu.sdp.vo.admin.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.sql.Timestamp;
import java.util.*;
import java.util.stream.Collectors;


@Service
public class AdminServiceImpl implements AdminService {

    @Autowired
    private AdminDao adminDao;

    @Autowired
    private InboxUtil inboxUtil;

    @Autowired
    private JavaMailSenderImpl javaMailSender;

    @Override
    public List<Department> selectSystemService() {
        List<Department> list= adminDao.selectSystemMapper();
        return  list.stream().filter(x ->!x.getUserUid().equals("55555")).filter(y->!y.getUserUid().equals( "44444")).collect(Collectors.toList());
    }

    @Override
    public List<Dclass> selectClassService(String userUid) {
        return adminDao.selectClassMapper(userUid);
    }

    @Override
    public Map selectUserInformationService(String userName, String userType, String userSystem, String userClass, int num) {
        int classNum=10;
        int countNum=adminDao.selectNumMapper(userName,userType,userSystem,userClass);
        List<AdminUser> list=adminDao.selectUserInformationMapper(userName,userType,userSystem,userClass,num,classNum);
        Map map=new HashMap();
        map.put("list",list);
        map.put("countNum",countNum);
        return map;
    }

    @Override
    public boolean createUserService(String userNumber, String userPass, String userJion, String userStunum, String userSystem, String userClass, String userQues, String userAnswer) {
        String userId = UUID.randomUUID().toString().replace("-","").toUpperCase();
        String userPortrait="4.myhuaweicloud.com/user_images/6221F4DEA98E4E75A06377517B3EF779.png";
        if (userJion.equals("2")){
            userSystem = "55555";
            userClass = "5432";
        }
        if (userJion.equals("1")){
            userSystem = "44444";
            userClass = "5431";
        }
        return adminDao.createUserMapper(userNumber,userPass,userJion,userStunum,userSystem,userClass,userQues,userAnswer,userId,userPortrait);
    }

    @Override
    public void delectUserService(List<String> list) {
        list.forEach(x->{
            adminDao.delectUserMapper(x);
        });

    }

    @Override
    public boolean updateUserService(AdminUser adminUser) {
        return adminDao.updateUserMapper(adminUser);
    }

    @Override
    public Map searchTeacherClassService(String className, String teacherName, int num) {
        int classNum=10;
        List<TeacherClass> list=adminDao.searchTeacherClassMapper(className,teacherName,num,classNum);
        int teacherClassNum=adminDao.selectTeacherClassNumMapper(className,teacherName);
        Map map=new HashMap();
        map.put("list",list);
        map.put("countNum",teacherClassNum);
        return map;
    }

    @Override
    public List<Teacher> selectTeacherService() {
        return adminDao.selectTeacherMapper();
    }

    @Override
    public boolean adminInsertCurriculum(String clsName, String cls, String clsAscription) {
        String clsId = UUID.randomUUID().toString().replace("-","").toUpperCase();
        Timestamp timeStamp = new Timestamp(System.currentTimeMillis());
        String clsPhoto="https://studentattendance.obs.cn-north-4.myhuaweicloud.com/cls_images/C194022C3586456AB076304E5DE1ECCD.png";
        adminDao.adminInsertMyclass(clsAscription,clsId);
        return adminDao.adminInsertCurriculumMapper(clsName,cls,clsAscription,clsId,timeStamp,clsPhoto);
    }

    @Override
    public void adminDeleteCurriculumService(ArrayList clsIdList) {
        clsIdList.forEach(x -> {
            adminDao.adminDeleteCurriculumMapper(x.toString());
            adminDao.adminDeleteMyclassMapper(x.toString());
        });
    }

    @Override
    public boolean adminUpdateCurriculumService(String clsName, String cls, String clsAscription, String clsId) {
        return adminDao.adminUpdateCurriculumMapper(clsName,cls,clsAscription,clsId);
    }

    @Override
    public Map adminLeaveInformationService(String clsSystem, String className, String userName, int num) {
        int classNum=10;
        List<LeaveInformation> leaveInformation=adminDao.adminLeaveInformationMapper(clsSystem,className,userName,num,classNum);
        leaveInformation.forEach(x->{
            x.setTeacherName(adminDao.selectLeaveTeacherName(x.getLeaveTeacher()));
           });
        int leaveNum=adminDao.adminLeaveInformationNumMapper(clsSystem,className,userName);
        Map map=new HashMap();
        map.put("list",leaveInformation);
        map.put("leaveNum",leaveNum);
        return map;
    }

    @Override
    public void adminDeleteLeaveInformationService(ArrayList<String> leaveList) {
        leaveList.forEach(x->{
            adminDao.adminDeleteLeaveInformationMapper(x);
        });
    }

    @Override
    public boolean adminUpdateLeaveInformationService(String state, String content,String leaveId,String userId,String leaveTeacher,String leaveType) {
        int l=adminDao.adminUpdateLeaveInformationMapper(state,content,leaveId);
        int m=inboxUtil.writeToInbox(leaveTeacher,userId,content,leaveType);
        if (l!=0&&m!=0){
            return true;
        }
        return false;
    }

    @Override
    public Map adminSelectSystemAndClass(int num, String system, String dclass) {
        int classNum=10;
        List<Department> departmentList=adminDao.adminSelectSystemAndClassMapper(num,classNum,system,dclass);
        List<Department> list=departmentList.stream().filter(x->!x.getUserUid().equals("55555")).filter(x->!x.getUserUid().equals("44444")).collect(Collectors.toList());
        int departmentNum=adminDao.adminSelectSystemAndClassNumMapper(system,dclass);
        Map map=new HashMap();
        map.put("list",list);
        map.put("num",departmentNum);
        return map;
    }

    @Override
    public boolean adminUpdateBeLongToSystemService(String system, String dclass) {
        return adminDao.adminUpdateBeLongToSystemMapper(system,dclass);
    }

    @Override
    public boolean adminInsertSystemService(String systemName) {
        String systemId = UUID.randomUUID().toString().replace("-","").toUpperCase();
        return adminDao.adminInsertSystemMapper(systemName,systemId);
    }

    @Override
    public boolean adminInsertClassService(String className, String systemId) {
        String classId = UUID.randomUUID().toString().replace("-","").toUpperCase();
        return adminDao.adminInsertClassMapper(className,classId,systemId);
    }

    @Override
    public void adminDeleteSystemPerhapsClassService(ArrayList systemList, ArrayList classList) {
        if (systemList!=null){
            systemList.forEach(x->{
                adminDao.deleteSystemMapper(x.toString());
                adminDao.deleteSystemOnClassMapper(x.toString());
            });
        }
        if (classList!=null){
            classList.forEach(x->{
                adminDao.delectClassMapper(x.toString());
            });
        }
    }

    @Override
    public List<Integer> adminIndexIntInformationService() {
        int userNum=adminDao.selectUserNum();
        int currNum=adminDao.selectCurrNum();
        int signNum=adminDao.selectSignNum();
        int departmentNum=adminDao.selectDepartNum();
        List<Integer> list=new ArrayList<>();
        list.add(userNum);
        list.add(currNum);
        list.add(signNum);
        list.add(departmentNum);
        return list;
    }

    @Override
    public boolean adminSendMailService(String content) throws MessagingException {
        sendMail(true,"建议",content);
        return true;
    }

    public void sendMail(boolean html,String subject,String text) throws MessagingException {
        MimeMessage mimeMessage = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage,html);
        helper.setSubject(subject);
        helper.setText(text,true);
        helper.setTo("1466779249@qq.com");
        helper.setFrom("1466779249@qq.com");
        javaMailSender.send(mimeMessage);
    }

    @Override
    public boolean adminInsertNoticeService(String content) {
        String noticeId = UUID.randomUUID().toString().replace("-","").toUpperCase();
        Timestamp timeStamp = new Timestamp(System.currentTimeMillis());//创建时间
        return adminDao.adminInsertNoticeMapper(content,noticeId,timeStamp);
    }

    @Override
    public Map adminSelectNoticeService(String content,int num) {
        int classNum=10;
        List<Notice> list=adminDao.adminSelectNoticeMapper(content,num,classNum);
        int noticeNum=adminDao.selectNoticeNum(content);
        Map map=new HashMap();
        map.put("list",list);
        map.put("num",noticeNum);
        return map;
    }

    @Override
    public List<Notice> teacherAndStudentNoticeService() {
        return adminDao.teacherAndStudentNoticeMapper();
    }

    @Override
    public void adminDeleteNoticeService(ArrayList list) {
        list.forEach(x->{
            adminDao.adminDeleteNoticeMapper(x.toString());
        });
    }

    @Override
    public boolean adminUpdateService(String content,String noticeId) {
        return adminDao.adminUpdateMapper(content,noticeId);
    }

}
