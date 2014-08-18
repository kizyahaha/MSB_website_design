package com.kizy.data;

import java.io.File;
import java.io.IOException;
import java.util.Collection;
import java.util.EnumSet;
import java.util.List;

import org.joda.time.DateTime;

import com.google.common.base.Charsets;
import com.google.common.base.Predicate;
import com.google.common.collect.Iterables;
import com.google.common.collect.Lists;
import com.google.common.collect.Sets;
import com.google.common.io.Files;
import com.kizy.data.rant.Rant;
import com.kizy.data.rant.SimpleRant;
import com.kizy.data.user.SimpleUser;
import com.kizy.data.user.User;

public class DatabaseUtils {

    private static final String USERS_FILENAME = "data" + File.separator + "users.txt";
    private static final File USERS_FILE = new File(USERS_FILENAME);

    private static final String RANTS_FILENAME = "data" + File.separator + "rants.txt";
    private static final File RANTS_FILE = new File(RANTS_FILENAME);

    private static final String LINE_DELIMITER = "~~~~~";

    private static final int USER_ID_PART = 0;
    private static final int USER_USERNAME_PART = 1;
    private static final int USER_PASSWORD_PART = 2;
    private static final int USER_EMAIL_PART = 3;
    private static final int USER_CREATION_PART = 4;

    private static final int RANT_ID_PART = 0;
    private static final int RANT_NSFW_PART = 1;
    private static final int RANT_TITLE_PART = 2;
    private static final int RANT_CONTENTS_PART = 3;
    private static final int RANT_OWNER_PART = 4;
    private static final int RANT_CREATION_PART = 5;
    private static final int RANT_DEATH_PART = 6;
    private static final int RANT_POWER_PART = 7;
    private static final int RANT_LEVEL_PART = 8;


    private DatabaseUtils() {
        // no instantiation
    }

    private static void append(File file, String contents) throws IOException {
        Files.append(contents, file, Charsets.UTF_8);
    }

    private static void addRantToOwner(Rant rant) throws IOException {
        StringBuilder newContents = new StringBuilder();
        long userId = rant.getOwner().getUserId();
        for (String line : readUsers()) {
            newContents.append(line);
            if (userId == Long.parseLong(splitLine(line)[USER_ID_PART])) {
                newContents.append(LINE_DELIMITER + rant.getRantId());
            }
            newContents.append("\n");
        }
        Files.write(newContents, USERS_FILE, Charsets.UTF_8);
    }

    public static void writeUser(User user) throws IOException {
        append(USERS_FILE, formatUser(user) + "\n");
    }

    private static String formatUser(User user) {
        return user.getUserId() + LINE_DELIMITER +
               user.getUsername() + LINE_DELIMITER +
               user.getPassword() + LINE_DELIMITER +
               user.getEmail() + LINE_DELIMITER +
               user.getCreationDate().toString();
    }

    public static void modifyUser(long oldUserId, User newUser) throws IOException {
        if (oldUserId != newUser.getUserId()) {
            throw new IllegalArgumentException("Cannot change user id.");
        }
        StringBuilder newContents = new StringBuilder();
        for (String line : readUsers()) {
            if (oldUserId == Long.parseLong(splitLine(line)[USER_ID_PART])) {
                newContents.append(formatUser(newUser));
            } else {
                newContents.append(line);
            }
            newContents.append("\n");
        }
        Files.write(newContents, USERS_FILE, Charsets.UTF_8);
    }

    public static void writeRant(Rant rant) throws IOException {
        append(RANTS_FILE, formatRant(rant) + "\n");
        addRantToOwner(rant);
    }

    private static String formatRant(Rant rant) {
        return rant.getRantId() + LINE_DELIMITER +
               rant.isNsfw() + LINE_DELIMITER +
               rant.getTitle() + LINE_DELIMITER +
               rant.getContents() + LINE_DELIMITER +
               rant.getOwner().getUsername() + LINE_DELIMITER +
               rant.getCreationDate().toString() + LINE_DELIMITER +
               rant.getDeathDate().toString() + LINE_DELIMITER + //temporary
               rant.getRantPower() + LINE_DELIMITER +
               rant.getRantLevel();
    }

