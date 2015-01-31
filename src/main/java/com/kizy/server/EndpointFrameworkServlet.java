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
import com.kizy.data.rant.RantLevel;
import com.kizy.web.WebResources;

public class EndpointFrameworkServlet extends FrameworkServlet {

    private static final long serialVersionUID = 1L;

    private static final List<String> styles = ImmutableList.of("banner.css",
                                                                "level_tabs.css",
                                                                "level_rant.css",
                                                                "click_animations.css",
                                                                "rant_preview.css",
                                                                "page_navigation.css",
                                                                "contenders.css",
                                                                "level_power_graph.css",
                                                                "terms_of_use.css",
                                                                "copyright.css",
                                                                "privacy_policy.css",
                                                                "footer.css",
                                                                "main.css",
                                                                "log_in_sign_up.css",
                                                                "sign_up_form.css",
                                                                "user_profile.css",
                                                                "user_tabs.css",
                                                                "user_activity.css",
                                                                "user_rants.css",
                                                                "user_preference.css",
                                                                "user_account_info.css",
                                                                "user_info.css",
                                                                "submit_rant.css",
                                                                "rant_view.css",
                                                                "user_items.css",
                                                                "FAQ.css",
                                                                "error_page.css",
                                                                "utility.css");

    private static final List<String> scripts = ImmutableList.of("jquery-1.11.1.min.js",
    															 "underscore-1.7.0.js",
    															 "backbone-1.1.2.js",
    															 "validator-3.22.2.js",
                                                                 "google_charts.js",
                                                                 "utility.js",
                                                                 "global_vars.js",
                                                                 "click_animations.js",
                                                                 "terms_of_use.js",
                                                                 "copyright.js",
                                                                 "privacy_policy.js",
                                                                 "banner.js",
                                                                 "level_tabs.js",
                                                                 "vote_buttons.js",
                                                                 "rant_preview.js",
                                                                 "level_rant.js",
                                                                 "page_navigation.js",
                                                                 "contenders.js",
                                                                 "level_power_graph.js",
                                                                 "footer.js",
                                                                 "log_in_sign_up.js",
                                                                 "sign_up_form.js",
                                                                 "user_profile.js",
                                                                 "user_tabs.js",
                                                                 "user_rants.js",
                                                                 "user_activity.js",
                                                                 "user_preference.js",
                                                                 "user_account_info.js",
                                                                 "user_info.js",
                                                                 "submit_rant.js",
                                                                 "rant_view.js",
                                                                 "user_items.js",
                                                                 "FAQ.js",
                                                                 "error_page.js");

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
        return WebResources.TEXT_EXTENSIONS.contains(extension) ||
               WebResources.IMAGE_EXTENSIONS.contains(extension) ||
               WebResources.AUDIO_EXTENSIONS.contains(extension);
    }

    private static void outputShim(HttpServletRequest request, HttpServletResponse response, String path, String body) throws IOException {
        PrintWriter out = response.getWriter();
        out.println("<!DOCTYPE html>");
        out.println("<html lang=\"en-US\">");
        out.println("<head>");
        //out.println("<link rel='shortcut icon' href='images/favicon.ico' type='image/x-icon'/>");
        out.println("<link href='data:image/x-icon;base64,AAABAAEAEBAAAAEAIAAoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA0NDT/NDQ0/zQ0NP80NDT/NDQ0/zQ0NP80NDT/NDQ0/zQ0NP80NDT/NDQ0/zQ0NP80NDT/NDQ0/zQ0NP80NDT/NDQ0/zQ0NP80NDT/NDQ0/zQ0NP80NDT/NDQ0/7+/v/6/v7/+NDQ0/zQ0NP80NDT/NDQ0/zQ0NP80NDT/NDQ0/zQ0NP80NDT/NDQ0/zQ0NP+/v7/+v7+//jQ0NP///////////zQ0NP+/v7/+v7+//jQ0NP80NDT/NDQ0/zQ0NP80NDT/v7+//r+/v/40NDT///////////80NDT///////////80NDT///////////80NDT/v7+//r+/v/40NDT/NDQ0////////////NDQ0////////////NDQ0////////////NDQ0////////////NDQ0////////////NDQ0/zQ0NP///////////zQ0NP///////////zQ0NP///////////zQ0NP///////////zQ0NP///////////zQ0NP80NDT///////////80NDT///////////80NDT///////////80NDT///////////80NDT///////////80NDT/NDQ0////////////NDQ0////////////NDQ0////////////NDQ0////////////NDQ0////////////NDQ0/zQ0NP///////////zQ0NP///////////zQ0NP+/v7/+v7+//jQ0NP///////////zQ0NP///////////zQ0NP80NDT///////////80NDT/v7+//r+/v/40NDT/v7+//tHR0f5DQ0P9v7+//r+/v/40NDT///////////80NDT/NDQ0/7+/v/6/v7/+NDQ0/7+/v/7R0dH+Q0ND/TQ0NP+srKz9+vr6/urq6v59fX39NDQ0/7+/v/6/v7/+NDQ0/zQ0NP+/v7/+0dHR/kNDQ/00NDT/rKys/fr6+v7q6ur+fX19/TQ0NP99fX396urq/vr6+v6srKz9NDQ0/zQ0NP80NDT/NDQ0/6ysrP36+vr+6urq/n19ff00NDT/fX19/erq6v76+vr+rKys/TQ0NP9DQ0P90dHR/r+/v/40NDT/NDQ0/zQ0NP80NDT/NDQ0/319ff3q6ur++vr6/qysrP00NDT/Q0ND/dHR0f6/v7/+NDQ0/zQ0NP80NDT/NDQ0/zQ0NP80NDT/NDQ0/zQ0NP80NDT/NDQ0/0NDQ/3R0dH+v7+//jQ0NP80NDT/NDQ0/zQ0NP80NDT/NDQ0/zQ0NP80NDT/ NDQ0/zQ0NP80NDT/NDQ0/zQ0NP80NDT/NDQ0/zQ0NP80NDT/NDQ0/zQ0NP80NDT/NDQ0/zQ0NP80NDT/' rel='icon' type='image/x-icon'/>");
        out.println("<title>MySoapBox</title>");
        out.println("<link href='http://fonts.googleapis.com/css?family=Lato:400,700' rel='stylesheet' type='text/css'>");
        out.println("<link href='http://fonts.googleapis.com/css?family=Montserrat:400,700' rel='stylesheet' type='text/css'>");
        out.println("<script src='http://js.nicedit.com/nicEdit-latest.js' type='text/javascript'></script>");
        for (String style : styles) {
            out.println("<link rel=\"stylesheet\" type=\"text/css\" href=\"styles/" + style + "\">");
        }
        for (String script : scripts) {
            out.println("<script src=\"scripts/" + script + "\"></script>");
        }
        out.println("</head>");
        out.println("<body>");
        out.println(Strings.isNullOrEmpty(body) ? getBodyShim(parseTabNumber(path)) : body);
        out.println("<noscript>");
        out.println("<div id=\"noscript_message\">This entire site is written in javascript.  Please enable it!</div>");
        out.println("<img id=\"noscript_logo\" src=\"images/SoapBox2.png\"></img>");
        out.println("<img id=\"noscript_character\" src=\"images/character_20.png\"></img>");
        out.println("</noscript>");
        out.println("</body>");
        out.println("</html>");
    }

    private static int parseTabNumber(String path) {
        if (path == null) {
            return 0;
        }
        RantLevel tab = RantLevel.fromName(path.substring(path.indexOf('/') + 1));
        if (tab == null) {
            return 0;
        }
        return tab.getTabNumber();
    }

    private static String getBodyShim(int tabIndex) {
        return "<script>" +
                 "create_banner();" +
                 "create_tabs();" +
                 "create_rant();" +
                 "create_contender_space();" +
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
