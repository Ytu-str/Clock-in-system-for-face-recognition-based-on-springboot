package edu.sdp.util;
import edu.sdp.dao.SignDao;
public class  MyRunnable implements Runnable{


    private Long time;
    private String id;

    public MyRunnable(Long time, String id) {
        this.time = time;
        this.id = id;

    }

    @Override
    public void run(){
        try {
            Thread.sleep(time);
            SignDao signDao= (SignDao)SpringBeanFactoryUtils.getBean("signDao");
            signDao.ChangeStatus(id);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

    }


}
