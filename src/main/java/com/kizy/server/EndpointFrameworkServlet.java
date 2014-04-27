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
        String path = request.getPathInfo();
        String extension = WebResources.getExtension(path);
        if (extension.isEmpty()) {
            PrintWriter out = response.getWriter();
            outputShim(out, path);
        } else if (WebResources.TEST_EXTENSIONS.contains(extension)) {
            PrintWriter out = response.getWriter();
            outputContents(request, path, out);
        } else if (WebResources.IMAGE_EXTENSIONS.contains(extension)) {
            outputImage(request, response, path);
        }
    }

    private void outputShim(PrintWriter out, String path) throws IOException {
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
        out.println(getBodyShim(parseTabNumber(path)));
        out.println("</body>");
        out.println("</html>");
    }

    private int parseTabNumber(String path) {
        if (path == null) {
            return 0;
        }
        Tab tab = Tab.fromName(path.substring(path.indexOf('/') + 1));
        if (tab == null) {
            return 0;
        }
        return tab.getTabNumber();
    }

    private String getBodyShim(int tabIndex) {
        return "<script>" +
                 "var tab_num = " + tabIndex + ";" +
                 "create_banner();" +
                 "create_tabs(tab_num);" +
                 "create_rant(tab_num);" +
                 "create_contender_space(tab_num);" +
                 "create_footer();" +
               "</script>";
    }

    private void outputContents(HttpServletRequest request, String path, PrintWriter out) throws IOException {
        URL url = request.getServletContext().getResource(path);
        out.println(Files.toString(getFile(url), Charsets.UTF_8));
    }

    private void outputImage(HttpServletRequest request, HttpServletResponse response, String path) throws IOException {
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
