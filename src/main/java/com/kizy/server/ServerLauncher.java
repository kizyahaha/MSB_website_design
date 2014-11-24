package com.kizy.server;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

import javax.servlet.Filter;
import javax.servlet.MultipartConfigElement;
import javax.servlet.Servlet;

import org.eclipse.jetty.server.Connector;
import org.eclipse.jetty.server.Handler;
import org.eclipse.jetty.server.Server;
import org.eclipse.jetty.server.ServerConnector;
import org.eclipse.jetty.server.handler.HandlerCollection;
import org.eclipse.jetty.server.session.AbstractSessionManager;
import org.eclipse.jetty.servlet.DefaultServlet;
import org.eclipse.jetty.servlet.FilterHolder;
import org.eclipse.jetty.servlet.FilterMapping;
import org.eclipse.jetty.servlet.ServletHandler;
import org.eclipse.jetty.servlet.ServletHolder;
import org.eclipse.jetty.servlets.GzipFilter;
import org.eclipse.jetty.util.thread.QueuedThreadPool;
import org.eclipse.jetty.webapp.WebAppContext;
import org.springframework.web.context.ContextLoaderListener;
import org.springframework.web.servlet.DispatcherServlet;
import org.tuckey.web.filters.urlrewrite.UrlRewriteFilter;

import com.kizy.server.executors.RantDecayExecutor;
import com.kizy.server.filters.CharacterEncodingFilter;
import com.kizy.server.prefs.ApplicationContext;

public class ServerLauncher {

    private static final int PORT = 9876;
    private static final int MAX_THREADS = 100;

    private static final int EXECUTOR_START_MILLISECOND_DELAY = 1 * 1000 * 60; // 1 minute
    private static final int EXECUTOR_MILLISECOND_PERIOD = 3 * 1000 * 60; // 3 minutes

    private static final String URL_BASE = "";
    private static final String RESOURCE_BASE = "web";

    public static void main(String[] args) throws Exception {
        Server server = createServer();
        server.start();
        runExecutors();
        System.out.println("Server started on port " + PORT);
    }

    private static Server createServer() {
        Server server = new Server(new QueuedThreadPool(MAX_THREADS));
        server.addConnector(createConnector(server));
        server.setHandler(createHandler());
        return server;
    }

    private static Connector createConnector(Server server) {
        ServerConnector connector = new ServerConnector(server);
        connector.setPort(PORT);
        return connector;
    }

    private static Handler createHandler() {
        HandlerCollection handlers = new HandlerCollection();
        handlers.addHandler(createContext());
        return handlers;
    }

    private static Handler createContext() {
        WebAppContext context = new WebAppContext();
        context.setContextPath(URL_BASE);
        context.setResourceBase(RESOURCE_BASE);
        context.setInitParameter("org.eclipse.jetty.servlet.Default.dirAllowed", "false");
        context.setInitParameter("org.eclipse.jetty.servlet.Default.useFileMappedBuffer", "false");
        context.addEventListener(new ContextLoaderListener(new ApplicationContext()));
        configureFilters(context.getServletHandler());
        configureServlets(context.getServletHandler());
        context.addOverrideDescriptor(null);
        ((AbstractSessionManager) context.getSessionHandler().getSessionManager()).setHttpOnly(true);
        return context;
    }

    private static void configureFilters(ServletHandler handler) {
        Map<String, String> emptyMap = Collections.<String, String>emptyMap();
        addFilter(handler, "SetCharacterEncodingFilter", CharacterEncodingFilter.class, "/*", emptyMap);
        addFilter(handler, "UrlRewriteFilter", UrlRewriteFilter.class, "/*", emptyMap);

        Map<String, String> gzipMap = new HashMap<String, String>();
        gzipMap.put("mimeTypes", "text/html,text/plain,text/xml,application/xhtml+xml,text/css,application/javascript,application/x-javascript,image/svg+xml,application/json");
        gzipMap.put("methods", "GET,POST");
        addFilter(handler, "GzipFilter", GzipFilter.class, "/*", gzipMap);
    }

    private static void addFilter(ServletHandler handler, String name, Class<? extends Filter> filter, String pathSpec, Map<String, String> initParams) {
        FilterHolder holder = new FilterHolder(filter);
        holder.setName(name);
        holder.setInitParameters(initParams);
        handler.addFilterWithMapping(holder, pathSpec, FilterMapping.DEFAULT);
    }

    private static void configureServlets(ServletHandler handler) {
        addServlet(handler, "main", EndpointFrameworkServlet.class, "/main/*");
        addServlet(handler, "api", DispatcherServlet.class, "/api/*");
        addServlet(handler, ServletHandler.__DEFAULT_SERVLET, DefaultServlet.class, "/*");
    }

    private static void addServlet(ServletHandler handler, String name, Class<? extends Servlet> servlet, String pathSpec) {
        ServletHolder holder = new ServletHolder(name, servlet);
        holder.getRegistration().setMultipartConfig(new MultipartConfigElement(System.getProperty("java.io.tmpdir")));
        holder.getRegistration().setLoadOnStartup(1);
        holder.setInitParameters(Collections.<String, String>emptyMap());
        handler.addServletWithMapping(holder, pathSpec);
    }

    private static void runExecutors() {
        ScheduledExecutorService pool = Executors.newScheduledThreadPool(MAX_THREADS);
        pool.scheduleAtFixedRate(new RantDecayExecutor(), EXECUTOR_START_MILLISECOND_DELAY, EXECUTOR_MILLISECOND_PERIOD, TimeUnit.MILLISECONDS);
    }
}
