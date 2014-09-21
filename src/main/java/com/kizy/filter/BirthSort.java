package com.kizy.filter;

import java.util.Collections;
import java.util.Comparator;
import java.util.List;

import com.kizy.data.rant.Rant;
import com.kizy.filter.BirthComparator;

public class BirthSort implements Filter {

	@Override
	public List<Rant> doFilter(final List<Rant> rants, String arg) {
		List<Rant> sortedRants = rants;
		if (arg.equalsIgnoreCase("any")){
			return sortedRants;
		}
		Comparator<Rant> birthComparator = new BirthComparator();
		Collections.sort(sortedRants , birthComparator);
		if (arg.equalsIgnoreCase("descending")){
			Collections.reverse(sortedRants);
		}
		return sortedRants;
	}

}