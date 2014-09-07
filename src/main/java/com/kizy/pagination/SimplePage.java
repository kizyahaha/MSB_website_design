package com.kizy.pagination;

import java.util.List;

import com.google.common.collect.Lists;
import com.kizy.data.rant.Rant;

public class SimplePage implements Pagination {
	
	private int firstRantNum = 1;
	private int numPages = 1;
	private List<Rant> rantsOnPage = null;

	@Override
	public void setFirstRantNum(final int pageNum){
		this.firstRantNum = ((pageNum-1) * Pages.RANTS_PER_PAGE);
		return;
	}
	
	@Override
	public void setNumPages(int numRants){
		this.numPages = (int)Math.ceil((double)numRants/Pages.RANTS_PER_PAGE);
		return;
	}
	
	@Override
	public void setRantsOnPage(final List<Rant> rants, final int pageNum){
		List<Rant> rantsOnPage = Lists.newArrayList();
		int num = 0;
		while ( ((pageNum-1) * Pages.RANTS_PER_PAGE + num) < rants.size() && num < Pages.RANTS_PER_PAGE) {
			rantsOnPage.add( rants.get((pageNum-1) * Pages.RANTS_PER_PAGE + num) );
			num++;
		}
		this.rantsOnPage = rantsOnPage;
		return;
	}
	
	@Override
	public int getFirstRantNum(){
		return this.firstRantNum;
	}
	
	@Override
	public int getNumPages(){
		return this.numPages;
	}
	
	@Override
	public List<Rant> getRantsOnPage(){
		return this.rantsOnPage;
	}
}