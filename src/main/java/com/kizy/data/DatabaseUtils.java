package com.kizy.data;

import java.io.File;
import java.io.IOException;
import java.util.EnumSet;
import java.util.List;

import com.google.common.base.Charsets;
import com.google.common.collect.Iterables;
import com.google.common.io.Files;
import com.kizy.data.UserMatcher.MatchComponent;
import com.kizy.data.user.SimpleUser;
import com.kizy.data.user.User;

public class DatabaseUtils {

    private static final String USERS_FILENAME = "data" + File.separator + "users.txt";
    private static final File USERS_FILE = new File(USERS_FILENAME);

    private static final String USER_DELIMITER = ",";

    private DatabaseUtils() {
        // no instantiation
    }

    public static User write(User user) throws IOException {
        if (findUserByName(user.getUsername()) != null) {
            return null;
        }
        if (findUserByEmail(user.getEmail()) != null) {
            return null;
        }
        Files.append(user.getUsername() + USER_DELIMITER + user.getPassword() + USER_DELIMITER + user.getEmail() + "\n",
                    USERS_FILE, Charsets.UTF_8);
        return user;
    }

    public static User read(String username, String password) throws IOException {
        return findUser(new SimpleUser(username, password, ""), EnumSet.of(MatchComponent.USERNAME, MatchComponent.PASSWORD));
    }

    public static User findUserByName(String username) throws IOException {
        return findUser(new SimpleUser(username, "", ""), EnumSet.of(MatchComponent.USERNAME));
    }

    public static User findUserByEmail(String email) throws IOException {
        return findUser(new SimpleUser("", "", email), EnumSet.of(MatchComponent.EMAIL));
    }

    private static List<String> readUsers() throws IOException {
        return Files.readLines(USERS_FILE, Charsets.UTF_8);
    }

    private static User findUser(User match, EnumSet<MatchComponent> set) throws IOException {
        Iterable<String> matches = UserMatcher.matchOn(readUsers(), match, set);
        if (Iterables.size(matches) == 0) {
            return null;
        }
        if (Iterables.size(matches) > 1) {
            throw new IllegalStateException(String.format("Multiple users match '{}' on properties: {}", match, set));
        }
        return parseLine(matches.iterator().next());
    }

    private static User parseLine(String line) {
        String[] parts = splitLine(line);
        return new SimpleUser(parts[0], parts[1], parts[2]);
    }

    static String[] splitLine(String line) {
        return line.split(USER_DELIMITER);
    }
}
