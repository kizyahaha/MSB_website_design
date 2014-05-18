package com.kizy.data.rant;

import com.kizy.data.user.User;

public interface Rant {

    boolean isNsfw();

    String getTitle();

    String getContents();

    User getOwner();

}
