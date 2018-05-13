const key = "90369978b88f25b492536fd7dfdebbc0";
const token = "84936dfde53b06de669e71a6f9c392b887e3b3ea3eb77d211075c8b3087b144e";
let boardsAPI = `https://api.trello.com/1/members/me/boards?key=${key}&token=${token}`;
let boards = [];
//let lists = [];
let allLabels = [];
let listItems = [];
let cardsJSON = [];
let boardNamePrinted;
function whichList(listID){
	listItems = cardsJSON.filter( item => item.idList == listID);
	//console.log(listItems);
	render(listItems)
}
function whichLabel(labelName){
	allLabels = cardsJSON.filter( item => item.label[0] == labelName);
	//console.log(allLabels);
	render(allLabels)
}
function cards(boardID){
	let api = `https://api.trello.com/1/boards/${boardID}/cards?key=${key}&token=${token}`;
	return axios.get(api);
}
function getLabels(boardID){
	let api = `https://api.trello.com/1/boards/${boardID}/labels?key=${key}&token=${token}`;
	return axios.get(api);
}
function lists(listID){
	let api = `https://api.trello.com/1/lists/${listID}?fields=name&key=${key}&token=${token}`;
	return axios.get(api);
}
// function lists(boardID){
// 	let api = `https://api.trello.com/1/boards/${boardID}/lists?key=${key}&token=${token}`;
// 	return axios.get(api);
// }

// axios.get(boardsAPI).then(function (res) {
// 	console.log(res.data);
// 	res.data.map(board => {
// 		cards(board.id).then(res => {
// 			boards.push(res.data);
// 		})
// 	});
// }).catch(function (error) {
//  console.log(error);
// });
//
cards("5af78e6aa8d84903f0601b2c").then(res => {
	let cards = res.data;
	cards.map(card => {
		let labels = [];
		card.labels.map(label =>labels.push(label.name));
		cardsJSON.push({
			"name": card.name,
			"label": labels,
			"idList": card.idList,
			"color": card.labels[0].color
		})
	})
	render(cardsJSON);
})
getLabels("5af78e6aa8d84903f0601b2c").then(res => {
	res.data.map(item => {
		$('select').append(`<option value="${item.name}">${item.name}</option>`);
	});
	$('select').on('change', function () {
		let val = $(this).val();
		whichLabel(val);
	});
})
function render(data){
	//console.log(data);
	$('.content ul').html('');
	data.map(item => {
		$('.content ul').append(`<li>${item.name} <small class="${item.color}">${item.label.join(',')}</small></li>`);
	})
}

function prioridades(){
	$('.content ul').html('');
	boards.map(item => {
		item.map(board => {
			console.log(board)
			if(board.idList == "5a974a07dbaf6d0a312320e8"){
				$('.content ul').append(`<li>${board.name} ${board.due ? formatDate(new Date(board.due)) : ''}</li>`);
			}
		})
	})
}

function datas(){
	$('.content ul').html('');
	boards.map(item => {
		item.map(board => {
			if(board.due){
				$('.content ul').append(`<li>${board.name} : ${formatDate(new Date(board.due))}</li>`);
			}
		})
	})
}
function prioridades(){
	$('.content ul').html('');
	boards.map(item => {
		item.map(board => {
			console.log(board)
			if(board.idList == "5a974a07dbaf6d0a312320e8"){
				$('.content ul').append(`<li>${board.name} ${board.due ? formatDate(new Date(board.due)) : ''}</li>`);
			}
		})
	})
}

function formatDate(date) {
  var monthNames = [
    "January", "February", "March",
    "April", "May", "June", "July",
    "August", "September", "October",
    "November", "December"
  ];

  var day = date.getDate();
  var monthIndex = date.getMonth();
  var year = date.getFullYear();

  return day + ' ' + monthNames[monthIndex];
}

function trigger(button, fn){
	document.querySelector(button).addEventListener('click', function(){
		fn();
	});
}
$('button').on('click', function() {
	whichList($(this).data('list'));
});
//
// trigger('#habitos', habitos);
// trigger('#datas', datas);
// trigger('#facaprimeiro', prioridades);
