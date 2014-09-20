package com.kizy.filter;

import java.util.Collections;
import java.util.Comparator;
import java.util.List;

import com.kizy.data.rant.Rant;

public class PowerSort implements Filter {

	@Override
	public List<Rant> doFilter(final List<Rant> rants, String arg) {
		List<Rant> sortedRants = rants;
		final int sign = isDescending(arg) ? -1 : 1;
		Comparator<Rant> powerComparator = new Comparator<Rant>() {
		    @Override
		    public int compare(Rant rant1, Rant rant2){
		        return (rant1.getRantPower() - rant2.getRantPower()) * sign;
		    }
		};
		Collections.sort(sortedRants , powerComparator);
		return sortedRants;
	}

    private boolean isDescending(String arg) {
        return arg.equalsIgnoreCase("descending") ||
               arg.equalsIgnoreCase("decreasing");
    }

}
