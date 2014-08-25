package com.kizy.data.rant;

import java.util.Collection;

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

    int getRantPower();

    void changePower(int amount);

    boolean isAlive();

    String getRantLevel();

    Collection<Long> getUpvoteIds();

    Collection<Long> getDownvoteIds();

    void upvote(Long userId);

    void downvote(Long userId);

    void unvote(Long userId);

}