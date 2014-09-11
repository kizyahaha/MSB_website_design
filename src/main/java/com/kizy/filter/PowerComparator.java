package com.kizy.filter;

import java.util.Comparator;

import com.kizy.data.rant.Rant;

public class PowerComparator implements Comparator<Rant> {
	@Override
	public int compare(Rant rant1, Rant rant2){
		return rant1.getRantPower() - rant2.getRantPower();
	}
}
