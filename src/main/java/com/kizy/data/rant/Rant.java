package com.kizy.data.rant;

import com.kizy.data.user.User;

public interface Rant {

    long getRantId();

    boolean isNsfw();

    String getTitle();

    String getContents();

    User getOwner();

}
