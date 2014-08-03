package com.kizy.data.user;

import java.util.Collection;

import org.joda.time.DateTime;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.google.common.collect.Sets;

public class SimpleUser implements User {

    private final long id;
    private final String username;
    private final String password;
    private final String email;
    private final DateTime date;

    private final Collection<Long> rantIds;

    @JsonCreator
    public SimpleUser(@JsonProperty("id") long id, @JsonProperty("username") String username,
                      @JsonProperty("password") String password, @JsonProperty("email") String email) {
        this(id, username, password, email, DateTime.now(), Sets.<Long>newConcurrentHashSet());
    }

    @JsonCreator
    public SimpleUser(@JsonProperty("id") long id, @JsonProperty("username") String username,
                      @JsonProperty("password") String password,
                      @JsonProperty("email") String email, @JsonProperty("date") DateTime date,
                      @JsonProperty("rants") Collection<Long> rants) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.email = email;
        this.date = date;
        this.rantIds = rants;
    }

    @Override
    @JsonProperty("id")
    public long getUserId() {
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
    public String getPassword() {
        return password;
    }

    @Override
    public void addRantId(Long rantId) {
        rantIds.add(rantId);
    }

    @Override
    public Collection<Long> getRantIds() {
        return rantIds;
    }

    @Override
    @JsonProperty("date")
    public DateTime getCreationDate() {
        return date;
    }

    @Override
    public String toString() {
        return formatUser(username, email, password);
    }

    public static String formatUser(String name, String email, String pass) {
        return String.format("[SimpleUser - Username: {}, Email: {}, Password: {}]", name, email,
                pass);
    }

}
