let questionArray = [
	{
		id: 1,
		questionText: 'There are ______ gates of Lahore',
		options: ['12', '11', '10', '09'],
		answer: '12',
	},
	{
		id: 2,
		questionText: 'Pakistan has a total area of _____ square kilometers',
		options: ['703,940', '803,940', '903,940', '103,940'],
		answer: '803,940',
	},
	{
		id: 3,
		questionText: 'Pakistan has ____ Provices?',
		options: ['one', 'two', 'three', 'four'],
		answer: 'four',
	},
	{
		id: 4,
		questionText: 'Which one is the city of lights',
		options: ['lahore', 'islamabad', 'karachi', 'peshawar'],
		answer: 'karachi',
	},
	{
		id: 5,
		questionText: 'Antarctica is governed by about ___ countries,',
		options: ['30', '40', '20', '10'],
		answer: '30',
	},
	{
		id: 6,
		questionText: 'Since 2006, Hamas and Israel have fought ___ wars, ',
		options: ['six', 'four', 'ten', 'nine'],
		answer: 'four',
	},
	{
		id: 7,
		questionText: 'Palestine is occupied by',
		options: ['usa', 'uk', 'africa', 'israel'],
		answer: 'israel',
	},
	{
		id: 8,
		questionText: ' Indian Muslims launched the Khilafat Movement under the leadership of ',
		options: ['Gandhi and Nehro', 'Mohammad Ali and Shaukat Ali', 'All', 'none'],
		answer: 'Mohammad Ali and Shaukat Ali',
	},
	{
		id: 9,
		questionText: ' Which cancer is most common in Pakistan?',
		options: ['Oral cavity', 'Gastrointestinal ', 'Both', 'none'],
		answer: 'Both',
	},
];
var questionCount = 0;
const quizWrapper = document.querySelector('.quiz');
const quizContent = document.querySelector('.quiz-content');
const quizQuestion = document.querySelector('.question');
const quizOptions = document.querySelector('input');
const radioInputs = document.querySelectorAll('input[type=radio]');
const quizClone = quizContent.cloneNode(true).classList.add('quiz-content');

const submitButton = document.createElement('button');
submitButton.textContent = 'submit';
submitButton.setAttribute('type', 'submit');
submitButton.disabled = true;

questionArray.forEach((question) => {
	var div1 = document.createElement('div');
	div1.classList.add(['quiz']);
	var div2 = document.createElement('div');
	div2.classList.add(['quiz-content']);

	var heading = document.createElement('h2');
	var headingText = document.createTextNode(question.questionText);
	heading.classList.add('question');
	heading.appendChild(headingText);
	div1.appendChild(div2);
	var ul = document.createElement('ul');

	question.options.forEach((opt, index) => {
		const li = document.createElement('li');
		const label = document.createElement('label');
		const input = document.createElement('input');

		input.setAttribute('type', 'radio');
		input.setAttribute('name', question.id);
		input.value = opt;
		input.id = question.id + '-option-' + (index + 1);

		label.setAttribute('for', input.id);
		label.textContent = opt;

		ul.appendChild(li).appendChild(label).appendChild(input);
	});

	div2.appendChild(heading);
	div2.appendChild(ul);
	div1.appendChild(div2);

	document.body.appendChild(div1);
	document.body.appendChild(div1).appendChild(submitButton);
	checkIteration();
});
function checkIteration() {
	for (let i = 0; i < questionArray.length; i++) {
		let selected = document.getElementsByName(questionArray[i].id);
		for (let items of selected) items.addEventListener('click', isAllSelected);
	}
}
function isAllSelected() {
	let current = 0;
	for (let j = 0; j < questionArray.length; j++) {
		let totalInputs = document.getElementsByName(questionArray[j].id);
		for (let k = 0; k < totalInputs.length; k++) {
			if (totalInputs[k].checked) {
				current++;
			}
		}
	}
	if (current >= questionArray.length) {
		submitButton.disabled = false;
		submitButton.addEventListener('click', scoreCount);
	}
}
function scoreCount() {
	window.scrollTo(0, 0);
	let score = 0;
	for (let i = 0; i < questionArray.length; i++) {
		var selectedInputs = document.getElementsByName(questionArray[i].id);
		for (let j = 0; j < selectedInputs.length; j++) {
			if (selectedInputs[j].checked && selectedInputs[j].value === questionArray[i].answer) {
				score = score + 1;
			}
		}
	}
	firstQuestionResult(score);
}
function firstQuestionResult(score) {
	const firstQuestion = document.getElementsByName('answer');
	for (let i = 0; i < firstQuestion.length; i++) {
		if (firstQuestion[i].checked && firstQuestion[i].value === 'lahore') {
			score = score + 1;
		}
	}
	displayResult(score);
}
function displayResult(score) {
	var result = document.createElement('div');
	result.classList.add('result-div');
	result.innerHTML += `<h1>Your corrected questions are ${score}</h1>`;
	document.body.appendChild(result);
	document.body.classList.add('stop-scroll');
	setTimeout(() => {
		result.style.display = 'none';
	}, 5000);
}
