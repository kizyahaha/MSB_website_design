package com.kizy.filter;

import java.util.List;

import com.kizy.data.rant.Rant;

public interface Filter {
    List<Rant> doFilter(final List<Rant> rants, String arg);
}
