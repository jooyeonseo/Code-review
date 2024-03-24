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
		 var scode = $(".sales_code").eq(i).text();		// 수주번호
		 var pcode = $(".product_code").eq(i).val();		// 상품코드
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
	


 
  function content(data, order_code){ 
	  	  
	  	  // 하단 페이지 구성
	  
	  var listHtml = "<div class='content-box'>"
		  listHtml += "<div class='content-container'>"
	      listHtml += "<div class='content-title'>"	
		  listHtml += "<div>"
		  listHtml += "<p class='list-font order_code' onclick='info(\""+order_code+"\")'>"+order_code+"</p>";	  		 
		  listHtml += "</div>"		
		  listHtml += " <button type='button' class='btn-close' aria-label='Close' onclick='cancle()'></button>"
		  listHtml += "</div>";
		  
		  if(data[0].instructions=='N'){	// 이미 처리가 된 경우 "저장"버튼 생성되지 않음		  
			  listHtml += " <button type='button' class='btn' style='background-color:#619e6b; color: white;' id='save-btn' onclick='return saveCheck(\""+order_code+"\")'>저장</button>";
		  }
		  
		  // 테이블 생성하기
		  listHtml += "<div class='list-box'>";  
		  listHtml += "<table class='table table-hover'>";	  
		  listHtml += "<table class='table table-hover'>";
		  listHtml += "<thead>";
		  listHtml += "<tr class='table-success' >";
		  listHtml += "<th style='text-align: center;'>수주번호</th>";
		  listHtml += "<th>제품명</th>";
		  listHtml += "<th>수량</th>";
		  listHtml += "<th>재고조회</th>";
		  listHtml += "<th>처리상태</th>";
		  listHtml += "<th>수주처리</th>"; 
		  listHtml += "</tr>";
		  listHtml += "</thead>";  
		  listHtml += "<tbody>";  
	  
	  $.each(data,function(index,obj){
		  
		  intNum++;
		  
		  listHtml += "<tr>";		
		  listHtml += "<td class='sales_code'>"+obj.sales_code+"</td>";		 
		  listHtml += "<td>"+obj.product_name+"</td>";	
		  listHtml +="<input type='hidden' class='product_code' value='"+obj.product_code+"'>";
		  listHtml += "<td class='sales_quantity'>"+obj.sales_quantity+"</td>";		  
		  listHtml += "<td><button type='button' class='btn mint-btn' onclick=\"mo('" + obj.product_code + "','"+obj.order_code+"','"+obj.sales_quantity+"')\">재고조회</button></td>";
		 
		  // 처리상태 지정
          if(obj.product_status == 'waiting'){
        	  listHtml += "<td><div class='gray-circle'/></div>  대기</td>";
          }
          if(obj.product_status == 'progressing'){
        	  listHtml += "<td><div class='yellow-circle'/></div>  진행중</td>";
          }
          if(obj.product_status == 'complete'){
        	  listHtml += "<td><div class='green-circle'/></div>  완료</td>";
          }
          
          
          // 수주처리 안된 경우
		  if(obj.processing_reg == 'N'){
			  listHtml += "<td class='back'><select name='processing_reg' aria-label='Default select example' class='form-select product-processing'>";
			  listHtml += "<option value='N' class='check-processing'>N</option>";
			  listHtml += "<option value='stock' class='check-processing'>재고처리</option>";
			  listHtml += "<option value='production' class='check-processing'>생산처리</option>";
			  listHtml += "<option value='multi' class='check-processing'>복합처리</option>";  
			  listHtml += "</select></td>";
			 
		  }  
		  
		  // 수주처리 완료한 경우
		  if(obj.processing_reg != 'N'){
			  if(obj.processing_reg == 'stock'){
				  listHtml += "<td><div class='green-circle'/></div>  재고처리</td>";
			  }
			  if(obj.processing_reg == 'production'){
				  listHtml += "<td><div class='green-circle'/></div>  생산처리</td>";
			  }
			  if(obj.processing_reg == 'multi'){
				  listHtml += "<td><div class='green-circle'/></div>  복합처리</td>";
			  }
			
			

		  }
		  listHtml += "</tr>";
        	  
      
	  });
    
	
	  listHtml += "</tbody>";
	  listHtml += "</table>";
	 

	  $("#salesAcceptContent").html(listHtml);
	  
	 
     
  }
  
  
