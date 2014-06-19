package com.kizy.data.rant;

import org.joda.time.DateTime;

import com.kizy.data.user.User;

public interface Rant {

    long getRantId();

    boolean isNsfw();

    String getTitle();

    String getContents();

    User getOwner();

    DateTime getCreationDate();
    
    DateTime getDeathDate();
    
    double getRantPower();
    
}