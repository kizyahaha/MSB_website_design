package com.kizy.data.user;

public class SimpleUser implements User {

    private final long id;
    private final String username;
    private final String password;
    private final String email;

    public SimpleUser(long id, String username, String password, String email) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.email = email;
    }

    @Override
    public long getUserID() {
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
    public String toString() {
        return String.format("[SimpleUser - Username: {}, Email: {}, Password: {}]", username, email, password);
    }

}
