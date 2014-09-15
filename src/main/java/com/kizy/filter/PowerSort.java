package com.kizy.filter;

import java.util.Collections;
import java.util.Comparator;
import java.util.List;

import com.kizy.data.rant.Rant;
import com.kizy.filter.PowerComparator;

public class PowerSort implements Filter {

	@Override
	public List<Rant> doFilter(final List<Rant> rants, String arg) {
		List<Rant> sortedRants = rants;
		Comparator<Rant> powerComparator = new PowerComparator();
		Collections.sort(sortedRants , powerComparator);
		if (arg.equalsIgnoreCase("descending")){
			Collections.reverse(sortedRants);
		}
		return sortedRants;
	}

}
