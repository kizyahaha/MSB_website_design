package com.kizy.data.user;

import java.util.Collection;
import java.util.Map;

import org.joda.time.DateTime;

import com.kizy.data.Identifiable;
import com.kizy.data.item.Item;

public interface User extends Identifiable {

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

    int getNsfwPreference();

    void setNsfwPreference(int preference);

    int getSoundsPreference();

    void setSoundsPreference(int preference);

    int getAnimationsPreference();

    void setAnimationsPreference(int preference);

    void setEmail(String new_email);

    Map<Item, Integer> getOwnedItems();

    void buyItem(Item item);

    boolean hasItem(Item item);

    void expendItem(Item item);

}
