package edu.sdp.vo.admin;

import lombok.Data;

import java.util.List;


/**
 * 系别
 */
@Data
public class Department {
    private String userUid; //系别id
    private String userSystem; //系别名称
    private List<Dclass> dclassList;
}
