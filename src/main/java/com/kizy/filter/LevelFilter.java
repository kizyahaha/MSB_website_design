package com.kizy.filter;

import java.util.List;

import com.google.common.collect.Lists;
import com.kizy.data.rant.Rant;

public class LevelFilter implements Filter {

    @Override
    public List<Rant> doFilter(final List<Rant> rants, String arg) {
		if (arg.equalsIgnoreCase("any")){
			return rants;
		}
        List<Rant> filteredRants = Lists.newArrayList();
        for (Rant rant : rants) {
            if (rant.getRantLevel().equalsIgnoreCase(arg)){
                filteredRants.add(rant);
            }
        }
        return filteredRants;
    }
}
