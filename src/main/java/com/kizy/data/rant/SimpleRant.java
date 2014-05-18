package com.kizy.data.rant;

import com.kizy.data.user.User;

public class SimpleRant implements Rant {

    private final boolean isNsfw;
    private final String title;
    private String contents;
    private final User user;

    public SimpleRant(boolean isNsfw, String title, String contents, User user) {
        this.isNsfw = isNsfw;
        this.title = title;
        this.contents = contents;
        this.user = user;
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
