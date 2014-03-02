package com.kizy.server.prefs;

import org.springframework.web.context.support.XmlWebApplicationContext;

public class ApplicationContext extends XmlWebApplicationContext {

    @Override
    public String[] getConfigLocations() {
        return new String[] {"classpath:com/kizy/server/prefs/applicationContext.xml"};
    }
}
