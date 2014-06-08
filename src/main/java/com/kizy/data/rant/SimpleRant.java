package com.kizy.data.rant;

import org.joda.time.DateTime;

import com.kizy.data.user.User;

public class SimpleRant implements Rant {

    private final long id;
    private final boolean nsfw;
    private final String title;
    private final String contents;
    private final User user;
    private final DateTime date;

    public SimpleRant(long id, boolean nsfw, String title, String contents, User user) {
        this.id = id;
        this.nsfw = nsfw;
        this.title = title;
        this.contents = contents;
        this.user = user;
        this.date = DateTime.now();
    }

    @Override
    public long getRantId() {
        return id;
    }

    @Override
    public boolean isNsfw() {
        return nsfw;
    }

    @Override
    public String getTitle() {
        return title;
    }

    @Override
    public String getContents() {
        return contents;
    }

    @Override
    public User getOwner() {
        return user;
    }

    @Override
    public DateTime getCreationDate() {
        return date;
    }

    @Override
    public String toString() {
        return formatRant(title, contents, user.getUsername(), nsfw);
    }

    public static String formatRant(String title, String contents, String username, boolean nsfw) {
        return String.format("[SimpleRant - Title: {}, Contents: {}, Owner: {}, NSFW: {}]", title, contents, username, nsfw);
    }

}
