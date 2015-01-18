package com.kizy.data.rant;

import java.util.Collection;

import org.joda.time.DateTime;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

public class UnownedRant extends SimpleRant {

    @JsonCreator
    public UnownedRant(@JsonProperty("id") long id,
                       @JsonProperty("nsfw") boolean nsfw,
                       @JsonProperty("title") String title,
                       @JsonProperty("contents") String contents,
                       @JsonProperty("owner") long owner,
                       @JsonProperty("ownername") String ownername,
                       @JsonProperty("birth") DateTime birth,
                       @JsonProperty("death") DateTime death,
                       @JsonProperty("power") int power,
                       @JsonProperty("level") String level) {
        super(id, nsfw, title, contents, owner, ownername, birth, death, power, level, null, null);
    }

    @Override
    @JsonIgnore
    public int getRantPower() {
        return super.getRantPower();
    }

    @Override
    @JsonIgnore
    public Collection<Long> getUpvoteIds() {
        throw new UnsupportedOperationException("Cannot get upvotes of unowned rant.");
    }

    @Override
    @JsonIgnore
    public Collection<Long> getDownvoteIds() {
        throw new UnsupportedOperationException("Cannot get downvotes of unowned rant.");
    }

}
