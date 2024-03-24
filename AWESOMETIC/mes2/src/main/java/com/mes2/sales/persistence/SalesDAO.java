package com.mes2.sales.persistence;

import java.util.Date;
import java.util.List;

import com.mes2.sales.domain.AcceptSaveDTO;
import com.mes2.sales.domain.Criteria;
import com.mes2.sales.domain.PlanRegisterDTO;
import com.mes2.sales.domain.SalesDTO;


public interface SalesDAO {


	public SalesDTO getStockQuantity(SalesDTO sd);	
	public void stockReg(SalesDTO sd); 
	public void changeProductStatus(SalesDTO sd); 
	public void productInst(SalesDTO sd); 
	public void updateInstruction(String order_code); 

	
}
