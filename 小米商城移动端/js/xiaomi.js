$(function(){
	$.ajax({
		type:"get",
		dataType:"json",
		url:"1.json",
		async:true,
		success:function(res){
			console.log(res);
			arr1 = res.data.gallery;
			arr2 = res.data.sections[0].body.items;
			arr3 = res.data.sections;
			console.log(arr3[0].body.items[0].img_url);
			setData(arr1);
			setDatalist(arr2);
			setDatafigure(arr3);
			
		}
	})
	
	
	function setData(arr1){
		for (var i = 0; i < arr1.length; i++) {
			imgObj = $("<img src='"+ arr1[i].img_url +"'/>");
			$("#banner_imgs").append(imgObj);
		
		}
		imgObj = $("<img src='"+ arr1[0].img_url +"'/>");
		$("#banner_imgs").append(imgObj);
	}
	function setDatalist(arr2){
		for (var i = 0; i < arr2.length; i++) {
			imgObj2 = $("<a href='###'><img src='" + arr2[i].img_url + "'></a>")
			$("#store_list").append(imgObj2);
		}
	}
	function setDatafigure(arr3){
		for (var i = 1; i < arr3.length - 1; i++) {
			figObj = $("<figure><div class='imgs'><img /></div><div class='fig_text'><h3></h3><p></p><figcaption></figcaption></div></figure>")
			figObj.find("img").attr("src",arr3[i].body.items[0].img_url);
			figObj.find("h3").text(arr3[i].body.items[0].product_name);
			figObj.find("p").text(arr3[i].body.items[0].product_brief);
			figObj.find("figcaption").text(arr3[i].body.items[0].product_price);
			$("#store_figure").append(figObj);
			//点击添加到购买页面
			(function(j){
				touch.on("figure","tap",function(){
//				$("figure").on("click",function(){
				var arr = [arr3[j].body.items[0].img_url,arr3[j].body.items[0].product_name,arr3[j].body.items[0].product_brief,arr3[j].body.items[0].product_price];
				var str = JSON.stringify(arr);
				console.log(str)
				sessionStorage.setItem("data",str);
				shopping();
				})
			})(i)
		}

		function shopping(){
			$("#search_one").show();
			var str = sessionStorage.getItem("data");
			var arr = JSON.parse(str);
			$(".search_one_img").find("img").attr("src",arr[0]);
			$(".model").text(arr[1]);
			$(".price").text(arr[3]);
			$(".font").text(arr[2]);
		}
		
		for (var k = arr3.length-1; k < arr3.length; k++) {
			figObj1 = $("<figure></figure>")
			$("#store_figure").append(figObj1);	
			for (var j = 0; j <arr3[k].body.items.length ; j++) {
				imgObj = $("<img src='"+arr3[k].body.items[j].img_url +"' class='imgs_last'/>");
				figObj1.append(imgObj);
			}
			
		}
	}
	
	$.ajax({
		type:"get",
		dataType:"json",
		url:"2.json",
		async:true,
		success:function(res){
			arr4 = res.data.list;
			setClassify(arr4);
		}
	});
	function setClassify(arr4){
		for (var i = 0; i < arr4.length; i++) {
			divObj = $("<div><h3 class='classify_h3'> "+ arr4[i].name +"</h3></div>")	
			for (var j = 0; j <arr4[i].list.length; j++) {
				liObj = $("<li class='list_li'><img src='"+arr4[i].list[j].img_url +"'/><span>" +arr4[i].list[j].name  + "</span></li>")
				divObj.append(liObj);	
			}
			$("#classify").append(divObj);
		}
	}
	touch.on("footer","tap",function(e){		
		$("footer").find("a").css("color","#9C9C9C");
		$("footer").find("p").css("color","#9C9C9C");
		$(e.target).parent().css("color","orangered");
		$(e.target).css("color","orangered");
		$(e.target).children().css("color","orangered");
		$("#hide").show();
	})
//	$("footer").find("a").on("click",function(){
//		$("footer").find("a").css("color","#9C9C9C");
//		$(this).css("color","orangered");
//	})
//	touch.on(".footer_a p","tap",function(){		
//		$("footer").find("a").css("color","#9C9C9C");
//		$(this).parent().css("color","orangered");
//	})
//	touch.on(".footer_a , .footer_a p","tap",function(e){	
//		console.log(e)
//		$("footer").find('a').css("color","#9C9C9C");
//		$(this).css("color","orangered");
//		$('.footer_a').find('a').css("color","orangered");
//		$(this).parent().css("color","orangered");
//	})
	
	touch.on(".store_hide_img","tap",function(){
		$("#hide").hide();
	})
	
//	touch.on(".search-left","tap",function(){
//		$("#search").hide();	
//	})
	touch.on(".header_text","tap",function(){
		$("#search").show();
		
	})
	touch.on(".fa-right","tap",function(){
		$("#search_one").hide();
		$("#search").show();
		
	})
	touch.on(".fa-left","tap",function(){
		$("footer").find('a').css("color","#9C9C9C");
		$("footer").find("p").css("color","#9C9C9C");
		$("#search").hide();	
		$("#search_one").hide();
		$("#hide").show();
		$('footer').find("a").eq(0).css("color","orangered");
		$('footer').find("a").eq(0).find("p").css("color","orangered");
	})
	touch.on(".cart_jump","tap",function(){
		$("footer").find('a').css("color","#9C9C9C");
		$("footer").find("p").css("color","#9C9C9C");
		$('footer').find("a").eq(1).css("color","orangered");
		$('footer').find("a").eq(1).find("p").css("color","orangered");
	})

	//轮播图
	var timer = setInterval(setLunbo,2000);
		var i=0;
	 	function setLunbo(){
	 		i++;
	 	$(".banner_icon").find("li").css("background","#F8F8F8");
 		if(i>5){
 			i=1;
 			$("#banner_imgs").css("left",0);
 		}
	 	if(i==5){
	 		$(".banner_icon").find("li").eq(0).css("background","red");
	 	}
	 	$(".banner_icon").find("li").eq(i).css("background","red");
	 	$("#banner_imgs").animate({
	 		left:-i*($("#banner_imgs").width()/6)
	 	},500)
	 }
	 touch.on("#banner_imgs","tap",function(){
	 	console.log($(this).index());
	 })
	 touch.on("#banner_imgs","swipeleft",function(){
//	 	console.log("wo");
//	 	console.log($(this).index())
	 	var l = $(this).index();
	 	 i = l + 1;
	 	clearInterval(timer);

	 	if( l == 5){
	 		l = 0;
	 		$("#banner_imgs").css("left",-(l)*($("#banner_imgs").width()/6));
	 		
	 	}
	 	
   		$("#banner_imgs").stop().animate({
   			left:-(l+1)*($("#banner_imgs").width()/6)
	 	},500)
   		timer = setInterval(setLunbo,2000);
   		$(".banner_icon").find("li").css("background","#F8F8F8");
   		$(".banner_icon").find("li").eq(l+1).css("background","red");
		if(l == 4){
	 		$(".banner_icon").find("li").eq(0).css("background","red");
	 	}
		
	 })
	 
	  touch.on("#banner_imgs","swiperight",function(){
	 	var r = $(this).index();
	 	i = r - 1;
	 	clearInterval(timer);	
	 	if(r == 0){
	 		r = 5;
	 	$("#banner_imgs").css("left",-(r)*($("#banner_imgs").width()/6));
	 	}
 		$("#banner_imgs").stop().animate({
 			left:-(r-1)*($("#banner_imgs").width()/6)
	 	},500)
 		timer = setInterval(setLunbo,2000);
 		$(".banner_icon").find("li").css("background","#F8F8F8");
 		$(".banner_icon").find("li").eq(r-1).css("background","red");
	 })
})