package edu.sdp.service.impl;

import edu.sdp.dao.CurriculumDao;
import edu.sdp.service.CurriculumService;

import edu.sdp.util.MultipartFileUtil;
import edu.sdp.util.ObsUtil;
import edu.sdp.vo.ExportData;
import edu.sdp.vo.StudentClass;
import edu.sdp.vo.TeacherClass;


import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFRichTextString;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.File;
import java.io.IOException;
import java.io.OutputStream;
import java.sql.Timestamp;
import java.util.List;
import java.util.UUID;


@Service
public class CurriculumServiceImpl implements CurriculumService {
    @Autowired
    private HttpSession session;
    @Autowired
    private HttpServletRequest request;

    @Autowired
    private CurriculumDao curriculumDao;

    @Override
    public List<StudentClass> SearchClass(String stu_id, int num) {
        int classNum = 6;
        List<StudentClass> list = curriculumDao.SearchClassMapper(stu_id, num, classNum);
        return list;
    }

    @Override
    public boolean joinClassService(String cls_id, String id) {
        int num = curriculumDao.joinClassMapper(cls_id, id);
        if (num != 0) {
            return true;
        }
        return false;
    }

    @Override
    public List<TeacherClass> searchTeacherClass(String id, int num) {
        int classNum = 12;
        return curriculumDao.SearchTeacherClassMapper(id, num, classNum);
    }

    @Override
    public int existenceClass(String cls_id, String id) {
        return curriculumDao.existenceClassMapper(cls_id, id);
    }

    @Override
    public int selectIsThereAnyClass(String cls_id) {
        return curriculumDao.selectIsThereAnyClassMapper(cls_id);
    }

    @Override
    public TeacherClass searchTeacherClassInformation(String id) {
        return curriculumDao.searchTeacherClassInformationMapper(id);
    }

    @Override
    public int classNumCountService() {
        session = request.getSession();
        String id = (String) session.getAttribute("uuid");
        return curriculumDao.classNumCountMapper(id);
    }

    @Override
    public boolean creatingCoursesService(String name, String cls, MultipartFile clsPhoto) throws IOException {
        session = request.getSession();
        String id = (String) session.getAttribute("uuid");  //创建人唯一标识
        String clsId = UUID.randomUUID().toString().replace("-","").toUpperCase(); //班级唯一标识
        Timestamp timeStamp = new Timestamp(System.currentTimeMillis());//创建时间
        String photoUrl=obtainURL(clsPhoto,clsId);
        curriculumDao.insterMyclass(id,clsId);
        if (photoUrl=="1"){
            return false;
        }
        return curriculumDao.creatingCoursesMapper(name,cls,id,clsId,timeStamp,photoUrl);
    }

    private String obtainURL(MultipartFile clsPhoto,String clsId) throws IOException {
        File file = MultipartFileUtil.convertFile(clsPhoto);
        if (file.length() < 5242880) {
            String suffix = file.getName().substring(file.getName().lastIndexOf(".")).toLowerCase();
            String uploadFileUrl = ObsUtil.obsUploadFiles("cls_images", file, clsId + suffix);
            file.delete();
            return uploadFileUrl;
        }
        return "1";
    }

    @Override
    public void exportDataService(HttpServletResponse response,String id) {
        String clsName=curriculumDao.selectClsName(id);
        List<ExportData> list = curriculumDao.exportDataMapper(id);
        exportData(list, response,clsName);
    }


    private void exportData(List<ExportData> list, HttpServletResponse response,String clsName) {
        HSSFWorkbook workbook = new HSSFWorkbook();
        HSSFSheet sheet = workbook.createSheet();
        int rowNum = 0;
        String[] headers = {"姓名", "学号", "班级", "时间"};
        HSSFRow row = sheet.createRow(rowNum);
        for (int i = 0; i < headers.length; i++) {
            HSSFCell cell = row.createCell(i);
            HSSFRichTextString text = new HSSFRichTextString(headers[i]);
            cell.setCellValue(text);
        }
        for (ExportData l : list) {
            rowNum++;
            HSSFRow row1 = sheet.createRow(rowNum);
            row1.createCell(0).setCellValue(l.getUserName());
            row1.createCell(1).setCellValue(l.getUserStunum());
            row1.createCell(2).setCellValue(l.getUserSystem());
            row1.createCell(3).setCellValue(l.getUserClass());
            row1.createCell(4).setCellValue(l.getTime());
        }
        if (workbook != null) {
            try {
                String fileName = clsName+"未签到名单" + ".xls";
                String downloadFileName = new String(fileName.getBytes("UTF-8"), "iso-8859-1");
                String headStr = "attachment; filename=\"" + downloadFileName + "\"";
                response.setContentType("APPLICATION/OCTET-STREAM");
                response.setHeader("Content-Disposition", headStr);
                OutputStream out = response.getOutputStream();
                workbook.write(out);
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
}
