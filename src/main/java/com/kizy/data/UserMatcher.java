package com.kizy.data;

import java.util.EnumSet;

import com.google.common.base.Predicate;
import com.google.common.collect.Iterables;

public class UserMatcher {

    private UserMatcher() {
        // no instantiation
    }

    public static enum MatchComponent {
        USERNAME, PASSWORD, EMAIL;
    }

    public static Iterable<String> matchOn(final Iterable<String> lines, final User match, final EnumSet<MatchComponent> set) {
        return Iterables.filter(lines, new Predicate<String>() {
            @Override
            public boolean apply(String line) {
                String[] parts = DatabaseUtils.splitLine(line);
                if (set.contains(MatchComponent.USERNAME)
                        && !match.getUsername().equals(parts[0])) {
                    return false;
                }
                if (set.contains(MatchComponent.PASSWORD)
                        && !match.getPassword().equals(parts[1])) {
                    return false;
                }
                if (set.contains(MatchComponent.EMAIL)
                        && !match.getEmail().equals(parts[2])) {
                    return false;
                }
                return true;
            }
        });
    }

}
