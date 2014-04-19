package com.kizy.server;

import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.context.ConfigurableWebApplicationContext;
import org.springframework.web.servlet.FrameworkServlet;

import com.google.common.base.Charsets;
import com.google.common.collect.ImmutableList;
import com.google.common.io.Files;

public class EndpointFrameworkServlet extends FrameworkServlet {

    private static final long serialVersionUID = 1L;

    private static final List<String> styles = ImmutableList.of("MySoapBox_4.css",
                                                                "FAQ.css");

    private static final List<String> scripts = ImmutableList.of("jquery-1.11.0.min.js",
                                                                 "General_Practice_4.js",
                                                                 "randInterval.js");

    @Override
    protected void doService(HttpServletRequest request, HttpServletResponse response) throws Exception {
        PrintWriter out = response.getWriter();
        out.println("<html lang=\"en-US\">");
        out.println("<head>");
        out.println("<title>MySoapBox</title>");
        for (String style : styles) {
            out.println("<link rel=\"stylesheet\" type=\"text/css\" href=\"styles/" + style + "\">");
        }
        for (String script : scripts) {
            out.println("<script src=\"scripts/" + script + "\"></script>");
        }
        out.println("</head>");
        out.println("<body>");
        out.println(getContents("web/html/MySoapBox_Test_4_tab1.html"));
        out.println("</body>");
        out.println("</html>");
    }

    @Override
    protected void configureAndRefreshWebApplicationContext(ConfigurableWebApplicationContext context) {
        context.setConfigLocations(new String[0]);
        super.configureAndRefreshWebApplicationContext(context);
    }

    private String getContents(String path) throws IOException {
        return Files.toString(new File(path), Charsets.UTF_8);
    }

}
