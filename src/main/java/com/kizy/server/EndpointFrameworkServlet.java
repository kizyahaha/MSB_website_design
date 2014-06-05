package com.kizy.server;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.PrintWriter;
import java.net.URISyntaxException;
import java.net.URL;
import java.util.List;

import javax.servlet.ServletContext;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.context.ConfigurableWebApplicationContext;
import org.springframework.web.servlet.FrameworkServlet;

import com.google.common.base.Charsets;
import com.google.common.base.Strings;
import com.google.common.collect.ImmutableList;
import com.google.common.io.ByteStreams;
import com.google.common.io.Closeables;
import com.google.common.io.Files;
import com.kizy.web.WebResources;

public class EndpointFrameworkServlet extends FrameworkServlet {

    private static final long serialVersionUID = 1L;

    private static final List<String> styles = ImmutableList.of("banner.css",
                                                                "tabs.css",
                                                                "rant.css",
                                                                "contenders.css",
                                                                "power_graph.css",
                                                                "footer.css",
                                                                "main.css",
                                                                "log_in_sign_up.css",
                                                                "sign_up_form.css",
                                                                "sign_up_success.css",
                                                                "user_profile.css",
                                                                "user_tabs.css",
                                                                "user_tab_content.css",
                                                                "submit_rant.css",
                                                                "rant_view.css",
                                                                "my_items.css");

    private static final List<String> scripts = ImmutableList.of("jquery-1.11.1.min.js",
    															 "https://www.google.com/jsapi",
    															 "global_vars.js",
                                                                 "banner.js",
                                                                 "tabs.js",
                                                                 "rant.js",
                                                                 "contenders.js",
                                                                 "power_graph.js",
                                                                 "footer.js",
                                                                 "log_in_sign_up.js",
                                                                 "sign_up_form.js",
                                                                 "sign_up_success.js",
                                                                 "user_profile.js",
                                                                 "user_tabs.js",
                                                                 "user_tab_content.js",
                                                                 "submit_rant.js",
                                                                 "rant_view.js",
                                                                 "my_items.js");

    @Override
    protected void doService(HttpServletRequest request, HttpServletResponse response) throws Exception {
        String path = request.getPathInfo();
        String extension = WebResources.getExtension(path);
        if (extension.isEmpty()) {
            outputShim(request, response, path, null);
        } else if (extension.equalsIgnoreCase("html")) {
        	String body = Files.toString(new File("web/html" + path), Charsets.UTF_8);
        	outputShim(request, response, path, body);
        }
        else if (isContent(extension)) {
            outputContent(request, response, path);
        }
    }

    private static boolean isContent(String extension) {
        return WebResources.TEST_EXTENSIONS.contains(extension) ||
               WebResources.IMAGE_EXTENSIONS.contains(extension);
    }

    private static void outputShim(HttpServletRequest request, HttpServletResponse response, String path, String body) throws IOException {
        PrintWriter out = response.getWriter();
        out.println("<html lang=\"en-US\">");
        out.println("<head>");
        out.println("<title>MySoapBox</title>");
        for (String style : styles) {
            out.println("<link rel=\"stylesheet\" type=\"text/css\" href=\"styles/" + style + "\">");
        }
        for (int i=0 ; i<scripts.size(); i++) {
        	String script = scripts.get(i);
        	if (i==1) {
        		out.println("<script src=\"" + script + "\"></script>");
        	}
        	else {
        		out.println("<script src=\"scripts/" + script + "\"></script>");
        	}
        }
        out.println("</head>");
        out.println("<body>");
        out.println(Strings.isNullOrEmpty(body) ? getBodyShim(parseTabNumber(path)) : body);
        out.println("</body>");
        out.println("</html>");
    }

    private static int parseTabNumber(String path) {
        if (path == null) {
            return 0;
        }
        RantTab tab = RantTab.fromName(path.substring(path.indexOf('/') + 1));
        if (tab == null) {
            return 0;
        }
        return tab.getTabNumber();
    }

    private static String getBodyShim(int tabIndex) {
        return "<script>" +
                 "var tab_num = " + tabIndex + ";" +
                 "create_banner();" +
                 "create_tabs(tab_num);" +
                 "create_rant(tab_num);" +
                 "create_contender_space(tab_num);" +
                 "create_footer();" +
               "</script>";
    }

    private static void outputContent(HttpServletRequest request, HttpServletResponse response, String path) throws IOException {
        ServletContext servletContext = request.getServletContext();
        response.setContentType(servletContext.getMimeType(path));
        FileInputStream in = new FileInputStream(getFile(servletContext.getResource(path)));
        ServletOutputStream out = response.getOutputStream();
        ByteStreams.copy(in, out);
        Closeables.close(in, true);
        Closeables.close(out, true);
    }

    private static File getFile(URL url) {
        File file;
        try {
            file = new File(url.toURI());
        } catch (URISyntaxException e) {
            file = new File(url.getPath());
        }
        return file;
    }

    @Override
    protected void configureAndRefreshWebApplicationContext(ConfigurableWebApplicationContext context) {
        context.setConfigLocations(new String[0]);
        super.configureAndRefreshWebApplicationContext(context);
    }

}
