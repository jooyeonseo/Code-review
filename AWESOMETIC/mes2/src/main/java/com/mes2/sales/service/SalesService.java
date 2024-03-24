package com.mes2.sales.service;

import java.util.List;

import com.mes2.sales.domain.AcceptSaveDTO;
import com.mes2.sales.domain.Criteria;
import com.mes2.sales.domain.PlanRegisterDTO;
import com.mes2.sales.domain.SalesDTO;


public interface SalesService {

	
	public SalesDTO stockQuantity(SalesDTO sd);	 
	public String instructSales(List<SalesDTO> list);
	
}
