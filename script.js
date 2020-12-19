$(function() {

	var plansza = new Array(8);

	function wygrana(znak){
		if(znak=='o') {
			//console.log("Wygrał: ", gracz1);
			var winner = $("span.p1").text();
			console.log("Wygrał: ", winner);
			alert("Wygrał " + winner);
			var info = "Wygrał gracz: " + winner;
		} else if(znak=='x') {
			var winner = $("span.p2").text();
			console.log("Wygrał: ", winner);
			alert("Wygrał " + winner);
			var info = "Wygrał gracz: " + winner;
		} else if(znak=='r') {
			console.log("Remis");
			alert("REMIS");
			var info = "REMIS :)"		
		}
		$("table#plansza").fadeOut("slow");
		$("span.message").text(info);
		$("div#wynik").fadeIn("slow");
	}

	function sprawdz(znak){
		console.log("znak w tablicy = ", znak);
		console.log("ile img.blank: " + $("table#plansza img.blank").length);
		// poziom
		if(plansza[0]==znak && plansza[1]==znak && plansza[2]==znak){
			wygrana(znak);
		} else 
		if(plansza[3]==znak && plansza[4]==znak && plansza[5]==znak){
			wygrana(znak);
		} else
		if(plansza[6]==znak && plansza[7]==znak && plansza[8]==znak){
			wygrana(znak);
		} else
		// pion
		if(plansza[0]==znak && plansza[3]==znak && plansza[6]==znak){
			wygrana(znak);
		} else
		if(plansza[1]==znak && plansza[4]==znak && plansza[7]==znak){
			wygrana(znak);
		} else
		if(plansza[2]==znak && plansza[5]==znak && plansza[8]==znak){
			wygrana(znak);
		} else
		// 2 x skrzyżowanie
		if(plansza[2]==znak && plansza[4]==znak && plansza[6]==znak){
			wygrana(znak);
		} else
		if(plansza[0]==znak && plansza[4]==znak && plansza[8]==znak){
			wygrana(znak);
		} else
		if($("table#plansza img.blank").length == 0){
			console.log("REMIS");
			wygrana('r');
		}		
	}

	// obramowanie do planszy
	function rysujPlansze(){
		var kolor="#f00";
		$("table#plansza td").eq(0).css("border-right","1px solid"+kolor).css("border-bottom","1px solid"+kolor);
		$("table#plansza td").eq(1).css("border-left","1px solid"+kolor).css("border-bottom","1px solid"+kolor).css("border-right","1px solid"+kolor);
		$("table#plansza td").eq(2).css("border-left","1px solid"+kolor).css("border-bottom","1px solid"+kolor);

		$("table#plansza td").eq(3).css("border-top","1px solid"+kolor).css("border-bottom","1px solid"+kolor).css("border-right","1px solid"+kolor);
		$("table#plansza td").eq(4).css("border-top","1px solid"+kolor).css("border-bottom","1px solid"+kolor).css("border-left","1px solid"+kolor).css("border-right","1px solid"+kolor);
		$("table#plansza td").eq(5).css("border-top","1px solid"+kolor).css("border-bottom","1px solid"+kolor).css("border-left","1px solid"+kolor);

		$("table#plansza td").eq(6).css("border-right","1px solid"+kolor).css("border-top","1px solid"+kolor);
		$("table#plansza td").eq(7).css("border-left","1px solid"+kolor).css("border-top","1px solid"+kolor).css("border-right","1px solid"+kolor);
		$("table#plansza td").eq(8).css("border-left","1px solid"+kolor).css("border-top","1px solid"+kolor);
		//$("table#plansza img").addClass("blank")
	}

	$("#formularz form").submit(function(){
		var gracz1 = $("input[name='p1']").val();
		var gracz2 = $("input[name='p2']").val();
		console.log("p1 = ", gracz1);
		console.log("p2 = ", gracz2);
		if(gracz1 == gracz2) {
			$("span.error").text("Imiona graczy muszą być różne").fadeIn("slow").fadeOut(5000);
			//$("span#error").css("display","block");
			//$("div#error").text("Imiona graczy muszą być różne");
		} else 
		{
			if(gracz1.length < 3 || gracz2.length < 3) {
				$("span.error").text("Każde imię ma więcej niż 2 znaki").fadeIn("slow").fadeOut(5000);

			} else {
				$("span.error").text("");
				$("span.p1").text(gracz1).addClass("active_player");
				$("span.p2").text(gracz2);
				$("#start").slideUp("slow");
				$("#gra").slideDown("slow");
			}	
		};
		return false;
	});

	$("table#plansza img.blank").click(function(){
		if($(this).attr("src") == "./img/blank.jpg"){

			// pobranie index-u klikniętego obrazka
			// var index = $(this).index(this); // nie działa ???
			var index = $('table#plansza img').index(this);
			console.log("index klikniętego obrazka = ", index);

			$(this).removeClass("blank");

			//alert("klik na planszy");
			if($("span.p1.active_player").length) {
				// obsluga dla gracza 1
				//alert("player 1 " + $(this).attr("src"));
				var gracz = 1;
				$(this).attr("src","./img/kolo.jpg");
				//alert("img " + $(this).attr("src"));
				//alert("class p1" + $("span.p1").attr("class"));
				$("span.p1").removeClass("active_player");
				//alert("class p1" + $("span.p1").attr("class"));
				$("span.p2").addClass("active_player");
				plansza[index] = "o";
				sprawdz("o");
			} else {
				// obsługa dla gracza 2
				var gracz = 2;
				$(this).attr("src","./img/krzyzyk.jpg");
				$("span.p2").removeClass("active_player");
				$("span.p1").addClass("active_player");	
				plansza[index] = "x";
				sprawdz("x");
			};
		};
	});

rysujPlansze();

});



