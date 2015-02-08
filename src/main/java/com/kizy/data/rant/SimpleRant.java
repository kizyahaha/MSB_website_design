package com.kizy.data.rant;

import java.util.Collection;

import org.joda.time.DateTime;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.google.common.collect.Lists;
import com.google.common.collect.Sets;
import com.kizy.data.item.Item;

public class SimpleRant implements Rant {

    private final long id;
    private final boolean nsfw;
    private final String title;
    private final String contents;
    private final long owner;
    private final String ownername;
    private final DateTime birth;
    private float power;
    private String level;
    private Collection<Long> upvotes;
    private Collection<Long> downvotes;
    private float voteMultiplier;
    private Collection<Item> appliedItems;

    @JsonCreator
    public SimpleRant(@JsonProperty("id") long id,
                      @JsonProperty("nsfw") boolean nsfw,
                      @JsonProperty("title") String title,
                      @JsonProperty("contents") String contents,
                      @JsonProperty("owner") long owner,
                      @JsonProperty("ownername") String ownername) {
        this(id, nsfw, title, contents, owner, ownername, DateTime.now(), null,
             Rants.STARTING_POWER, RantLevel.MINUTELY.getDisplayName(),
             Sets.<Long>newConcurrentHashSet(), Sets.<Long>newConcurrentHashSet(),
             1, Lists.<Item>newArrayList());
    }

    @JsonCreator
    public SimpleRant(@JsonProperty("id") long id,
                      @JsonProperty("nsfw") boolean nsfw,
                      @JsonProperty("title") String title,
                      @JsonProperty("contents") String contents,
                      @JsonProperty("owner") long owner,
                      @JsonProperty("ownername") String ownername,
                      @JsonProperty("birth") DateTime birth,
                      @JsonProperty("death") DateTime death,
                      @JsonProperty("power") float power,
                      @JsonProperty("level") String level,
                      @JsonProperty("upvotes") Collection<Long> upvotes,
                      @JsonProperty("downvotes") Collection<Long> downvotes,
                      @JsonProperty("multiplier") float multiplier,
                      @JsonProperty("items") Collection<Item> items) {
        this.id = id;
        this.nsfw = nsfw;
        this.title = title;
        this.contents = contents;
        this.owner = owner;
        this.ownername = ownername;
        this.birth = birth;
        this.power = power;
        this.level = level;
        this.upvotes = upvotes;
        this.downvotes = downvotes;
        this.voteMultiplier = multiplier;
    }

    @Override
    @JsonProperty("id")
    public long getId() {
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
    public Long getOwnerId() {
        return owner;
    }

    @Override
    @JsonProperty("ownername")
    public String getOwnerUsername() {
        return ownername;
    }

    @Override
    @JsonProperty("birth")
    public DateTime getCreationDate() {
        return birth;
    }

    @Override
    public String toString() {
        return formatRant(title, contents, ownername, nsfw);
    }

    public static String formatRant(String title, String contents, String username, boolean nsfw) {
        return String.format("[SimpleRant - Title: %s, Contents: %s, Owner: %s, NSFW: %s]", title, contents, username, nsfw);
    }

    @Override
    @JsonProperty("death")
    public DateTime getDeathDate() {
        // TODO Auto-generated method stub
        return DateTime.now();
    }

    @Override
    @JsonProperty("power")
    public float getRantPower() {
        return power;
    }

    @Override
    public void changePower(double amount) {
        power += amount;
    }

    @Override
    public boolean isAlive() {
        return power > 0;
    }

    @Override
    @JsonProperty("level")
    public String getRantLevel() {
        return level;
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
    public float getVoteMultiplier() {
        return voteMultiplier;
    }

    @Override
    public void setVoteMultiplier(float multiplier) {
        voteMultiplier = multiplier;
    }

    @Override
    @JsonProperty("appliedItems")
    public Collection<Item> getAppliedItems() {
        return appliedItems;
    }

    @Override
    public void applyItem(Item item) {
        appliedItems.add(item);
    }

    @Override
    public void expireItem(Item item) {
        appliedItems.remove(item);
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((appliedItems == null) ? 0 : appliedItems.hashCode());
        result = prime * result + ((birth == null) ? 0 : birth.hashCode());
        result = prime * result + ((contents == null) ? 0 : contents.hashCode());
        result = prime * result + ((downvotes == null) ? 0 : downvotes.hashCode());
        result = prime * result + (int) (id ^ (id >>> 32));
        result = prime * result + ((level == null) ? 0 : level.hashCode());
        result = prime * result + (nsfw ? 1231 : 1237);
        result = prime * result + (int) (owner ^ (owner >>> 32));
        result = prime * result + ((ownername == null) ? 0 : ownername.hashCode());
        result = prime * result + Float.floatToIntBits(power);
        result = prime * result + ((title == null) ? 0 : title.hashCode());
        result = prime * result + ((upvotes == null) ? 0 : upvotes.hashCode());
        result = prime * result + Float.floatToIntBits(voteMultiplier);
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
        if (getClass() != obj.getClass()) {
            return false;
        }
        SimpleRant other = (SimpleRant) obj;
        if (appliedItems == null) {
            if (other.appliedItems != null) {
                return false;
            }
        } else if (!appliedItems.equals(other.appliedItems)) {
            return false;
        }
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
        if (downvotes == null) {
            if (other.downvotes != null) {
                return false;
            }
        } else if (!downvotes.equals(other.downvotes)) {
            return false;
        }
        if (id != other.id) {
            return false;
        }
        if (level == null) {
            if (other.level != null) {
                return false;
            }
        } else if (!level.equals(other.level)) {
            return false;
        }
        if (nsfw != other.nsfw) {
            return false;
        }
        if (owner != other.owner) {
            return false;
        }
        if (ownername == null) {
            if (other.ownername != null) {
                return false;
            }
        } else if (!ownername.equals(other.ownername)) {
            return false;
        }
        if (Float.floatToIntBits(power) != Float.floatToIntBits(other.power)) {
            return false;
        }
        if (title == null) {
            if (other.title != null) {
                return false;
            }
        } else if (!title.equals(other.title)) {
            return false;
        }
        if (upvotes == null) {
            if (other.upvotes != null) {
                return false;
            }
        } else if (!upvotes.equals(other.upvotes)) {
            return false;
        }
        if (Float.floatToIntBits(voteMultiplier) != Float.floatToIntBits(other.voteMultiplier)) {
            return false;
        }
        return true;
    }

}