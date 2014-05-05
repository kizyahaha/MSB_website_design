package com.kizy.data;

import java.io.File;
import java.io.IOException;
import java.util.List;

import com.google.common.base.Charsets;
import com.google.common.io.Files;

public class DatabaseUtils {

    private static final String USERS_FILENAME = "data" + File.separator + "users.txt";
    private static final File USERS_FILE = new File(USERS_FILENAME);

    private DatabaseUtils() {
        // no instantiation
    }

    public static void write(User user) throws IOException {
        Files.write(user.getUsername() + "," + user.getPassword() + "," + user.getEmail(),
                    USERS_FILE, Charsets.UTF_8);
    }

    public static User read(String username, String password) throws IOException {
        List<String> lines = Files.readLines(USERS_FILE, Charsets.UTF_8);
        for (String line : lines) {
            String[] user = line.split(",");
            if (user.length == 3 && user[0].equalsIgnoreCase(username) && user[1].equals(password)) {
                return new UserImpl(user[0], user[1], user[2]);
            }
        }
        return null;
    }

}
