package com.kizy.data.user;

import java.util.Collection;
import java.util.Map;

import org.joda.time.DateTime;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.google.common.collect.Maps;
import com.google.common.collect.Sets;
import com.kizy.data.item.Item;

public class SimpleUser implements User {

    private final long id;
    private final String username;
    private String password;
    private String email;
    private final DateTime date;
    private Collection<Long> upvotes;
    private Collection<Long> downvotes;
    private int nsfwPreference;
    private int soundsPreference;
    private int animationsPreference;
    private Map<Item, Integer> items;

    private final Collection<Long> rantIds;

    @JsonCreator
    public SimpleUser(@JsonProperty("id") long id,
                      @JsonProperty("username") String username,
                      @JsonProperty("password") String password,
                      @JsonProperty("email") String email) {
        this(id, username, password, email, DateTime.now(), Sets.<Long>newConcurrentHashSet(),
             Sets.<Long>newConcurrentHashSet(), Sets.<Long>newConcurrentHashSet(),
             0, 1, 1, Maps.<Item, Integer>newHashMap());
    }

    @JsonCreator
    public SimpleUser(@JsonProperty("id") long id,
                      @JsonProperty("username") String username,
                      @JsonProperty("password") String password,
                      @JsonProperty("email") String email,
                      @JsonProperty("date") DateTime date,
                      @JsonProperty("rants") Collection<Long> rants,
                      @JsonProperty("upvotes") Collection<Long> upvotes,
                      @JsonProperty("downvotes") Collection<Long> downvotes,
                      @JsonProperty("nsfwPreference") int nsfwPreference,
                      @JsonProperty("soundsPreference") int soundsPreference,
                      @JsonProperty("animationsPreference") int animationsPreference,
                      @JsonProperty("items") Map<Item, Integer> items) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.email = email;
        this.date = date;
        this.rantIds = rants;
        this.upvotes = upvotes;
        this.downvotes = downvotes;
        this.nsfwPreference = nsfwPreference;
        this.soundsPreference = soundsPreference;
        this.animationsPreference = animationsPreference;
        this.items = items;
    }

    @Override
    @JsonProperty("id")
    public long getId() {
        return id;
    }

    @Override
    @JsonProperty("username")
    public String getUsername() {
        return username;
    }

    @Override
    @JsonProperty("email")
    public String getEmail() {
        return email;
    }

    @Override
    @JsonIgnore
    public String getPassword() {
        return password;
    }

    @Override
    public void addRant(Long rantId) {
        rantIds.add(rantId);
    }

    @Override
    @JsonProperty("rantIds")
    public Collection<Long> getOwnedRantIds() {
        return rantIds;
    }

    @Override
    @JsonProperty("date")
    public DateTime getCreationDate() {
        return date;
    }

    @Override
    @JsonProperty("upvotes")
    public Collection<Long> getUpvoteIds() {
        return upvotes;
    }

    @Override
    @JsonProperty("downvotes")
    public Collection<Long> getDownvoteIds() {
        return downvotes;
    }

    @Override
    public void upvote(Long rantId) {
        unvote(rantId);
        upvotes.add(rantId);
    }

    @Override
    public void downvote(Long rantId) {
        unvote(rantId);
        downvotes.add(rantId);
    }

    @Override
    public void unvote(Long rantId) {
        upvotes.remove(rantId);
        downvotes.remove(rantId);
    }

    @Override
    public String toString() {
        return formatUser(username, email, password);
    }

    public static String formatUser(String name, String email, String pass) {
        return String.format("[SimpleUser - Username: %s, Email: %s, Password: %s]", name, email, pass);
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + (date == null ? 0 : date.hashCode());
        result = prime * result + (email == null ? 0 : email.hashCode());
        result = prime * result + (int) (id ^ id >>> 32);
        result = prime * result + (password == null ? 0 : password.hashCode());
        result = prime * result + (rantIds == null ? 0 : rantIds.hashCode());
        result = prime * result + (username == null ? 0 : username.hashCode());
        return result;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        if (obj == null) {
            return false;
        }
        if (!(obj instanceof SimpleUser)) {
            return false;
        }
        SimpleUser other = (SimpleUser) obj;
        if (date == null) {
            if (other.date != null) {
                return false;
            }
        } else if (!date.equals(other.date)) {
            return false;
        }
        if (email == null) {
            if (other.email != null) {
                return false;
            }
        } else if (!email.equals(other.email)) {
            return false;
        }
        if (id != other.id) {
            return false;
        }
        if (password == null) {
            if (other.password != null) {
                return false;
            }
        } else if (!password.equals(other.password)) {
            return false;
        }
        if (rantIds == null) {
            if (other.rantIds != null) {
                return false;
            }
        } else if (!rantIds.equals(other.rantIds)) {
            return false;
        }
        if (username == null) {
            if (other.username != null) {
                return false;
            }
        } else if (!username.equals(other.username)) {
            return false;
        }
        return true;
    }

    @Override
    @JsonProperty("nsfwPreference")
    public int getNsfwPreference() {
        return nsfwPreference;
    }

    @Override
    public void setNsfwPreference (int preference) {
        nsfwPreference = preference;
    }

    @Override
    @JsonProperty("soundsPreference")
    public int getSoundsPreference() {
        return soundsPreference;
    }

    @Override
    public void setSoundsPreference (int preference) {
        soundsPreference = preference;
    }

    @Override
    @JsonProperty("animationsPreference")
    public int getAnimationsPreference() {
        return animationsPreference;
    }

    @Override
    public void setAnimationsPreference(int preference) {
        animationsPreference = preference;
    }

    @Override
    public void setEmail(String newEmail) {
        email = newEmail;
    }

    @Override
    @JsonProperty("items")
    public Map<Item, Integer> getOwnedItems() {
        return items;
    }

    @Override
    public void buyItem(Item item) {
        Integer count = items.get(item);
        if (count == null) {
            count = 0;
        }
        items.put(item, count + 1);
    }

    @Override
    public boolean hasItem(Item item) {
        return items.containsKey(item);
    }

    @Override
    public void expendItem(Item item) {
        Integer count = items.get(item);
        if (count == null || count.intValue() == 1) {
            items.remove(item);
        } else {
            items.put(item, count - 1);
        }
    }

}
