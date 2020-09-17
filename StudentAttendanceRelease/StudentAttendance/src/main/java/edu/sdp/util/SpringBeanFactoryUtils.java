package edu.sdp.util;

import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.stereotype.Component;

@Component
public class SpringBeanFactoryUtils implements ApplicationContextAware {
    private static ApplicationContext appCtx;
    @Override
    public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
        appCtx=applicationContext;
    }

    public static Object getBean(String beanName) {
        return appCtx.getBean(beanName);
    }
}
