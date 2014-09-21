package com.kizy.filter;

import java.util.Comparator;

import com.kizy.data.rant.Rant;

public class BirthComparator implements Comparator<Rant> {
	public int compare(Rant rant1, Rant rant2){
		return rant1.getCreationDate().compareTo(rant2.getCreationDate());
	}
}