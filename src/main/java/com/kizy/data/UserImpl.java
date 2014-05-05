package com.kizy.data;

public class UserImpl implements User {

    private final String username;
    private final String password;
    private final String email;

    public UserImpl(String username, String password, String email) {
        this.username = username;
        this.password = password;
        this.email = email;
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

}