    public static void modifyRant(long oldRantId, Rant newRant) throws IOException {
        if (oldRantId != newRant.getRantId()) {
            throw new IllegalArgumentException("Cannot change rant id.");
        }
        StringBuilder newContents = new StringBuilder();
        for (String line : readRants()) {
            if (oldRantId == Long.parseLong(splitLine(line)[RANT_ID_PART])) {
                newContents.append(formatRant(newRant));
            } else {
                newContents.append(line);
            }
            newContents.append("\n");
        }
        Files.write(newContents, RANTS_FILE, Charsets.UTF_8);
    }

    private static List<String> readFile(File file) throws IOException {
        return Files.readLines(file, Charsets.UTF_8);
    }

    private static List<String> readUsers() throws IOException {
        return readFile(USERS_FILE);
    }

    public static List<User> getUsers() throws IOException {
        List<User> users = Lists.newArrayList();
        for (String line : readUsers()) {
            users.add(parseUser(line));
        }
        return users;
    }

    private static List<String> readRants() throws IOException {
        return readFile(RANTS_FILE);
    }

    public static List<Rant> getRants() throws IOException {
        List<Rant> rants = Lists.newArrayList();
        for (String line : readRants()) {
            rants.add(parseRant(line));
        }
        return rants;
    }

    public static User readUser(String username, String password) throws IOException {
        return findUser(0L, username, password, "", EnumSet.of(UserMatchComponent.USERNAME, UserMatchComponent.PASSWORD));
    }

    public static User findUserById(long id) throws IOException {
        return findUser(id, "", "", "", EnumSet.of(UserMatchComponent.ID));
    }

    public static User findUserByName(String username) throws IOException {
        return findUser(0L, username, "", "", EnumSet.of(UserMatchComponent.USERNAME));
    }

    public static User findUserByEmail(String email) throws IOException {
        return findUser(0L, "", "", email, EnumSet.of(UserMatchComponent.EMAIL));
    }

    public static Rant findRantById(long id) throws IOException {
        return findRant(id, false, null, null, EnumSet.of(RantMatchComponent.ID));
    }

    public static Rant findRantByTitle(String title) throws IOException {
        return findRant(0L, false, title, null, EnumSet.of(RantMatchComponent.TITLE));
    }

    public static Rant findRantByOwnerName(String owner) throws IOException {
        return findRant(0L, false, null, owner, EnumSet.of(RantMatchComponent.OWNER));
    }

    private static User findUser(long matchId, String matchUsername, String matchPassword, String matchEmail, EnumSet<UserMatchComponent> set) throws IOException {
        Iterable<String> matches = UserMatcher.matchOn(matchId, matchUsername, matchPassword, matchEmail, readUsers(), set);
        if (Iterables.size(matches) == 0) {
            return null;
        }
        if (Iterables.size(matches) > 1) {
            throw new IllegalStateException(String.format("Multiple users match '{}' on properties: {}",
                                                          SimpleUser.formatUser(matchUsername, matchEmail, matchPassword), set));
        }
        return parseUser(matches.iterator().next());
    }

    private static Rant findRant(long matchId, boolean matchNsfw, String matchTitle, String matchOwner, EnumSet<RantMatchComponent> set) throws IOException {
        Iterable<String> matches = RantMatcher.matchOn(matchId, matchNsfw, matchTitle, matchOwner, readRants(), set);
        if (Iterables.size(matches) == 0) {
            return null;
        }
        if (Iterables.size(matches) > 1) {
            throw new IllegalStateException(String.format("Multiple users match '{}' on properties: {}",
                                                          SimpleRant.formatRant(matchTitle, "", matchOwner, matchNsfw), set));
        }
        return parseRant(matches.iterator().next());
    }

    private static User parseUser(String line) {
        String[] parts = splitLine(line);
        Collection<Long> rants = Sets.newConcurrentHashSet();
        for (int i = USER_CREATION_PART + 1; i < parts.length; i++) {
            rants.add(Long.parseLong(parts[i]));
        }
        return new SimpleUser(Long.parseLong(parts[USER_ID_PART]),
                              parts[USER_USERNAME_PART],
                              parts[USER_PASSWORD_PART],
                              parts[USER_EMAIL_PART],
                              new DateTime(parts[USER_CREATION_PART]),
                              rants);
    }

