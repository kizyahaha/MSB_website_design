package com.kizy.data.rant;

import com.kizy.data.user.User;

public class SimpleRant implements Rant {

    private final long id;
    private final boolean isNsfw;
    private final String title;
    private final String contents;
    private final User user;

    public SimpleRant(long id, boolean isNsfw, String title, String contents, User user) {
        this.id = id;
        this.isNsfw = isNsfw;
        this.title = title;
        this.contents = contents;
        this.user = user;
    }

    @Override
    public long getRantId() {
        return id;
    }

    @Override
    public boolean isNsfw() {
        return isNsfw;
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

}
