package com.kizy.data.user;

import java.util.Collection;

import org.joda.time.DateTime;

public interface User {

    long getUserId();

    String getUsername();

    String getEmail();

    String getPassword();

    void addRantId(Long rantId);

    Collection<Long> getRantIds();

    DateTime getCreationTime();

}
