$("li.dropdown").click(function(){
	if($(this).hasClass("open")) {
		$(this).find(".dropdown-menu").slideUp("fast");
		$(this).removeClass("open");
	}
	else { 
		$(this).find(".dropdown-menu").slideDown("fast");
		$(this).toggleClass("open");
	}
});

// Close dropdown on mouseleave
$("li.dropdown").mouseleave(function(){
	$(this).find(".dropdown-menu").slideUp("fast");
	$(this).removeClass("open");
});

// Navbar toggle
$(".navbar-toggle").click(function(){
	$(".navbar-collapse").toggleClass("collapse").slideToggle("fast");
});

const f = $("daform");
const s = $("searchbar");
const google = "https://www.google.com/search?q=site%3A+";
const site = "itsnotcatchy.com";

function submit(event) {
	event.preventDefault();
	const url = google + site + "+" + s.value;
	const win = window.open(url, '_blank');
	win.focus();
}

f.addEventListener("submit", submitted);