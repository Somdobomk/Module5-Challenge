let workDay = {
	'8 AM': '',
	'9 AM': '',
	'10 AM': '',
	'11 AM': '',
	'12 PM': '',
	'1 PM': '',
	'2 PM': '',
	'3 PM': '',
	'4 PM': '',
	'5 PM': '',
};

$(document).ready(function () {
	$('#add-time').on('click', function () {
		let time = $('#time').val();
		let task = $('#task').val();
		workDay[time] = task;
		console.log(workDay);
		$('#time').val('');
		$('#task').val('');
		render();
	});
});

$('#date-today h6').text(moment().format('MMMM Do YYYY'));

let counter = 0;
for (const property in workDay) {
	if (workDay.hasOwnProperty(property)) {
		counter++;
	}
}

$('button').on('click', function () {
	$('#date-today h6').text(
		moment().add(counter, 'days').format('MMMM Do YYYY')
	);
	counter++;
	render();
});

function hourNumberFromHourString(hourString) {
	switch (hourString) {
		case '8 AM':
			return 8;
		case '9 AM':
			return 9;
		case '10 AM':
			return 10;
		case '11 AM':
			return 11;
		case '12 PM':
			return 12;
		case '1 PM':
			return 13;
		case '2 PM':
			return 14;
		case '3 PM':
			return 15;
		case '4 PM':
			return 16;
		case '5 PM':
			return 17;
		default:
			return 0;
	}
}

function loadCorrectDataset() {
	let hourNumber = hourNumberFromHourString(moment().format('hA'));
	if (hourNumber < 12) {
		return workDay;
	} else if (hourNumber < 17) {
		return workDay;
	} else {
		return workDay;
	}
}

function initializeLocalStorage() {
	if (!localStorage.getItem('workDay')) {
		localStorage.setItem('workDay', JSON.stringify(workDay));
	}
}

function saveToLocalStorage(dayObj) {
	localStorage.setItem('workDay', JSON.stringify(dayObj));
}

function saveSchedule(hourString, val) {
	if (!localStorage.getItem('workDay')) {
		initializeLocalStorage();
	}
	let dayObj = JSON.parse(localStorage.getItem('workDay'));
	dayObj[hourString] = val;
	saveToLocalStorage(dayObj);
}

function updateCalendarTasks(dayObject) {
	for (const property in dayObject) {
		if (dayObject.hasOwnProperty(property)) {
			$(`#${property}`).text(dayObject[property]);
		}
	}
}
