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

    private static final List<String> styles = ImmutableList.of("banner.css",
                                                                "tabs.css",
                                                                "rant.css",
                                                                "contenders.css",
                                                                "power_graph.css",
                                                                "footer.css",
                                                                "main.css");

    private static final List<String> scripts = ImmutableList.of("jquery-1.11.0.min.js",
                                                                 "banner.js",
                                                                 "tabs.js",
                                                                 "rant.js",
                                                                 "contenders.js",
                                                                 "power_graph.js",
                                                                 "footer.js");

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
        out.println(getBody());
        out.println("</body>");
        out.println("</html>");
    }

    private String getBody() {
        return "<script>" +
                 "var tab_num = 0;" +
                 "create_banner();" +
                 "create_tabs(tab_num);" +
                 "create_rant(tab_num);" +
                 "create_contender_space(tab_num);" +
                 "create_footer();" +
               "</script>";
    }

    @Override
    protected void configureAndRefreshWebApplicationContext(ConfigurableWebApplicationContext context) {
        context.setConfigLocations(new String[0]);
        super.configureAndRefreshWebApplicationContext(context);
    }

}
