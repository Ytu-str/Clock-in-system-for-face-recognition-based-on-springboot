package edu.sdp.service.impl;

import edu.sdp.dao.LeaveDao;
import edu.sdp.service.LeaveService;
import edu.sdp.vo.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.List;

@Service
public class LeaveServiceImpl implements LeaveService {
    @Autowired
    private LeaveDao leaveDao;

    @Override
    public boolean leaveService(Leave leave) {
        int num=leaveDao.leaveMapper(leave);
        if (num!=0){
            return true;
        }
        return false;
    }

    @Override
    public Information searchStudent(String id) {
        return leaveDao.searchStudentMapper(id);
    }

    @Override
    public int writeToInboxService(Inbox inbox) {
        return leaveDao.writeToInboxServiceMapper(inbox);
    }

    @Override
    public List<LeaveInformation> studentLeaveInformationService(String id ,int num,int state) {
        int classNum=10;
        return leaveDao.studentLeaveInformationMapper(id,num,classNum,state);
    }

    @Override
    public int studentLeaveInformationNumService(String id,int state) {
        return leaveDao.studentLeaveInformationNumMapper(id,state);
    }

    @Override
    public boolean modifyLeaveStatusService(String id, String content, String state,String userId) {
        Leave leave = leaveDao.selectLeaveInforation(id);
        String teacherName = leaveDao.selecetTeacehrName(leave.getLeaveTeacher());
        if (content==null) {
            if (state.equals("1")) {
                int i=leaveDao.inbox(leave.getLeaveTeacher(),userId,new Timestamp(System.currentTimeMillis()),teacherName + "同意了你的请求",state,id,"请假");
                int l=leaveDao.ChangeLeaveStatusMapper(id,state,content);
                if (i!=0&&l!=0){
                    return true;
                }
                return false;
            }else if (state.equals("2")){
                int i=leaveDao.inbox(leave.getLeaveTeacher(),userId,new Timestamp(System.currentTimeMillis()),teacherName + "不同意你的请求","1",id,"请假");
                int l=leaveDao.ChangeLeaveStatusMapper(id,state,content);
                if (i!=0&&l!=0){
                    return true;
                }
            }
        } else{
            if (state.equals("1")) {
                int i=leaveDao.inbox(leave.getLeaveTeacher(),userId,new Timestamp(System.currentTimeMillis()),teacherName +"同意了你的请求:" + content,state,id,"请假");
                int l=leaveDao.ChangeLeaveStatusMapper(id,state,content);
                if (i!=0&&l!=0){
                    return true;
                }
                return false;
            }else if (state.equals("2")){
                int i=leaveDao.inbox(leave.getLeaveTeacher(),userId,new Timestamp(System.currentTimeMillis()),teacherName +"不同意你的请求:" + content,"1",id,"请假");
                int l=leaveDao.ChangeLeaveStatusMapper(id,state,content);
                if (i!=0&&l!=0){
                    return true;
                }
            }
        }
        return false;
    }

}
