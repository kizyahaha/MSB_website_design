package com.kizy.data.user;

import java.util.Collection;

import com.kizy.data.rant.Rant;

public interface User {

    long getUserId();

    String getUsername();

    String getEmail();

    String getPassword();

    void addRant(Rant rant);

    Collection<Rant> getRants();

}
