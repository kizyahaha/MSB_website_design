package com.kizy.data;

import java.io.File;
import java.io.IOException;
import java.util.EnumSet;
import java.util.List;

import com.google.common.base.Charsets;
import com.google.common.base.Predicate;
import com.google.common.collect.Iterables;
import com.google.common.io.Files;
import com.kizy.data.user.SimpleUser;
import com.kizy.data.user.User;

public class DatabaseUtils {

    private static final String USERS_FILENAME = "data" + File.separator + "users.txt";
    private static final File USERS_FILE = new File(USERS_FILENAME);

    private static final String USER_DELIMITER = ",";

    private static final int ID_PART = 0;
    private static final int USERNAME_PART = 1;
    private static final int PASSWORD_PART = 2;
    private static final int EMAIL_PART = 3;

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
        Files.append(user.getUserID() + USER_DELIMITER +
                     user.getUsername() + USER_DELIMITER +
                     user.getPassword() + USER_DELIMITER +
                     user.getEmail() + "\n",
                     USERS_FILE, Charsets.UTF_8);
        return user;
    }

    public static User read(String username, String password) throws IOException {
        return findUser(new SimpleUser(0L, username, password, ""), EnumSet.of(MatchComponent.USERNAME, MatchComponent.PASSWORD));
    }

    public static User findUserByName(String username) throws IOException {
        return findUser(new SimpleUser(0L, username, "", ""), EnumSet.of(MatchComponent.USERNAME));
    }

    public static User findUserByEmail(String email) throws IOException {
        return findUser(new SimpleUser(0L, "", "", email), EnumSet.of(MatchComponent.EMAIL));
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
        return new SimpleUser(Long.parseLong(parts[ID_PART]), parts[USERNAME_PART], parts[PASSWORD_PART], parts[EMAIL_PART]);
    }

    private static String[] splitLine(String line) {
        return line.split(USER_DELIMITER);
    }

    public static enum MatchComponent {
        ID, USERNAME, PASSWORD, EMAIL;
    }

    public static class UserMatcher {

        private UserMatcher() {
            // no instantiation
        }

        public static Iterable<String> matchOn(final Iterable<String> lines, final User match, final EnumSet<MatchComponent> set) {
            return Iterables.filter(lines, new Predicate<String>() {
                @Override
                public boolean apply(String line) {
                    String[] parts = splitLine(line);
                    if (set.contains(MatchComponent.ID)
                            && match.getUserID() != Long.parseLong(parts[ID_PART])) {
                        return false;
                    }
                    if (set.contains(MatchComponent.USERNAME)
                            && !match.getUsername().equalsIgnoreCase(parts[USERNAME_PART])) {
                        return false;
                    }
                    if (set.contains(MatchComponent.PASSWORD)
                            && !match.getPassword().equals(parts[PASSWORD_PART])) {
                        return false;
                    }
                    if (set.contains(MatchComponent.EMAIL)
                            && !match.getEmail().equalsIgnoreCase(parts[EMAIL_PART])) {
                        return false;
                    }
                    return true;
                }
            });
        }
    }

    public static long maxId() {
        long max = 0L;
        List<String> users;
        try {
            users = readUsers();
        } catch (IOException e) {
            e.printStackTrace();
            return max;
        }

        for (String user : users) {
            long id = Long.parseLong(splitLine(user)[ID_PART]);
            if (id > max) {
                max = id;
            }
        }
        return max;
    }
}
