package com.kizy.filter;

import java.util.List;

import com.google.common.collect.Lists;
import com.kizy.data.rant.Rant;

public class NsfwFilter implements Filter {

	@Override
	public List<Rant> doFilter(List<Rant> rants, String arg) {
		if (arg.equalsIgnoreCase("0")){
	    	List<Rant> filteredRants = Lists.newArrayList();
	        for (Rant rant : rants) {
	            if (!rant.isNsfw()) {
	                filteredRants.add(rant);
	            }
	        }
	        return filteredRants;
        }
        return rants;
	}

}
