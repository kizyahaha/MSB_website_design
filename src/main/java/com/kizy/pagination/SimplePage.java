package com.kizy.pagination;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.kizy.data.rant.Rant;

public class SimplePage implements Page {
    
    private int firstRantNum = 1;
    private int numPages = 1;
    private List<Rant> rantsOnPage = null;
    
    public SimplePage(int firstRantNum, int numPages, List<Rant> rantsOnPage) {
        this.firstRantNum = firstRantNum;
        this.numPages = numPages;
        this.rantsOnPage = rantsOnPage;
    }
    
    @Override
    @JsonProperty("firstRantNum")
    public int getFirstRantNum() {
        return this.firstRantNum;
    }
    
    @Override
    @JsonProperty("numPages")
    public int getNumPages() {
        return this.numPages;
    }
    
    @Override
    @JsonProperty("rantsOnPage")
    public List<Rant> getRantsOnPage() {
        return this.rantsOnPage;
    }
}