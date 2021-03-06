package com.kizy.data.database;

import java.io.File;
import java.io.IOException;
import java.util.Collection;
import java.util.Comparator;
import java.util.EnumSet;
import java.util.List;
import java.util.Map;

import org.joda.time.DateTime;

import com.google.common.base.Charsets;
import com.google.common.base.Function;
import com.google.common.base.Predicate;
import com.google.common.collect.FluentIterable;
import com.google.common.collect.Iterables;
import com.google.common.collect.Lists;
import com.google.common.collect.Maps;
import com.google.common.collect.Sets;
import com.google.common.io.Files;
import com.kizy.data.item.Item;
import com.kizy.data.item.ItemType;
import com.kizy.data.rant.Rant;
import com.kizy.data.rant.RantLevel;
import com.kizy.data.rant.SimpleRant;
import com.kizy.data.rant.UnownedRant;
import com.kizy.data.user.SimpleUser;
import com.kizy.data.user.User;

public class DatabaseUtils {

    private static final String USERS_FILENAME = "data" + File.separator + "users.txt";
    private static final File USERS_FILE = new File(USERS_FILENAME);

    private static final String RANTS_FILENAME = "data" + File.separator + "rants.txt";
    private static final File RANTS_FILE = new File(RANTS_FILENAME);

    private static final String USER_RANTS_FILENAME = "data" + File.separator + "user_rants.txt";
    private static final File USER_RANTS_FILE = new File(USER_RANTS_FILENAME);

    private static final String UPVOTES_FILENAME = "data" + File.separator + "upvotes.txt";
    private static final File UPVOTES_FILE = new File(UPVOTES_FILENAME);

    private static final String DOWNVOTES_FILENAME = "data" + File.separator + "downvotes.txt";
    private static final File DOWNVOTES_FILE = new File(DOWNVOTES_FILENAME);

    private static final String WINNERS_FILENAME = "data" + File.separator + "winners.txt";
    private static final File WINNERS_FILE = new File(WINNERS_FILENAME);

    private static final String APPLIED_ITEMS_FILENAME = "data" + File.separator + "applied_items.txt";
    private static final File APPLIED_ITEMS_FILE = new File(APPLIED_ITEMS_FILENAME);

    private static final String USER_ITEMS_FILENAME = "data" + File.separator + "user_items.txt";
    private static final File USER_ITEMS_FILE = new File(USER_ITEMS_FILENAME);

    private static final String LINE_DELIMITER = "~~~~~";

    private static final int USER_ID_PART = 0;
    private static final int USER_USERNAME_PART = 1;
    private static final int USER_PASSWORD_PART = 2;
    private static final int USER_EMAIL_PART = 3;
    private static final int USER_CREATION_PART = 4;
    private static final int USER_NSFW_PREFERENCE_PART = 5;
    private static final int USER_SOUNDS_PREFERENCE_PART = 6;
    private static final int USER_ANIMATIONS_PREFERENCE_PART = 7;

    private static final int RANT_ID_PART = 0;
    private static final int RANT_NSFW_PART = 1;
    private static final int RANT_TITLE_PART = 2;
    private static final int RANT_CONTENTS_PART = 3;
    private static final int RANT_OWNER_PART = 4;
    private static final int RANT_CREATION_PART = 5;
    private static final int RANT_DEATH_PART = 6;
    private static final int RANT_POWER_PART = 7;
    private static final int RANT_LEVEL_PART = 8;
    private static final int RANT_MULTIPLIER_PART = 9;

    private static final int VOTE_USER_PART = 0;
    private static final int VOTE_RANT_PART = 1;

    private static final int USER_RANT_USER_PART = 0;
    private static final int USER_RANT_RANT_PART = 1;

    private static final int WINNER_TIME_PART = 0;
    private static final int WINNER_RANT_ID_PART = 1;
    private static final int WINNER_LEVEL_PART = 2;

    private static final int APPLIED_ITEMS_RANT_PART = 0;
    private static final int APPLIED_ITEMS_ITEM_PART = 1;
    private static final int APPLIED_ITEMS_USER_PART = 2;

    private static final int USER_ITEMS_USER_PART = 0;
    private static final int USER_ITEMS_ITEM_PART = 1;
    private static final int USER_ITEMS_COUNT_PART = 2;

    private DatabaseUtils() {
        // no instantiation
    }

    private static void append(File file, String contents) throws IOException {
        Files.append(contents, file, Charsets.UTF_8);
    }

