package com.kizy.data.user;

import java.util.Collection;

import org.joda.time.DateTime;

public interface User {

    long getUserId();

    String getUsername();

    String getEmail();

    String getPassword();

    void addRant(Long rantId);

    Collection<Long> getOwnedRantIds();

    DateTime getCreationDate();

    Collection<Long> getUpvoteIds();

    Collection<Long> getDownvoteIds();

    void upvote(Long rantId);

    void downvote(Long rantId);

    void unvote(Long rantId);

}
