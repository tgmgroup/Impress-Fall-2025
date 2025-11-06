var ttss = [
	{
        word: "bloom",
        clue: "Flowers (咲く) in spring. They open up.",
    },
    {
        word: "blossom",
        clue: "Cherry (開花) and plum trees have these beautiful flowers in spring.",
    },
    {
        word: "allergies",
        clue: "If you have peanut (アレルギー), eating peanuts makes you sick.",
    },
    {
        word: "apparent",
        clue: "The boy was crying. It was very (明らかな) that he was sad.",
    },
    {
        word: "hay fever",
        clue: "(花粉症) makes people sneeze and have itchy eyes in spring.",
    },
    {
        word: "pollen",
        clue: "Flowers make yellow (花粉) in spring.",
    },
    {
        word: "occur",
        clue: "When did the earthquake (発生する - happen)?",
    },
    {
        word: "immune system",
        clue: "Your body's (免疫系) fights bad things like germs.",
    },
    {
        word: "react",
        clue: "Your body will (反応する) to pollen with sneezing and runny noses.",
    },
    {
        word: "foreign",
        clue: "Your body sees things like pollen as (異物), not part of you.",
    },
    {
        word: "substance",
        clue: "Water is a liquid (物質).",
    },
    {
        word: "antibodies",
        clue: "Your body makes (抗体) to fight sickness.",
    },
    {
        word: "germs",
        clue: "If you don't wash your hands, you will have many (細菌) on them.",
    },
    {
        word: "allergens",
        clue: "Pollen and dust are (アレルゲン) that give you hay fever.",
    },
    {
        word: "harmful",
        clue: "Things that are bad for you are (有害).",
    },
    {
        word: "leads",
        clue: "Eating healthy food (原因となる) to a strong body.",
    },
    {
        word: "symptoms",
        clue: "Fever and a cough are (症状) that you are sick.",
    },
    {
        word: "avoid",
        clue: "Don't go to dangerous places. You should (避ける) them.",
    },
    {
        word: "medications",
        clue: "Take some (薬 - medicine) to help you feel better.",
    },
    {
        word: "come at a cost",
        clue: "Everything will (犠牲を伴う). Nothing is free or easy.",
    },
	],
	appdata = { maincolor: "#a3f7a", qcount: 15 };
function saveData() {
	localStorage.setItem("ttsasyik", JSON.stringify(appdata));
}
function startttsgame() {
	for (var e, t = [], o = [], a = 0; a < appdata.qcount; a++) {
		var n = ((e = ttss.length), Math.floor(Math.random() * e)),
			i = ttss[n];
		t.push(i.word), o.push(i.clue), ttss.splice(n, 1);
	}
	var r = new Crossword(t, o),
		s = r.getSquareGrid(10);
	if (null != s) {
		(document.getElementById("crossword").innerHTML = CrosswordUtils.toHtml(
			s,
			!0
		)),
			(function (e) {
				for (var t in e) {
					for (var o = [], a = 0; a < e[t].length; a++)
						o.push(
							"<li><strong>" +
								e[t][a].position +
								".</strong> " +
								e[t][a].clue +
								"</li>"
						);
					document.getElementById(t).innerHTML = o.join("\n");
				}
			})(r.getLegend(s));
	} else {
		var c = r.getBadWords(),
			d = [];
		for (a = 0; a < c.length; a++) d.push(c[a].word);
		location.reload();
	}
}
function setqcount(e) {
	(appdata.qcount = e), saveData(), location.reload();
}
function resetsettings() {
	localStorage.clear(), location.reload();
}
function tsep(e) {
	return e.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
function vtext(e) {
	return !!e.match(/^[A-Za-z0-9]+$/);
}
function toggledrawer() {
	$("#drawer").toggle();
}
function removeads() {
	try {
		Android.removeAds();
	} catch (e) {
		console.log(e);
	}
}
function rateapp() {
	try {
		Android.rateApp();
	} catch (e) {
		console.log(e);
	}
}
null === localStorage.getItem("ttsasyik")
	? saveData()
	: (appdata = JSON.parse(localStorage.getItem("ttsasyik")));
var canswershown = !1;
function toggleAnswer() {
	canswershown
		? ($(".canswer").hide(), $(".uanswer").show(), (canswershown = !1))
		: ($(".canswer").show(), $(".uanswer").hide(), (canswershown = !0)),
		ciihuy.showAd();
}
function activatetts() {
	$("td").click(function () {
		"&nbsp;" != $(this).find(".canswer").html() &&
			null != $(this).find(".canswer").html() &&
			(console.log("Clicked: " + $(this).find(".canswer").html()),
			console.log($(this).find(".uanswer").attr("id")),
			(selectedua = $(this).find(".uanswer").attr("id")),
			$("#vkeyboard").show());
	});
}
var selectedua = -1;
function typechar(e) {
	$("#" + selectedua).html(e), $("#vkeyboard").hide();
}
function initvkeyboard() {
	for (
		var e = [
				"a",
				"b",
				"c",
				"d",
				"e",
				"f",
				"g",
				"h",
				"i",
				"j",
				"k",
				"l",
				"m",
				"n",
				"o",
				"p",
				"q",
				"r",
				"s",
				"t",
				"u",
				"v",
				"w",
				"x",
				"y",
				"z",
				"-",
				"\u00A0",
			],
			t = 0;
		t < e.length;
		t++
	)
		$("#kbtnlist").append(
			"<div class='kbtn' onclick=typechar('" + e[t] + "')>" + e[t] + "</div>"
		);
}
setTimeout(function () {
	startttsgame(),
		activatetts(),
		initvkeyboard(),
		$("#crossword").css({
			width: 32 * $("tbody:eq(0)").find("tr:eq(0)").find("td").length + "px",
		}),
		$("#game").show();
}, 1500);
