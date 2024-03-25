var intNum = 0;

 function SalesDTO(order_code, sales_code, product_code, sales_quantity, processing_reg) {
	  this.order_code = order_code;
	  this.sales_code = sales_code;
	  this.product_code = product_code;
	  this.sales_quantity = sales_quantity;
	  this.processing_reg = processing_reg;
	}

 
 function save(){
	
	 var list = []; 
	 var hasN = false;
	 
	 for (var i = 0; i < intNum; i++) {
		 
		 var order = $(".order_code").text(); // 주문번호	
		 var scode = $(".sales_code").eq(i).text(); // 수주번호
		 var pcode = $(".product_code").eq(i).val(); // 상품코드
		 var salesQuantity = $(".sales_quantity").eq(i).text(); // 주문수량
		 var processingReg = $(".product-processing").eq(i).val(); // 수주처리 상태 
		 
		 if(processingReg == 'N'){ // 수주처리상태 지정하지 않은 상품이 존재하는 경우
			 hasN = true;
			 break;
			 
		 }	
		 
		 var dto = new SalesDTO(order, scode, pcode, salesQuantity, processingReg);
		 list.push(dto);		 		 
	 }
	 
	 
	 if(hasN){ 
		 alert("수주처리상태 미지정 상품 존재");
		 $("#mo-close").trigger("click");
		 return;
	 }
	 
		 $.ajax({
			  url: "acceptSave",
			  type: "POST",
			  contentType: 'application/json; charset=utf-8' ,
			  data: JSON.stringify(list), 
			  dataType:"text",
			  success: function(data) {
				 
				  Swal.fire({
					  title: "등록되었습니다!",				 
					  icon: "success"
					}).then((result) => {
						$("#mo-close").trigger('click');
						intNum = 0;
						goContent(data);
					});

				  
				 
				 
				},
			 
				error: function() {
			       
					  Swal.fire({
						  title: "관계자에게 문의하십시오.",
						  icon: "warning"
						});
			    }
			});
	
	
 }
	


 
  