    private static Rant parseRant(String line) throws IOException {
        String[] parts = splitLine(line);
        return new SimpleRant(Long.parseLong(parts[RANT_ID_PART]),
                              Boolean.parseBoolean(parts[RANT_NSFW_PART]),
                              parts[RANT_TITLE_PART],
                              parts[RANT_CONTENTS_PART],
                              findUserByName(parts[RANT_OWNER_PART]),
                              new DateTime(parts[RANT_CREATION_PART]),
                              new DateTime(parts[RANT_DEATH_PART]),
                              Integer.parseInt(parts[RANT_POWER_PART]),
                              parts[RANT_LEVEL_PART]);
    }

    private static String[] splitLine(String line) {
        return line.split(LINE_DELIMITER);
    }

    public static enum UserMatchComponent {
        ID, USERNAME, PASSWORD, EMAIL;

        public static EnumSet<UserMatchComponent> all() {
            return EnumSet.of(ID, USERNAME, PASSWORD, EMAIL);
        }
    }

    public static class UserMatcher {

        private UserMatcher() {
            // no instantiation
        }

        public static Iterable<String> matchOn(final long matchId, final String matchUsername, final String matchPassword,
                                               final String matchEmail, final Iterable<String> lines, final EnumSet<UserMatchComponent> set) {
            return Iterables.filter(lines, new Predicate<String>() {
                @Override
                public boolean apply(String line) {
                    String[] parts = splitLine(line);
                    if (set.contains(UserMatchComponent.ID)
                            && matchId != Long.parseLong(parts[USER_ID_PART])) {
                        return false;
                    }
                    if (set.contains(UserMatchComponent.USERNAME)
                            && !matchUsername.equalsIgnoreCase(parts[USER_USERNAME_PART])) {
                        return false;
                    }
                    if (set.contains(UserMatchComponent.PASSWORD)
                            && !matchPassword.equals(parts[USER_PASSWORD_PART])) {
                        return false;
                    }
                    if (set.contains(UserMatchComponent.EMAIL)
                            && !matchEmail.equalsIgnoreCase(parts[USER_EMAIL_PART])) {
                        return false;
                    }
                    return true;
                }
            });
        }
    }

    public static enum RantMatchComponent {
        ID, TITLE, OWNER;

        public static EnumSet<RantMatchComponent> all() {
            return EnumSet.of(ID, TITLE, OWNER);
        }
    }

    public static class RantMatcher {

        private RantMatcher() {
            // no instantiation
        }

        public static Iterable<String> matchOn(final long matchId, final boolean matchNsfw, final String matchTitle, final String matchOwner,
                                               final Iterable<String> lines, final EnumSet<RantMatchComponent> set) {
            return Iterables.filter(lines, new Predicate<String>() {
                @Override
                public boolean apply(String line) {
                    String[] parts = splitLine(line);
                    if (set.contains(RantMatchComponent.ID)
                            && matchId != Long.parseLong(parts[RANT_ID_PART])) {
                        return false;
                    }
                    if (set.contains(RantMatchComponent.TITLE)
                            && matchTitle.equalsIgnoreCase(parts[RANT_TITLE_PART])) {
                        return false;
                    }
                    if (set.contains(RantMatchComponent.OWNER)
                            && matchOwner.equalsIgnoreCase(parts[RANT_OWNER_PART])) {
                        return false;
                    }
                    return true;
                }
            });
        }
    }

    public static long maxUserId() {
        List<String> users;
        try {
            users = readUsers();
        } catch (IOException e) {
            e.printStackTrace();
            return 0L;
        }

        return maxId(users, USER_ID_PART);
    }

    public static long maxRantId() {
        List<String> rants;
        try {
            rants = readRants();
        } catch (IOException e) {
            e.printStackTrace();
            return 0L;
        }

        return maxId(rants, RANT_ID_PART);
    }

    private static long maxId(List<String> lines, int idPart) {
        long max = 0L;
        for (String line : lines) {
            long id = Long.parseLong(splitLine(line)[idPart]);
            if (id > max) {
                max = id;
            }
        }
        return max;
    }
}