    private static void addRantToOwner(Rant rant) throws IOException {
        append(USER_RANTS_FILE, rant.getOwnerId() + LINE_DELIMITER + rant.getId() + "\n");
    }

    public static void writeUser(User user) throws IOException {
        append(USERS_FILE, formatUser(user) + "\n");
    }

    private static String formatUser(User user) {
        return user.getId() + LINE_DELIMITER +
               user.getUsername() + LINE_DELIMITER +
               user.getPassword() + LINE_DELIMITER +
               user.getEmail() + LINE_DELIMITER +
               user.getCreationDate().toString() + LINE_DELIMITER +
               user.getNsfwPreference() + LINE_DELIMITER +
               user.getSoundsPreference() + LINE_DELIMITER +
               user.getAnimationsPreference();
    }

    public static void modifyUser(long oldUserId, User newUser) throws IOException {
        if (oldUserId != newUser.getId()) {
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
        return rant.getId() + LINE_DELIMITER +
               rant.isNsfw() + LINE_DELIMITER +
               rant.getTitle() + LINE_DELIMITER +
               rant.getContents() + LINE_DELIMITER +
               rant.getOwnerUsername() + LINE_DELIMITER +
               rant.getCreationDate().toString() + LINE_DELIMITER +
               rant.getDeathDate().toString() + LINE_DELIMITER + //temporary
               rant.getRantPower() + LINE_DELIMITER +
               rant.getRantLevel();
    }

    public static void modifyRant(long oldRantId, Rant newRant) throws IOException {
        if (oldRantId != newRant.getId()) {
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

    public static void upvote(User user, long userId, long rantId) throws IOException {
        Rant rant = findRantById(user, rantId);
        if ( removeDownvote(userId, rantId) ){
            rant.changePower(rant.getVoteMultiplier());
        }
        if ( removeUpvote(userId, rantId) ){
            rant.changePower(-rant.getVoteMultiplier());
        }
        else {
            rant.changePower(rant.getVoteMultiplier());
            append(UPVOTES_FILE, userId + LINE_DELIMITER + rantId + "\n");
        }
        modifyRant(rantId, rant);
    }

    public static boolean removeUpvote(long userId, long rantId) throws IOException {
        return removeVote(userId, rantId, readUpvotes(), UPVOTES_FILE);
    }

    public static void downvote(User user, long userId, long rantId) throws IOException {
        Rant rant = findRantById(user, rantId);
        if ( removeUpvote(userId, rantId) ){
            rant.changePower(-rant.getVoteMultiplier());
        }
        if ( removeDownvote(userId, rantId) ){
            rant.changePower(rant.getVoteMultiplier());
        }
        else {
            rant.changePower(-rant.getVoteMultiplier());
            append(DOWNVOTES_FILE, userId + LINE_DELIMITER + rantId + "\n");
        }
        modifyRant(rantId, rant);
    }

    public static boolean removeDownvote(long userId, long rantId) throws IOException {
        return removeVote(userId, rantId, readDownvotes(), DOWNVOTES_FILE);
    }

    private static boolean removeVote(long userId, long rantId, List<String> lines, File file) throws IOException {
        StringBuilder newContents = new StringBuilder();
        boolean didRemove = false;
        for (String line : lines) {
            Long[] vote = parseVote(line);
            if (vote[VOTE_USER_PART] != userId || vote[VOTE_RANT_PART] != rantId) {
                newContents.append(line + "\n");
            }
            else{
                didRemove = true;
            }
        }
        Files.write(newContents, file, Charsets.UTF_8);
        return didRemove;
    }

    public static void writeWinner(DateTime date, long rantId, RantLevel level) throws IOException {
        append(WINNERS_FILE, formatWinner(date, rantId, level) + "\n");
    }

    private static String formatWinner(DateTime date, long rantId, RantLevel level) {
        return date.toString() + LINE_DELIMITER +
               rantId + LINE_DELIMITER +
               level.getDisplayName();
    }

    public static void applyItem(Rant rant, Item item, User user) throws IOException {
        append(APPLIED_ITEMS_FILE, rant.getId() + LINE_DELIMITER +
                                   item.getId() + LINE_DELIMITER +
                                   user.getId() + "\n");
        modifyUserItem(user.getId(), item.getId(), false, readUserItems(), USER_ITEMS_FILE);
    }

    public static void expireItem(Rant rant, Item item) throws IOException {
        removeItem(rant.getId(), item.getId(), readAppliedItems(), APPLIED_ITEMS_FILE);
    }

    private static boolean removeItem(long rantId, long itemId, List<String> lines, File file) throws IOException {
        StringBuilder newContents = new StringBuilder();
        boolean didRemove = false;
        for (String line : lines) {
            Long[] appliedItem = parseAppliedItem(line);
            if (didRemove || appliedItem[APPLIED_ITEMS_RANT_PART] != rantId || appliedItem[APPLIED_ITEMS_ITEM_PART] != itemId) {
                newContents.append(line + "\n");
            } else {
                didRemove = true;
            }
        }
        Files.write(newContents, file, Charsets.UTF_8);
        return didRemove;
    }

    public static void buyItem(User user, Item item) throws IOException {
        modifyUserItem(user.getId(), item.getId(), true, readUserItems(), USER_ITEMS_FILE);
    }

    public static void sellItem(User user, Item item) throws IOException {
        modifyUserItem(user.getId(), item.getId(), false, readUserItems(), USER_ITEMS_FILE);
    }

    private static void modifyUserItem(long userId, long itemId, boolean increase, List<String> lines, File file) throws IOException {
        StringBuilder newContents = new StringBuilder();
        boolean found = false;
        for (String line : lines) {
            Long[] userItem = parseUserItem(line);
            if (userItem[USER_ITEMS_USER_PART] != userId || userItem[USER_ITEMS_ITEM_PART] != itemId) {
                newContents.append(line + "\n");
            } else {
                found = true;
                long newCount = increase ? userItem[USER_ITEMS_COUNT_PART] + 1 : userItem[USER_ITEMS_COUNT_PART] - 1;
                if (newCount > 0) {
                    String replacement = userItem[USER_ITEMS_USER_PART] + LINE_DELIMITER +
                                         userItem[USER_ITEMS_ITEM_PART] + LINE_DELIMITER +
                                         newCount + "\n";
                    newContents.append(replacement);
                }

            }
        }
        if (!found) {
            append(file, userId + LINE_DELIMITER +
                         itemId + LINE_DELIMITER +
                         1 + "\n");
        } else {
            Files.write(newContents, file, Charsets.UTF_8);
        }
    }

    private static List<String> readFile(File file) throws IOException {
        return Files.readLines(file, Charsets.UTF_8);
    }

    public static List<String> readUsers() throws IOException {
        return readFile(USERS_FILE);
    }

    public static List<User> getUsers() throws IOException {
        List<User> users = Lists.newArrayList();
        for (String line : readUsers()) {
            users.add(parseUser(line));
        }
        return users;
    }

    public static List<String> readRants() throws IOException {
        return readFile(RANTS_FILE);
    }

    public static List<Rant> getRants() throws IOException {
        List<Rant> rants = Lists.newArrayList();
        for (String line : readRants()) {
            rants.add(parseRant(line));
        }
        return rants;
    }

    public static List<Rant> getRantsAsUser(User user) throws IOException {
        List<Rant> rants = Lists.newArrayList();
        for (String line : readRants()) {
            rants.add(parseRantAsUser(line, user));
        }
        return rants;
    }

    public static List<String> readUpvotes() throws IOException {
        return readFile(UPVOTES_FILE);
    }

    public static List<String> readDownvotes() throws IOException {
        return readFile(DOWNVOTES_FILE);
    }

    public static List<String> readWinners() throws IOException {
        return readFile(WINNERS_FILE);
    }

    public static List<String> readUserRants() throws IOException {
        return readFile(USER_RANTS_FILE);
    }

    public static List<String> readAppliedItems() throws IOException {
        return readFile(APPLIED_ITEMS_FILE);
    }

    public static List<String> readUserItems() throws IOException {
        return readFile(USER_ITEMS_FILE);
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

    public static Rant findRantById(User user, long id) throws IOException {
        return findRant(user, id, false, null, null, EnumSet.of(RantMatchComponent.ID));
    }

    public static Rant findRantByTitle(User user, String title) throws IOException {
        return findRant(user, 0L, false, title, null, EnumSet.of(RantMatchComponent.TITLE));
    }

    public static Rant findRantByOwnerName(User user, String owner) throws IOException {
        return findRant(user, 0L, false, null, owner, EnumSet.of(RantMatchComponent.OWNER));
    }

    public static List<Rant> findRantsByLevel(final RantLevel level) throws IOException {
        return FluentIterable.from(readRants()).filter(new Predicate<String>() {
            @Override
            public boolean apply(String line) {
                return splitLine(line)[RANT_LEVEL_PART].equalsIgnoreCase(level.getDisplayName());
            }
        }).transform(new Function<String, Rant>() {
            @Override
            public Rant apply(String line) {
                try {
                    return parseRant(line);
                } catch (IOException e) {
                    throw new RuntimeException(e);
                }
            }
        }).toList();
    }

    public static long getLatestWinnerId(String level) throws IOException {
        return getLatestWinnerId(RantLevel.fromName(level));
    }

    public static long getLatestWinnerId(final RantLevel level) throws IOException {
        final String levelString = level.getDisplayName();
        String latestWinner = FluentIterable.from(readWinners()).filter(new Predicate<String>() {
            @Override
            public boolean apply(String input) {
                return splitLine(input)[WINNER_LEVEL_PART].equalsIgnoreCase(levelString);
            }
        }).toSortedList(new Comparator<String>() {
            @Override
            public int compare(String first, String second) {
                DateTime firstDate = new DateTime(splitLine(first)[WINNER_TIME_PART]);
                DateTime secondDate = new DateTime(splitLine(second)[WINNER_TIME_PART]);
                return firstDate.compareTo(secondDate);
            }
        }).iterator().next();
        return Long.parseLong(splitLine(latestWinner)[WINNER_RANT_ID_PART]);
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

    private static Rant findRant(User user, long matchId, boolean matchNsfw, String matchTitle, String matchOwner, EnumSet<RantMatchComponent> set) throws IOException {
        Iterable<String> matches = RantMatcher.matchOn(matchId, matchNsfw, matchTitle, matchOwner, readRants(), set);
        if (Iterables.size(matches) == 0) {
            return null;
        }
        if (Iterables.size(matches) > 1) {
            throw new IllegalStateException(String.format("Multiple users match '{}' on properties: {}",
                                                          SimpleRant.formatRant(matchTitle, "", matchOwner, matchNsfw), set));
        }
        return parseRantAsUser(matches.iterator().next(), user);
    }

    private static User parseUser(String line) throws IOException {
        String[] parts = splitLine(line);
        long userId = Long.parseLong(parts[USER_ID_PART]);
        return new SimpleUser(userId,
                              parts[USER_USERNAME_PART],
                              parts[USER_PASSWORD_PART],
                              parts[USER_EMAIL_PART],
                              new DateTime(parts[USER_CREATION_PART]),
                              getUserRantIds(userId),
                              getUserUpvotes(userId),
                              getUserDownVotes(userId),
                              new Integer(parts[USER_NSFW_PREFERENCE_PART]),
                              new Integer(parts[USER_SOUNDS_PREFERENCE_PART]),
                              new Integer(parts[USER_ANIMATIONS_PREFERENCE_PART]),
                              getUserItems(userId));
    }

    private static Collection<Long> getUserRantIds(long userId) throws IOException {
        Collection<Long> rants = Sets.newConcurrentHashSet();
        for (String line : readUserRants()) {
            String[] parts = splitLine(line);
            if (Long.parseLong(parts[USER_RANT_USER_PART]) == userId) {
                rants.add(Long.parseLong(parts[USER_RANT_RANT_PART]));
            }
        }
        return rants;
    }

    private static Rant parseRant(String line) throws IOException {
        String[] parts = splitLine(line);
        long rantId = Long.parseLong(parts[RANT_ID_PART]);
        User owner = findUserByName(parts[RANT_OWNER_PART]);
        return new SimpleRant(rantId,
                              Boolean.parseBoolean(parts[RANT_NSFW_PART]),
                              parts[RANT_TITLE_PART],
                              parts[RANT_CONTENTS_PART],
                              owner.getId(),
                              owner.getUsername(),
                              new DateTime(parts[RANT_CREATION_PART]),
                              new DateTime(parts[RANT_DEATH_PART]),
                              Float.parseFloat(parts[RANT_POWER_PART]),
                              parts[RANT_LEVEL_PART],
                              getRantUpvotes(rantId),
                              getRantDownVotes(rantId),
                              Float.parseFloat(parts[RANT_MULTIPLIER_PART]),
                              getAppliedItems(rantId));
    }

    private static Rant parseRantAsUser(String line, User user) throws IOException {
        String[] parts = splitLine(line);
        long rantId = Long.parseLong(parts[RANT_ID_PART]);
        User owner = findUserByName(parts[RANT_OWNER_PART]);
        if (owner.equals(user)) {
            return new SimpleRant(rantId,
                                  Boolean.parseBoolean(parts[RANT_NSFW_PART]),
                                  parts[RANT_TITLE_PART],
                                  parts[RANT_CONTENTS_PART],
                                  owner.getId(),
                                  owner.getUsername(),
                                  new DateTime(parts[RANT_CREATION_PART]),
                                  new DateTime(parts[RANT_DEATH_PART]),
                                  Float.parseFloat(parts[RANT_POWER_PART]),
                                  parts[RANT_LEVEL_PART],
                                  getRantUpvotes(rantId),
                                  getRantDownVotes(rantId),
                                  Float.parseFloat(parts[RANT_MULTIPLIER_PART]),
                                  getAppliedItems(rantId));
        } else {
            return new UnownedRant(rantId,
                                   Boolean.parseBoolean(parts[RANT_NSFW_PART]),
                                   parts[RANT_TITLE_PART],
                                   parts[RANT_CONTENTS_PART],
                                   owner.getId(),
                                   owner.getUsername(),
                                   new DateTime(parts[RANT_CREATION_PART]),
                                   new DateTime(parts[RANT_DEATH_PART]),
                                   Float.parseFloat(parts[RANT_POWER_PART]),
                                   parts[RANT_LEVEL_PART],
                                   Float.parseFloat(parts[RANT_MULTIPLIER_PART]));
        }
    }

    private static Collection<Long> getRantUpvotes(long rantId) throws IOException {
        return getRantVotes(rantId, readUpvotes());
    }

    private static Collection<Long> getRantDownVotes(long rantId) throws IOException {
        return getRantVotes(rantId, readDownvotes());
    }

    private static Collection<Long> getRantVotes(long rantId, List<String> lines) {
        return getVotes(rantId, lines, VOTE_RANT_PART, VOTE_USER_PART);
    }

    private static Collection<Long> getUserUpvotes(long userId) throws IOException {
        return getUserVotes(userId, readUpvotes());
    }

    private static Collection<Long> getUserDownVotes(long userId) throws IOException {
        return getUserVotes(userId, readDownvotes());
    }

    private static Collection<Long> getUserVotes(long userId, List<String> lines) {
        return getVotes(userId, lines, VOTE_USER_PART, VOTE_RANT_PART);
    }

    private static Collection<Long> getVotes(long id, List<String> lines, int matchPart, int addPart) {
        Collection<Long> votes = Sets.newConcurrentHashSet();
        for (String line : lines) {
            Long[] vote = parseVote(line);
            if (vote[matchPart] == id) {
                votes.add(vote[addPart]);
            }
        }
        return votes;
    }

    private static Long[] parseVote(String line) {
        String[] parts = splitLine(line);
        return new Long[] { Long.parseLong(parts[VOTE_USER_PART]), Long.parseLong(parts[VOTE_RANT_PART]) };
    }

    private static Collection<Item> getAppliedItems(long rantId) throws IOException {
        Collection<Item> appliedItems = Sets.newConcurrentHashSet();
        for (String line : readAppliedItems()) {
            Long[] appliedItem = parseAppliedItem(line);
            if (appliedItem[APPLIED_ITEMS_RANT_PART] == rantId) {
                appliedItems.add(ItemType.byId(appliedItem[APPLIED_ITEMS_ITEM_PART]));
            }
        }
        return appliedItems;
    }

    private static Long[] parseAppliedItem(String line) {
        String[] parts = splitLine(line);
        return new Long[] {Long.parseLong(parts[APPLIED_ITEMS_ITEM_PART]), Long.parseLong(parts[APPLIED_ITEMS_ITEM_PART]), Long.parseLong(parts[APPLIED_ITEMS_USER_PART])};
    }

    private static Map<Item, Integer> getUserItems(long userId) throws IOException {
        Map<Item, Integer> items = Maps.newHashMap();
        for (String line : readUserItems()) {
            Long[] userItem = parseUserItem(line);
            if (userItem[USER_ITEMS_USER_PART] == userId) {
                items.put(ItemType.byId(userItem[USER_ITEMS_ITEM_PART]), userItem[USER_ITEMS_COUNT_PART].intValue());
            }
        }
        return items;
    }

    private static Long[] parseUserItem(String line) {
        String[] parts = splitLine(line);
        return new Long[] {Long.parseLong(parts[USER_ITEMS_USER_PART]), Long.parseLong(parts[USER_ITEMS_ITEM_PART]), Long.parseLong(parts[USER_ITEMS_COUNT_PART])};
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
