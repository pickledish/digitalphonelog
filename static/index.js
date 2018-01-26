$(document).ready(function() {

	var date_input=$('input[name="date"]'); //our date input has the name "date"
	var container=$('.bootstrap-iso form').length > 0 ? $('.bootstrap-iso form').parent() : "body";
	var options={format: 'mm/dd/yyyy', container: container, todayHighlight: true, autoclose: true};
	date_input.datepicker(options);

	$('input[name="date"]').datepicker().datepicker("setDate", new Date());
	$('#time').val(getTime());

	var roomList = ["RRL Instructional Suite A","RRL Instructional Suite B", "Genesee 308","Genesee 309", "Genesee 321","Genesee 323", "Genesee 325", "B&L 106", "B&L 109", "B&L 269", "B&L 270", "B&L 315", "CSB 209", "CSB 601", "CSB 632", "CSB 633", "Dewey 1-101", "Dewey 2-110D", "Dewey 2-110E", "Dewey 2-162", "Dewey 4-162", "Gavett 117", "Gavett 202", "Gavett 206", "Gavett 208", "Gavett 244", "Gavett 301", "Gavett 310", "Gavett 312", "Goergen 101", "Goergen 102", "Goergen 108", "Goergen 109", "Goergen 110", "Goergen 431", "Gleason G118", "Gleason G119", "Gleason G120", "Gleason G318/418", "Harkness Basement (B3)", "Harkness 114", "Harkness 115", "Harkness 208", "Harkness 210", "Hoyt Auditorium", "Hubbell Auditorium (141)", "Lander Auditorium (140)", "Hutch 138", "Hutch 473", "Hylan 101", "Hylan 102", "Hylan 105", "Hylan 201", "Hylan 202", "Hylan 203", "Hylan 206", "Hylan 303", "Hylan 305", "Hylan 306", "Hylan 307", "Lattimore 201", "Lattimore 210", "Lattimore 413", "Lattimore 431", "Lechase 103", "Lechase 104", "Lechase 121", "Lechase 122", "Lechase 124", "Lechase 141", "Lechase 143", "Lechase 148", "Lechase 161", "Lechase 163", "Lechase 181", "Lechase 182", "Lechase 184", "Upper Strong", "Lower Strong", "Meliora 203", "Meliora 205", "Meliora 206", "Meliora 209", "Meliora 210", "Meliora 218", "Meliora 219", "Meliora 221", "Meliora 224", "Morey 205", "Morey 321", "Morey 501", "Morey 502", "Morey 504", "Morey 524", "Morey 525", "Rettner 104", "Rettner 106", "Rettner 201", "Rettner 307", "Schlegel 102", "Schlegel 103", "Schlegel 107", "Schlegel 207", "Schlegel 301", "Schlegel 309", "Schlegel 407", "Todd 202", "Wegmans 1005", "Wegmans 1009", "Wegmans 1400", "Wilmot 116", "RRL Lam Square", "RRL Humanities A", "RRL Humanities B", "RRL Humanities C", "RRL Humanities D", "RRL 304", "RRL Gleason", "RRL IT Center", "RRL G108", "RRL G108a", "Wilson Commons 407", "Wilson Commons 121", "Wilson Commons 122", "Wilson Commons Hirst Lounge", "Wilson Commons Gowen Room", "Wilson Commons Havens Lounge", "Wilson Commons Stackel Room(202)"];
	$("#room").typeahead({ source: roomList });

	$(".loader").hide();

	$('input,textarea').attr('autocomplete', 'off');

})

function getTime() {
	var thisTime = new Date();
	var h = thisTime.getHours();
	var m = thisTime.getMinutes();
	var midday = "AM"
	if (m < 10) m = "0" + m;
	if (h > 11) midday = "PM"
	if (h > 12) h = h - 12;
	return h+":"+m+midday
}

function resetField(f) {
	field = $(f);
	fLabel = $(f + "Label");
	fLabel.text("---");
	options = [{text: "---", value: 0}];
	field.replaceOptions(options);
	field.prop('disabled', true);
}

$(document).on('click', '#submit', function(event) {
	event.preventDefault();

	$("#submit").addClass('disabled')
	$(".loader").show();
	$("#submit").prop('style', 'margin-bottom: 18px;')
	
	var formObject = {
		"date": $("#date").val(),
		"time": $("#time").val(),
		"howFind": $("#howFind").val(),
		"category": $('#sel1').find('option:selected').text(),
		"issue": $('#sel2').find('option:selected').text(),
		"details": $('#sel3').find('option:selected').text(),
		"class": $("#class").val(),
		"room": $("#room").val(),
		"name": $("#name").val(),
		"ext": $("#ext").val(),
		"person": $("#person").val(),
		"how": $("#how").val(),
		"length": $("#length").val(),
		"comments": $("#comments").val()
	}

	$.ajax({
		url: '/submit',
		type: 'POST',
		dataType: 'json',
		data: formObject,
	})
	.done(function() {
		console.log("success");
		location.reload();
	})
	.fail(function() {
		console.log("error");
	})
	.always(function() {
		console.log("complete");
	});
});

