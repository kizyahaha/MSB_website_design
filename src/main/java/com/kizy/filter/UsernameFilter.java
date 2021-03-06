package com.kizy.filter;

import java.util.List;

import com.google.common.collect.Lists;
import com.kizy.data.rant.Rant;


public class UsernameFilter implements Filter {

    @Override
    public List<Rant> doFilter(final List<Rant> rants, String arg) {
        List<Rant> filteredRants = Lists.newArrayList();
        for (Rant rant : rants) {
            if (rant.getOwnerUsername().equalsIgnoreCase(arg)) {
                filteredRants.add(rant);
            }
        }
        return filteredRants;
    }

}
