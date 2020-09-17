package edu.sdp.util;


import edu.sdp.pojo.Setingmodel;

import org.springframework.stereotype.Component;
import java.io.IOException;

import java.util.HashMap;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;


/**
 * 封装api
 */
@Component
public class BaiduAIFace {
    private static String token = GetToken.getAuth();
    /**
     * 人脸注册
     */
    public Map FaceRegistration(Setingmodel facaddseting) throws IOException {
        String url = "https://aip.baidubce.com/rest/2.0/face/v3/faceset/user/add";
        Map resultmap = FaceAddAndUpdate(facaddseting, url);
        return resultmap;

    }
    private Map FaceAddAndUpdate(Setingmodel facaddseting, String url) throws IOException {
        Map<String, Object> map=new HashMap<>();
        try {
            map.put("image", facaddseting.getImgpath());
            map.put("group_id", facaddseting.getGroupID());
            map.put("user_id", facaddseting.getUserID());
            map.put("liveness_control", facaddseting.getLiveness_Control());
            map.put("image_type", facaddseting.getImage_Type());
            map.put("quality_control", facaddseting.getQuality_Control());
            String param = GsonUtils.toJson(map);
            String result = HttpUtil.post(url, token, "application/json", param);
            Map resultmap = GsonUtils.fromJson(result, Map.class);
            return resultmap;
        } catch (Exception e) {
            System.out.println("失败");
            e.printStackTrace();
        }
        return null;
    }



    /**
     * 人脸查找
     * @return
     */
    public Map FaceSearch(Setingmodel setingmodel) throws IOException {
        String url = "https://aip.baidubce.com/rest/2.0/face/v3/search";
        try {
            Map<String, Object> map = new HashMap<>();
            map.put("image", setingmodel.getImgpath());
            map.put("liveness_control", setingmodel.getLiveness_Control());
            map.put("group_id_list", setingmodel.getGroupID());
            map.put("image_type", setingmodel.getImage_Type());
            map.put("quality_control", setingmodel.getQuality_Control());
            String param = GsonUtils.toJson(map);
            String result = HttpUtil.post(url, token, "application/json", param);
            Map<String,Object> resultmaps = GsonUtils.fromJson(result, Map.class);
            System.out.println("cuowudaima"+resultmaps.get("error_code"));
            if(!resultmaps.get("error_code").toString().equals("222202.0")){
                String resultlist = resultmaps.get("result").toString();
                String substring = resultlist.substring(1, resultlist.length() - 1);
                String regEx="[\n`~!@#$%^&*()+|{}':;'\\[\\].<>/?~！@#￥%……&*（）——+|{}【】‘；：”“’。， 、？]";
                String aa = "";
                Pattern p = Pattern.compile(regEx);
                Matcher m = p.matcher(substring);//这里把想要替换的字符串传进来
                String newString = m.replaceAll(aa).trim();
                String[] split = newString.split(",");
                split[1]=split[1].substring(10, split[1].length());
                String face_token=split[0].substring(11,split[0].length());
                String group_id=split[1].substring(9,split[1].length());
                String user_id=split[2].substring(8,split[2].length());
                String user_info=split[3].substring(10,split[3].length());
                String score=split[4].substring(6,split[4].length());
                System.out.println(face_token);
                resultmaps.put("face_token",face_token);
                resultmaps.put("group_id",group_id);
                resultmaps.put("user_id",user_id);
                resultmaps.put("user_info",user_info);
                resultmaps.put("score",score);
                return resultmaps;

            }else {
                System.out.println("失败分支");
                return resultmaps;
            }

        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }
}
