package com.kizy.filter;

import java.util.Comparator;

public class Filters {

    private Filters() {
        // no instantiation.
    }
    
    public static boolean isDescending(String arg) {
        return arg.equalsIgnoreCase("descending") ||
               arg.equalsIgnoreCase("decreasing");
    }
    
    public static <T> Comparator<T> signedComparator(final Comparator<T> comp, String arg) {
        final int sign = isDescending(arg) ? -1 : 1;
        return new Comparator<T>() {
            @Override
            public int compare(T o1, T o2) {
                return comp.compare(o1, o2) * sign;
            }
        };
    }
}
