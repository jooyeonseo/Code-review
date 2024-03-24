package com.mes2.sales.persistence;

import java.util.Date;

import java.util.List;


import javax.inject.Inject;

import org.apache.ibatis.session.SqlSession;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;

import com.mes2.sales.domain.AcceptSaveDTO;
import com.mes2.sales.domain.Criteria;
import com.mes2.sales.domain.PlanRegisterDTO;
import com.mes2.sales.domain.SalesDTO;


@Repository
public class SalesDAOImpl implements SalesDAO {

	private static final Logger logger = LoggerFactory.getLogger(SalesDAOImpl.class);
	
	@Inject
	private SqlSession sqlSession;
	
	private static final String NAMESPACE ="com.mes2.mapper.SalesMapper";
	
	
	
	
	@Override
	public SalesDTO getStockQuantity(SalesDTO sd) {
		logger.debug(" DAO : getStockQuantity(String product_code) ");
		return sqlSession.selectOne(NAMESPACE+".getStockQuantity", sd);
	}
	

	
	
	@Override
	public void stockReg(SalesDTO sd) {
		logger.debug(" DAO :stockReg(SalesDTO sd)");
		
		sqlSession.insert(NAMESPACE+".stockReg",sd);
		
		
	}
	
	@Override
	public void changeProductStatus(SalesDTO sd) {
		logger.debug(" DAO :changeProductStatus(SalesDTO sd)");
		
		sqlSession.update(NAMESPACE+".changeProductStatus",sd);
	}
	
	@Override
	public void productInst(SalesDTO sd) {
		logger.debug(" DAO :productInst(SalesDTO sd)");
		
		sqlSession.insert(NAMESPACE+".productInst",sd);
		
	}
	
	

	
	@Override
	public void updateInstruction(String order_code) {
		sqlSession.update(NAMESPACE+".updateInstruction", order_code);
		
	}
	

	
	
	
}
