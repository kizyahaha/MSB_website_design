package com.kizy.data.user;

import java.util.Collection;

import org.joda.time.DateTime;

import com.google.common.collect.Sets;
import com.kizy.data.rant.Rant;

public class SimpleUser implements User {

    private final long id;
    private final String username;
    private final String password;
    private final String email;
    private final DateTime date;

    private Collection<Rant> rants;

    public SimpleUser(long id, String username, String password, String email) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.email = email;
        this.date = DateTime.now();
        this.rants = Sets.newConcurrentHashSet();
    }

    @Override
    public long getUserId() {
        return id;
    }

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public String getEmail() {
        return email;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public void addRant(Rant rant) {
        rants.add(rant);
    }

    @Override
    public Collection<Rant> getRants() {
        return rants;
    }

    @Override
    public DateTime getCreationTime() {
        return date;
    }

    @Override
    public String toString() {
        return formatUser(username, email, password);
    }

    public static String formatUser(String name, String email, String pass) {
        return String.format("[SimpleUser - Username: {}, Email: {}, Password: {}]", name, email, pass);
    }

}
