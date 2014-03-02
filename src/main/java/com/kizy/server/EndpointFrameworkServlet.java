package com.kizy.server;

import java.io.PrintWriter;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.context.ConfigurableWebApplicationContext;
import org.springframework.web.servlet.FrameworkServlet;

import com.google.common.collect.ImmutableList;

public class EndpointFrameworkServlet extends FrameworkServlet {

    private static final long serialVersionUID = 1L;

    private static final List<String> scripts = ImmutableList.of("scripts/jquery-1.11.0.min.js",
                                                                  "scripts/test.js");

    @Override
    protected void doService(HttpServletRequest request, HttpServletResponse response) throws Exception {
        PrintWriter out = response.getWriter();
        out.println("<html>");
        out.println("<head>");
        for (String script : scripts) {
            out.println("<script src=\"" + script + "\"></script>");
        }
        out.println("</head>");
        out.println("<body>");
        out.println("It shows up!");
        out.println("</body>");
        out.println("</html>");
    }

    @Override
    protected void configureAndRefreshWebApplicationContext(ConfigurableWebApplicationContext context) {
        context.setConfigLocations(new String[0]);
        super.configureAndRefreshWebApplicationContext(context);
    }

}
