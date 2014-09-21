package com.kizy.filter;

import java.util.Collections;
import java.util.Comparator;
import java.util.List;

import com.kizy.data.rant.Rant;

public class BirthSort implements Filter {

    @Override
    public List<Rant> doFilter(final List<Rant> rants, String arg) {
        List<Rant> sortedRants = rants;
        if (arg.equalsIgnoreCase("any")){
            return sortedRants;
        }
        Comparator<Rant> birthComparator = Filters.signedComparator(new Comparator<Rant>() {
            @Override
            public int compare(Rant rant1, Rant rant2){
                return rant1.getCreationDate().compareTo(rant2.getCreationDate());
            }
        }, arg);
        Collections.sort(sortedRants , birthComparator);
        return sortedRants;
    }
}