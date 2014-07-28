package com.kizy.data.rant;

import org.joda.time.DateTime;

import com.kizy.data.user.User;

public class SimpleRant implements Rant {

    private final long id;
    private final boolean nsfw;
    private final String title;
    private final String contents;
    private final User user;
    private final DateTime birth;
    private int power;

    public SimpleRant(long id, boolean nsfw, String title, String contents, User user) {
        this(id, nsfw, title, contents, user, DateTime.now(), null, Rants.STARTING_POWER, "");
    }

    public SimpleRant(long id, boolean nsfw, String title, String contents, User user, DateTime birth, DateTime death, int power, String level) {
        this.id = id;
        this.nsfw = nsfw;
        this.title = title;
        this.contents = contents;
        this.user = user;
        this.birth = birth;
        this.power = power;
    }

    @Override
    public long getRantId() {
        return id;
    }

    @Override
    public boolean isNsfw() {
        return nsfw;
    }

    @Override
    public String getTitle() {
        return title;
    }

    @Override
    public String getContents() {
        return contents;
    }

    @Override
    public User getOwner() {
        return user;
    }

    @Override
    public DateTime getCreationDate() {
        return birth;
    }

    @Override
    public String toString() {
        return formatRant(title, contents, user.getUsername(), nsfw);
    }

    public static String formatRant(String title, String contents, String username, boolean nsfw) {
        return String.format("[SimpleRant - Title: {}, Contents: {}, Owner: {}, NSFW: {}]", title, contents, username, nsfw);
    }

	@Override
	public DateTime getDeathDate() {
		// TODO Auto-generated method stub
		return DateTime.now();
	}

	@Override
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
    public String getRantLevel() {
		double rand = Math.random() * 4;
		if (rand <= 1){
			return "Daily";
		}
		if (rand <= 2){
			return "Hourly";
		}
		if (rand <= 3){
			return "10-Minutely";
		}
        return "Minutely";
    }
}
