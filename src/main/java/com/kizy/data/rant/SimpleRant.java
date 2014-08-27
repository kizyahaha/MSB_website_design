package com.kizy.data.rant;

import java.util.Collection;

import org.joda.time.DateTime;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.google.common.collect.Sets;
import com.kizy.data.user.User;

public class SimpleRant implements Rant {

    private final long id;
    private final boolean nsfw;
    private final String title;
    private final String contents;
    private final User owner;
    private final DateTime birth;
    private int power;
    private Collection<Long> upvotes;
    private Collection<Long> downvotes;

    @JsonCreator
    public SimpleRant(@JsonProperty("id") long id,
                      @JsonProperty("nsfw") boolean nsfw,
                      @JsonProperty("title") String title,
                      @JsonProperty("contents") String contents,
                      @JsonProperty("owner") User owner) {
        this(id, nsfw, title, contents, owner, DateTime.now(), null, Rants.STARTING_POWER,
             "", Sets.<Long>newConcurrentHashSet(), Sets.<Long>newConcurrentHashSet());
    }

    @JsonCreator
    public SimpleRant(@JsonProperty("id") long id,
                      @JsonProperty("nsfw") boolean nsfw,
                      @JsonProperty("title") String title,
                      @JsonProperty("contents") String contents,
                      @JsonProperty("owner") User owner,
                      @JsonProperty("birth") DateTime birth,
                      @JsonProperty("death") DateTime death,
                      @JsonProperty("power") int power,
                      @JsonProperty("level") String level,
                      @JsonProperty("upvotes") Collection<Long> upvotes,
                      @JsonProperty("downvotes") Collection<Long> downvotes) {
        this.id = id;
        this.nsfw = nsfw;
        this.title = title;
        this.contents = contents;
        this.owner = owner;
        this.birth = birth;
        this.power = power;
        this.upvotes = upvotes;
        this.downvotes = downvotes;
    }

    @Override
    @JsonProperty("id")
    public long getRantId() {
        return id;
    }

    @Override
    @JsonProperty("nsfw")
    public boolean isNsfw() {
        return nsfw;
    }

    @Override
    @JsonProperty("title")
    public String getTitle() {
        return title;
    }

    @Override
    @JsonProperty("contents")
    public String getContents() {
        return contents;
    }

    @Override
    @JsonProperty("owner")
    public User getOwner() {
        return owner;
    }

    @Override
    @JsonProperty("birth")
    public DateTime getCreationDate() {
        return birth;
    }

    @Override
    public String toString() {
        return formatRant(title, contents, owner.getUsername(), nsfw);
    }

    public static String formatRant(String title, String contents, String username, boolean nsfw) {
        return String.format("[SimpleRant - Title: {}, Contents: {}, Owner: {}, NSFW: {}]", title, contents, username, nsfw);
    }

    @Override
    @JsonProperty("death")
    public DateTime getDeathDate() {
        // TODO Auto-generated method stub
        return DateTime.now();
    }

    @Override
    @JsonProperty("power")
    public int getRantPower() {
        return power;
    }

    @Override
    public void changePower(int amount) {
        power += amount;
    }

    @Override
    public boolean isAlive() {
        return power > 0;
    }

    @Override
    @JsonProperty("level")
    public String getRantLevel() {
        double rand = Math.random() * 4;
        if (rand <= 1) {
            return "Daily";
        }
        if (rand <= 2) {
            return "Hourly";
        }
        if (rand <= 3) {
            return "10-Minutely";
        }
        return "Minutely";
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
    public void upvote(Long userId) {
        unvote(userId);
        upvotes.add(userId);
    }

    @Override
    public void downvote(Long userId) {
        unvote(userId);
        downvotes.add(userId);
    }

    @Override
    public void unvote(Long userId) {
        upvotes.remove(userId);
        downvotes.remove(userId);
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + (birth == null ? 0 : birth.hashCode());
        result = prime * result + (contents == null ? 0 : contents.hashCode());
        result = prime * result + (int) (id ^ id >>> 32);
        result = prime * result + (nsfw ? 1231 : 1237);
        result = prime * result + (owner == null ? 0 : owner.hashCode());
        result = prime * result + power;
        result = prime * result + (title == null ? 0 : title.hashCode());
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
        if (!(obj instanceof SimpleRant)) {
            return false;
        }
        SimpleRant other = (SimpleRant) obj;
        if (birth == null) {
            if (other.birth != null) {
                return false;
            }
        } else if (!birth.equals(other.birth)) {
            return false;
        }
        if (contents == null) {
            if (other.contents != null) {
                return false;
            }
        } else if (!contents.equals(other.contents)) {
            return false;
        }
        if (id != other.id) {
            return false;
        }
        if (nsfw != other.nsfw) {
            return false;
        }
        if (owner == null) {
            if (other.owner != null) {
                return false;
            }
        } else if (!owner.equals(other.owner)) {
            return false;
        }
        if (power != other.power) {
            return false;
        }
        if (title == null) {
            if (other.title != null) {
                return false;
            }
        } else if (!title.equals(other.title)) {
            return false;
        }
        return true;
    }

}