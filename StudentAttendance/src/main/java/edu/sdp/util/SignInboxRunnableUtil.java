package edu.sdp.util;
import java.util.List;

/**
 *
 * 老师发布签到，给学生发信息线程
 */
public class SignInboxRunnableUtil implements Runnable{

    private List list;  //学生id集合
    private String id;  //老师id
    private String content;//内容
    private String type;//类型


    public SignInboxRunnableUtil(List list,String id,String clsName){
        this.list=list;
        this.id=id;
        this.content=clsName+"正在考勤";
        this.type="考勤";
    }

    @Override
    public void run() {
        InboxUtil inboxUtil=(InboxUtil) SpringBeanFactoryUtils.getBean("inboxUtil");
       list.forEach(x->{
           if(!id.equals(x.toString())){
               inboxUtil.writeToInbox(id,x.toString(),content,type);
           }
       });

    }
}
