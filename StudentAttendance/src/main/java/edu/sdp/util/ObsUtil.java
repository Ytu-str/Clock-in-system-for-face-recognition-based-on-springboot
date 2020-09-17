package edu.sdp.util;

import com.obs.services.ObsClient;
import com.obs.services.model.AccessControlList;
import com.obs.services.model.PutObjectRequest;

import java.io.File;
import java.io.IOException;

public class ObsUtil {

    public static String ak = "N2ZPEZADARXRBZJAQZTA";
    public static String sk = "wqbCfEVYp3yaqJ9h5UOeFoIJa1DS1xeMiyB6voI2";

    /**
     * 为上传文件设置访问属性为公共读
     * @param file 文件
     * @param keySuffixWithSlash 文件路径
     * @param fileName 文件名字
     * @return
     */
    public static PutObjectRequest publicReadFile(File file, String keySuffixWithSlash, String fileName) {
        PutObjectRequest request = new PutObjectRequest();
        request.setBucketName("studentattendance");
        request.setObjectKey(keySuffixWithSlash + "/" + fileName);
        request.setFile(file);
        request.setAcl(AccessControlList.REST_CANNED_PUBLIC_READ);
        return request;
    }
    /**
     * 上传到obs
     * @param keySuffixWithSlash 路径
     * @param file 文件
     * @param fileName 文件名称
     * @throws IOException .
     * @return 是否成功
     */
    public static String obsUploadFiles(String keySuffixWithSlash, File file, String fileName) throws IOException {
        String endPoint = "https://obs.cn-north-4.myhuaweicloud.com";
        // 创建ObsClient实例
        ObsClient obsClient = new ObsClient(ak, sk, endPoint);
        try {
            obsClient.putObject(ObsUtil.publicReadFile(file, keySuffixWithSlash, fileName));
            obsClient.close();
            return "https://studentattendance.obs.cn-north-4.myhuaweicloud.com/" + keySuffixWithSlash + "/" + fileName;
        } catch (Exception e) {
            e.getMessage();
            System.out.println(e.getMessage());
            return "上传失败";
        }
    }

    /**
     * 删除
     * @param fileName
     * @return
     * @throws IOException
     */
    public static String obsDeleteFiles(String fileName) throws IOException {
        String endPoint = "https://obs.cn-north-4.myhuaweicloud.com";
        // 创建ObsClient实例
        ObsClient obsClient = new ObsClient(ak, sk, endPoint);
        try {
            obsClient.deleteObject("user_images", fileName);
            obsClient.close();
            return "删除成功";
        } catch (Exception e) {
            e.getMessage();
            System.out.println(e.getMessage());
            return "删除失败";
        }
    }
}
