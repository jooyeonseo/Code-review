package com.mes2.sales.service;


import java.util.Calendar;
import java.util.Date;

import java.util.List;


import javax.inject.Inject;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;


import com.mes2.sales.domain.AcceptSaveDTO;
import com.mes2.sales.domain.Criteria;
import com.mes2.sales.domain.PlanRegisterDTO;
import com.mes2.sales.domain.SalesDTO;

import com.mes2.sales.persistence.SalesDAO;

@Service
public class SalesServiceImpl implements SalesService {

	private static final Logger logger = LoggerFactory.getLogger(SalesServiceImpl.class);
	
	@Inject
	private SalesDAO sdao;
	

	
	@Override
	public SalesDTO stockQuantity(SalesDTO sd) { // 재고수량 구하기
		logger.debug(" S : stockQuantity(SalesDTO sd) ");
		return sdao.getStockQuantity(sd);
	}
	
	@Override
	public String instructSales(List<SalesDTO> list) {
		
		// 주문건에 대한 처리지시 상태 변경 (완료)	
		SalesDTO sdt = list.get(0); 
                String orderCode = sdt.getOrder_code(); 
		sdao.updateInstruction(orderCode); // 주문건에 대한 수주 처리 상태 업로드 
		
		for(SalesDTO dto : list) {
			
				
		        // 출고 저장
			dto.setProduct_status("progressing");	            
	                // 출고테이블에 등록
	    		sdao.stockReg(dto);	    		
	    		// 상태값 변경 (수주처리지시 상태 : 완료)
	    		sdao.changeProductStatus(dto);
	            
	            
		     if ("production".equals(dto.getProcessing_reg())) {
		    	 	// 재고수량이 0인 경우 : 주문량만큼 생산필요
		            dto.setLack_quantity(dto.getSales_quantity());
		            sdao.productInst(dto); //부족한만큼 생산지시
		         
		        } else if ("multi".equals(dto.getProcessing_reg())) {	
		        	// 재고수량 < 주문수량 : 재고수량만큼은 출고준비 나머지는 생산후 출고준비   
		            int stock_quantity = stockQuantity(dto).getStock_quantity(); // 재고수량 가져오기
		            int lack_quantity = (dto.getSales_quantity() - stock_quantity); // 부족수량 계산 (주문수량 - 재고수량)
		            dto.setLack_quantity(lack_quantity);
		            sdao.productInst(dto); //부족한만큼 생산지시
		            
		        } 
		    
						
		}
		
		return orderCode;
	}
	

}