$(document).on("change", "#sel1", function(){

	//-----------------------------------------------------------------------------#
	// This is the section where we select sel1 for the first time
	//-----------------------------------------------------------------------------#

	if($("#sel1").val() == "Reservation") {
		$("#sel2Label").text("What kind?");
		var options = [ {text: "---", value: 0},
						{text: "Classroom", value: "Classroom"},
						{text: "Equipment - Dongle", value: "Equipment - Dongle"}, 
						{text: "Equipment - Digicam", value: "Equipment - Digicam"},
						{text: "Equipment - DVD Player", value: "Equipment - DVD Player"},
						{text: "Equipment - Portable Projector", value: "Equipment - Portable Projector"},
						{text: "Equipment - Doccam", value: "Equipment - Doccam"}];
		$("#sel2").replaceOptions(options);
		$("#sel2").removeAttr('disabled');

		resetField("#sel3");
		resetField("#sel4");


	} else if($("#sel1").val() == "Troubleshooting") {
		$("#sel2Label").text("Category:");
		var options = [ {text: "---", value: 0},
						{text: "Computer Support", value: "Computer Support"},
						{text: "Installed A/V Equipment", value: "Installed A/V Equipment"},
						{text: "Delivered ECM Equipment", value: "Delivered ECM Equipment"}, 
						{text: "Room Issue", value: "Room Issue"}];
		$("#sel2").replaceOptions(options);
		$("#sel2").removeAttr('disabled');

		resetField("#sel3");
		resetField("#sel4");

	} else if($("#sel1").val() == "General Inquiry") {
		$("#sel2Label").text("Subject:");
		var options = [ {text: "---", value: 0},
						{text: "Lost and Found", value: "Lost and Found"},
						{text: "Equipment", value: "Equipment"},
						{text: "Room Reservation", value: "Room Reservation"}, 
						{text: "Room Info", value: "Room Info"}, 
						{text: "Other", value: "Other"}];
		$("#sel2").replaceOptions(options);
		$("#sel2").removeAttr('disabled');

		resetField("#sel3");
		resetField("#sel4");

	} else if($("#sel1").val() == "ECM Internal") {
		$("#sel2Label").text("From Whom?");
		var options = [ {text: "---", value: 0},
						{text: "Student on Desk Job", value: "Student on Desk Job"},
						{text: "Student on Event Job", value: "Student on Event Job"},
						{text: "Professional Staff", value: "Professional Staff"}];
		$("#sel2").replaceOptions(options);
		$("#sel2").removeAttr('disabled');

		resetField("#sel3");
		resetField("#sel4");
	}
});

