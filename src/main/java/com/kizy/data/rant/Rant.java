package com.kizy.data.rant;

import java.util.Collection;

import org.joda.time.DateTime;

import com.kizy.data.Identifiable;
import com.kizy.data.item.Item;


public interface Rant extends Identifiable {

    boolean isNsfw();

    String getTitle();

    String getContents();

    Long getOwnerId();

    String getOwnerUsername();

    DateTime getCreationDate();

    DateTime getDeathDate();

    float getRantPower();

    void changePower(double amount);

    boolean isAlive();

    String getRantLevel();

    Collection<Long> getUpvoteIds();

    Collection<Long> getDownvoteIds();

    void upvote(Long userId);

    void downvote(Long userId);

    void unvote(Long userId);

    float getVoteMultiplier();

    void setVoteMultiplier(float multiplier);

    Collection<Item> getAppliedItems();

    void applyItem(Item item);

    void expireItem(Item item);

}