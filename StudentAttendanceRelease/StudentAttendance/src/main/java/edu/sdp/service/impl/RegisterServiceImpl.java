package edu.sdp.service.impl;

import edu.sdp.dao.RegisterDao;
import edu.sdp.service.RegisterService;
import edu.sdp.service.SignService;
import edu.sdp.util.MultipartFileUtil;
import edu.sdp.util.ObsUtil;
import edu.sdp.vo.Information;
import edu.sdp.vo.teacherHead;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpSession;
import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Service
public class RegisterServiceImpl implements RegisterService {

    @Autowired
    private RegisterDao rd;

    @Autowired
    private HttpSession httpSession;

    @Autowired
    private SignService signService;

    /**
     * 注册
     *
     * @param number   账号
     * @param password 密码
     * @param question 密保问题
     * @param answer   密保答案
     * @param iName    昵称
     * @param portrait 头像网址
     * @return
     * @throws IOException
     */
    @Override
    public String registerPass(String number, String password, String question, String answer, String iName, MultipartFile portrait) throws IOException {
        String id = "";
        if (rd.registerNumber(number) == 1) {
            return "用户名已存在";
        } else {
            while (true) {
                id = UUID.randomUUID().toString().replace("-", "").toUpperCase();
                if (rd.repetitionUuid(id) == 0) {
                    break;
                }
            }
            File file = MultipartFileUtil.convertFile(portrait);
            if (file.length() < 5242880) {
                String suffix = file.getName().substring(file.getName().lastIndexOf(".")).toLowerCase();
                if (suffix.equals(".jpg") || suffix.equals(".png") || suffix.equals(".jpeg")) {
                    String uploadFileUrl = ObsUtil.obsUploadFiles("user_images", file, id + suffix);
                    //文件名字是唯一标识（还没改）
                    if (uploadFileUrl.equals("上传失败")) {
                        file.delete();
                        return "上传头像失败";
                    } else {
                        rd.registerPass(number, password, question, answer, iName, uploadFileUrl, id);
                        file.delete();
                        //上传失败
                        return "注册成功";
                    }
                } else {
                    file.delete();
                    return "头像仅支持jpg、png、jpeg";
                }
            } else {
                file.delete();
                return "头像最大值为5M，请不要超过";
            }
        }
    }

    /**
     * 实名认证
     *
     * @param name     姓名
     * @param Identity 身份证号
     * @param Imag     证件照
     * @return
     * @throws IOException
     */

    @Override
    public boolean realName(String name, String Identity, MultipartFile Imag) throws IOException {
        String id = (String) httpSession.getAttribute("uuid");
        Map map = signService.registrationface(Imag, id);
        int num = rd.realNameMapper(name, Identity, id);
        if (num != 0 && map.get("error_msg").equals("SUCCESS")) {
            return true;
        } else if (num != 0 && map.get("error_msg") != "SUCCESS") {
//            //删除数据库已注册的信息
//            signDao.deleteFail(id);
            return false;
        }
        return false;

    }

    @Override
    public boolean modifyInformationService(String user_iname, String user_stunum, String user_system, String user_class) {
        String id = (String) httpSession.getAttribute("uuid");
        int num = rd.modifyInformationMapper(user_iname, user_stunum, user_system, user_class, id);
        if (num != 0) {
            return true;
        }
        return false;
    }

    @Override
    public Information selectInformationService() {
        StringBuffer stringBufferName = new StringBuffer();
        StringBuffer stringBufferIdentity = new StringBuffer();
        String id = (String) httpSession.getAttribute("uuid");
        Information information = rd.selectInformationMapper(id);
        stringBufferName.append(information.getUserName());
        stringBufferName.replace(1, stringBufferName.length(), "*");
        stringBufferIdentity.append(information.getUserIdentity());
        stringBufferIdentity.replace(4, 14, "*");
        Information buffInformation = new Information();
        buffInformation.setUserName(stringBufferName.toString());
        buffInformation.setUserIdentity(stringBufferIdentity.toString());
        buffInformation.setUserClass(information.getUserClass());
        buffInformation.setUserStunum(information.getUserStunum());
        buffInformation.setUserSystem(information.getUserSystem());
        buffInformation.setUserIname(information.getUserIname());
        buffInformation.setUserNumber(information.getUserNumber());
        buffInformation.setUserPortrait(information.getUserPortrait());
        return buffInformation;
    }

    @Override
    public List<teacherHead> teacherInformationHeadService() {
        String id = (String) httpSession.getAttribute("uuid");
        return rd.teacherInformationHeadMapper(id);
    }

    @Override
    public List<Integer> teacherHeadFourNumService() {
        String id = (String) httpSession.getAttribute("uuid");
        int studentNum = rd.studentNum(id);
        int inboxNum = rd.inboxNum(id);
        int leaveNum = rd.leaveNum(id);
        int classNum = rd.classNum(id);
        List<Integer> list = new ArrayList<>();
        list.add(studentNum);
        list.add(inboxNum);
        list.add(leaveNum);
        list.add(classNum);
        return list;
    }

    @Override
    public String ModifyTheAvatarService(MultipartFile avatar) throws IOException {
        String id = (String) httpSession.getAttribute("uuid");
        File file = MultipartFileUtil.convertFile(avatar);
        if (file.length() < 5242880) {
            String suffix = file.getName().substring(file.getName().lastIndexOf(".")).toLowerCase();
            if (suffix.equals(".jpg") || suffix.equals(".png") || suffix.equals(".jpeg")) {
                String imageUrl = rd.findImageUrl(id);
                String imageUrlList[] = imageUrl.split("\\.");
                String imageSuffix = imageUrlList[imageUrlList.length - 1];
                ObsUtil.obsDeleteFiles(id + imageSuffix);
                String uploadFileUrl = ObsUtil.obsUploadFiles("user_images", file, id + suffix);
                System.out.println(uploadFileUrl);
                rd.ModifyTheAvatarMapper(uploadFileUrl,id);
                file.delete();
                return "更改成功，请稍后刷新";
            }
            return "上传图片不符合类型";
        }
        return "上传图片不得超过5M";
    }

    @Override
    public boolean RealNameAuthenticationSuccessfulService() {
        String id = (String) httpSession.getAttribute("uuid");
        if (rd.RealNameAuthenticationSuccessfulMapper(id)!=null){
            return true;
        }
        return false;
    }
}
