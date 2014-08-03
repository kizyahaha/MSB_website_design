package com.kizy.data.rant;

import org.joda.time.DateTime;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.kizy.data.user.User;

public class SimpleRant implements Rant {

    private final long id;
    private final boolean nsfw;
    private final String title;
    private final String contents;
    private final User owner;
    private final DateTime birth;
    private int power;

    @JsonCreator
    public SimpleRant(@JsonProperty("id") long id, @JsonProperty("nsfw") boolean nsfw,
                      @JsonProperty("title") String title,
                      @JsonProperty("contents") String contents, @JsonProperty("owner") User owner) {
        this(id, nsfw, title, contents, owner, DateTime.now(), null, Rants.STARTING_POWER, "");
    }

    @JsonCreator
    public SimpleRant(@JsonProperty("id") long id, @JsonProperty("nsfw") boolean nsfw,
                      @JsonProperty("title") String title,
                      @JsonProperty("contents") String contents, @JsonProperty("owner") User owner,
                      @JsonProperty("birth") DateTime birth, @JsonProperty("death") DateTime death,
                      @JsonProperty("power") int power, @JsonProperty("level") String level) {
        this.id = id;
        this.nsfw = nsfw;
        this.title = title;
        this.contents = contents;
        this.owner = owner;
        this.birth = birth;
        this.power = power;
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
}
