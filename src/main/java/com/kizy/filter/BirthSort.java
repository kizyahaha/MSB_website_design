package com.kizy.filter;

import java.util.Collections;
import java.util.Comparator;
import java.util.List;

import com.kizy.data.rant.Rant;
import com.kizy.filter.PowerComparator;

public class BirthSort implements Filter {

	@Override
	public List<Rant> doFilter(final List<Rant> rants, String arg) {
		List<Rant> sortedRants = rants;
		return sortedRants;
	}

}