$(document).on("change", "#sel2", function(){

	//-----------------------------------------------------------------------------#
	// This is the section where sel1 is "Reservation"
	//-----------------------------------------------------------------------------#

	if ($("#sel2").val() == "Equipment - Digicam") {
		$("#sel3Label").text("Blackboard Access?");
		var options1 = [{text: "---", value: 0},
						{text: "None", value: "None"},
						{text: "Professor Only", value: "Professor Only"}, 
						{text: "All Students", value: "All Students"}];
		$("#sel3").replaceOptions(options1);
		$("#sel3").removeAttr('disabled');

		$("#sel4Label").text("Repeating?");
		var options2 = [{text: "---", value: 0},
						{text: "Yes (write down info)", value: "Yes (write down info)"},
						{text: "No", value: "No"}];
		$("#sel4").replaceOptions(options2);
		$("#sel4").removeAttr('disabled');

	} else if ($("#sel2").val() == "Equipment - Dongle") {
		$("#sel3Label").text("What Type of Dongle?");
		var options1 = [{text: "---", value: 0},
						{text: "USB-C to VGA", value: "USB-C to VGA"},
						{text: "USB-C to HDMI", value: "USB-C to HDMI"},
						{text: "DisplayPort to VGA", value: "DisplayPort to VGA"},
						{text: "DisplayPort to HDMI", value: "DisplayPort to HDMI"},
						{text: "HDMI to VGA", value: "HDMI to VGA"},
						{text: "Lightning to VGA", value: "Lightning to VGA"},
						{text: "Lightning to HDMI", value: "Lightning to HDMI"},
						{text: "Lightning to 1/8in Audio", value: "Lightning to 1/8in Audio"},
						{text: "Mini/Micro HDMI to HDMI", value: "Mini/Micro HDMI to HDMI"},
						{text: "USB to VGA", value: "USB to VGA"},
						{text: "USB to HDMI", value: "USB to HDMI"},
						{text: "Other", value: "Other"}];
		$("#sel3").replaceOptions(options1);
		$("#sel3").removeAttr('disabled');

		$("#sel4Label").text("Repeating?");
		var options2 = [{text: "---", value: 0},
						{text: "Yes (write down info & enter in EMS)", value: "Yes (write down info & enter in EMS)"},
						{text: "No", value: "No"}];
		$("#sel4").replaceOptions(options2);
		$("#sel4").removeAttr('disabled');

	} else if ($("#sel2").val() == "Classroom") {
		$("#sel3Label").text("Forward the Call to Nick?");
		var options1 = [{text: "---", value: 0},
						{text: "Ok, Great!", value: "Ok, Great"}];
		$("#sel3").replaceOptions(options1);
		$("#sel3").removeAttr('disabled');

		resetField("#sel4");

	} else if ($("#sel2").val() == "Equipment - DVD Player") {
		$("#sel3Label").text("What Type of Player?");
		var options1 = [{text: "---", value: 0},
						{text: "Normal (on a cart)", value: "Normal (on a cart)"},
						{text: "PAL (foreign films only)", value: "PAL (foreign films only)"}, 
						{text: "Portable (Sony, Shino)", value: "Portable (Sony, Shino)"}];
		$("#sel3").replaceOptions(options1);
		$("#sel3").removeAttr('disabled');

		$("#sel4Label").text("Repeating?");
		var options2 = [{text: "---", value: 0},
						{text: "Yes (write down info & enter in EMS)", value: "Yes (write down info & enter in EMS)"},
						{text: "No", value: "No"}];
		$("#sel4").replaceOptions(options2);
		$("#sel4").removeAttr('disabled');

	} else if ($("#sel2").val() == "Equipment - Doccam") {
		$("#sel4Label").text("Repeating?");
		var options2 = [{text: "---", value: 0},
						{text: "Yes (write down info & enter in EMS)", value: "Yes (write down info & enter in EMS)"},
						{text: "No", value: "No"}];
		$("#sel4").replaceOptions(options2);
		$("#sel4").removeAttr('disabled');

		resetField("#sel3");

	} else if ($("#sel2").val() == "Equipment - Portable Projector") {
		$("#sel4Label").text("Repeating?");
		var options2 = [{text: "---", value: 0},
						{text: "Yes (write down info & enter in EMS)", value: "Yes (write down info & enter in EMS)"},
						{text: "No", value: "No"}];
		$("#sel4").replaceOptions(options2);
		$("#sel4").removeAttr('disabled');

		resetField("#sel3");

	//-----------------------------------------------------------------------------#
	// This is the section where sel1 is "Troubleshooting"
	//-----------------------------------------------------------------------------#


	} else if ($("#sel2").val() == "Computer Support") {
		$("#sel3Label").text("What's the Problem?");
		var options1 = [{text: "---", value: 0},
						{text: "Hardware Issue", value: "Hardware Issue"},
						{text: "Software Issue", value: "Software Issue"},
						{text: "Licensing Issue", value: "Licensing Issue"},
						{text: "Other", value: "Other"}];
		$("#sel3").replaceOptions(options1);
		$("#sel3").removeAttr('disabled');

		resetField("#sel4");

	} else if ($("#sel2").val() == "Installed A/V Equipment") {
		$("#sel3Label").text("Which Piece of Equipment?");
		var options1 = [{text: "---", value: 0},
						{text: "Crestron System", value: "Crestron System"},
						{text: "Wall-Mounted Display", value: "Wall-Mounted Display"},
						{text: "Ceiling-Mounted Projector", value: "Ceiling-Mounted Projector"},
						{text: "Projector Screen", value: "Projector Screen"},
						{text: "VGA or HDMI Cable", value: "VGA or HDMI Cable"},
						{text: "Microphone (Lav or Lectern)", value: "Microphone (Lav or Lectern)"},
						{text: "Other", value: "Other"}];
		$("#sel3").replaceOptions(options1);
		$("#sel3").removeAttr('disabled');

		resetField("#sel4");

	} else if ($("#sel2").val() == "Delivered ECM Equipment") {
		$("#sel3Label").text("Which Piece of Equipment?");
		var options1 = [{text: "---", value: 0},
						{text: "Doccam", value: "Doccam"},
						{text: "VCR or DVD Player", value: "VCR or DVD Player"},
						{text: "Digicam", value: "Digicam"},
						{text: "Portable Projector", value: "Portable Projector"},
						{text: "Other", value: "Other"}];
		$("#sel3").replaceOptions(options1);
		$("#sel3").removeAttr('disabled');

		resetField("#sel4");

	} else if ($("#sel2").val() == "Room Issue") {
		$("#sel3Label").text("What is Wrong?");
		var options1 = [{text: "---", value: 0},
						{text: "Door Locked", value: "Door Locked"},
						{text: "Lighting Problem", value: "Lighting Problem"},
						{text: "Furniture", value: "Furniture"},
						{text: "Temperature Control", value: "Temperature Control"},
						{text: "Other", value: "Other"}];
		$("#sel3").replaceOptions(options1);
		$("#sel3").removeAttr('disabled');

		resetField("#sel4");
	}
});

(function($, window) {
	$.fn.replaceOptions = function(options) {
	var self, $option;

	this.empty();
	self = this;

	$.each(options, function(index, option) {
	  $option = $("<option></option>")
		.attr("value", option.value)
		.text(option.text);
	  self.append($option);
	});
	};
})(jQuery, window);