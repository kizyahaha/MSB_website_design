package com.kizy.filter;

import java.util.List;

import com.google.common.collect.Lists;
import com.kizy.data.rant.Rant;

public class AliveFilter implements Filter {

    @Override
    public List<Rant> doFilter(final List<Rant> rants, String arg) {
        List<Rant> filteredRants = Lists.newArrayList();
        boolean alive = Boolean.parseBoolean(arg);
        for (Rant rant : rants) {
            if (rant.isAlive() && alive) {
                filteredRants.add(rant);
            } else if (!rant.isAlive() && !alive) {
                filteredRants.add(rant);
            }
        }
        return filteredRants;
    }

}
