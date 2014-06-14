package com.kizy.data;

import org.joda.time.DateTime;
import org.joda.time.format.DateTimeFormat;

public class Dates {

    private static final String DEFAULT_PATTERN = "MMMM d, yyyy";

    private Dates() {
        // no instantiation
    }

    public static String format(DateTime date) {
        return format(date, DEFAULT_PATTERN);
    }

    public static String format(DateTime date, String pattern) {
        return DateTimeFormat.forPattern(pattern).print(date);
    }

}
