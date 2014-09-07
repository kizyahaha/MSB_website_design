package com.kizy.pagination;

import java.util.List;
import com.kizy.data.rant.Rant;


public interface Pagination {

	void setFirstRantNum(final int pageNum);
	
	void setNumPages(int numRants);
	
	void setRantsOnPage(final List<Rant> rants , final int pageNum);
	
	int getFirstRantNum();
	
	int getNumPages();
	
	List<Rant> getRantsOnPage();
	
}
