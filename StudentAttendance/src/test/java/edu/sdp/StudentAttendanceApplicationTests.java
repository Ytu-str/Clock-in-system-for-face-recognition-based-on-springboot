package edu.sdp;

import edu.sdp.service.LoginService;
import edu.sdp.service.SignService;
import lombok.experimental.Accessors;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class StudentAttendanceApplicationTests {
    @Autowired
    private LoginService loginService;
    @Test
    void contextLoads() {
        System.out.println("111");
    }

}
