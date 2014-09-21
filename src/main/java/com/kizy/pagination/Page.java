package com.kizy.pagination;

import java.util.List;

import com.kizy.data.rant.Rant;


public interface Page {
    
    int getFirstRantNum();
    
    int getNumPages();
    
    List<Rant> getRantsOnPage();
    
}
