const key = "1fe6de2414c0e45cbe542993d8a8bcc8";
const token = "048724b5e1d4d9508bdfb6bd227fcb97b8d6bd57dfb7d2f7a817da8a000f31cb";
let boardsAPI = `https://api.trello.com/1/members/me/boards?key=${key}&token=${token}`;
let boards = [];
//let lists = [];
let allLabels = [];
let listItems = [];
let cardsJSON = [];
let boardNamePrinted;
let labelsArray = [];
const listTasks = "5602e1e9dec8c54f1318fdb8";
const listPriority = "5638e3756207eff99fd93982";
const listWip = "5638e379a335523875e45cae";
const listDone = "5638e37cca3f0975da4b4bf2";
function whichList(listID){
	listItems = cardsJSON.filter( item => item.idList == listID);
	console.log(listItems);
	render(listItems)
}
function whichLabel(labelName){
	allLabels = cardsJSON.filter( item => item.label[0] == labelName);
	//console.log(allLabels);
	render(allLabels)
}
function bindLabelsClick(){
	$('small').on('click', function(){
		let name = $(this).text();
		whichLabel(name);
	});
}
function cards(boardID){
	let api = `https://api.trello.com/1/boards/${boardID}/cards?key=${key}&token=${token}`;
	return axios.get(api);
}
function getLabels(boardID){
	let api = `https://api.trello.com/1/boards/${boardID}/labels?key=${key}&token=${token}`;
	return axios.get(api);
}
function moveTo(listID, cardID){
	let api = `https://api.trello.com/1/cards/${cardID}/idList?value=${listID}&key=${key}&token=${token}`;
	return axios.put(api);
}
function lists(listID){
	let api = `https://api.trello.com/1/lists/${listID}?fields=name&key=${key}&token=${token}`;
	return axios.get(api);
}
cards("5602d950ca4c6f4c761af78e").then(res => {
	let cards = res.data;
	console.log(cards);
	cards.map(card => {
		if (card.idList !== "5638e37cca3f0975da4b4bf2"){ // done list
			let labels = [];
			let name = card.name;
			let isHighlited = false;
			if(card.name.indexOf('flag') !== -1){
				name = card.name.replace('flag', '');
				isHighlited = true;
			}
			card.labels.map(label =>labels.push(label.name));
			cardsJSON.push({
				"name": name,
				"label": labels,
				"idList": card.idList,
				"due": card.due,
				"id": card.id,
				"isHighlited": isHighlited
			})
		}
	})
	let sortByDate = cardsJSON.sort(function(a,b){ // asc
	  return new Date(a.due) - new Date(b.due);
	});
	render(sortByDate);

	//create
	$('.close').on('click', function(){
		closeModal();
	});
	labelsArray.map(label => {
		$('.labels').append(`<option value="${label.id}">${label.name}</option>`);
	});
	let labelID;
	$('.labels').on('change', function () {
		labelID = $(this).val();
	});
	$('.createTask').on('click', function(){
		let name = $('.create input').val();
		createTask(name, labelID).then(res => {
			if(res.status == 200) {
				location.reload();
			}else{
				alert("Boomm", res.status)
			}
		})
	})
})
getLabels("5602d950ca4c6f4c761af78e").then(res => {
	res.data.map(item => {
		labelsArray.push({
			"name": item.name,
			"id": item.id
		});
		$('#labels').append(`<option value="${item.name}">${item.name}</option>`);
	});
	$('#labels').on('change', function () {
		let val = $(this).val();
		whichLabel(val);
	});
	//console.log(labelsArray);
})
function createTask(name, label){
	let api = `https://api.trello.com/1/cards/?name=${name}&idList=${listTasks}&idLabels=${label}&key=${key}&token=${token}`;
	return axios.post(api);
}
function render(data){
	//console.log(data);
	$('.content ul').html('');
	data.map(item => {
		$('.content ul').append(`
			<li data-id="${item.id}" class="${item.isHighlited ? 'highlight' : ''}">
				<span>${item.name}</span>
				<b>${item.due ? formatDate(new Date(item.due)) : ''}</b>
				<small class="${item.color}">${item.label.join(',')}</small>
				<i class="fa fa-ellipsis-h"></i>
				<select class="menu">
	    			<option value="" disabled selected>Mover para</option>
	    			<option value="${listTasks}">Tasks</option>
	    			<option value="${listPriority}">Priority</option>
	    			<option value="${listWip}">WIP</option>
	    			<option value="${listDone}">Done</option>
	    		</select>
			</li>
			`);
	})
	$('.menu').on('click', function (e) {e.stopPropagation()});
	$('.menu').on('change', function (e) {
		let listID = $(this).val();
		let cardID = $(this).closest('li').data('id');
		moveTo(listID, cardID).then(res => {
			if(res.status == 200) {
				location.reload();
			}else{
				alert("Boomm", res.status)
			}
		});
	});
	$('li').on('click', function (e) {
		let itemID = $(this).data('id');
		let name = $(this).find('span').text();
		if ($(this).hasClass('highlight')) {
			nameWithFlag = name;
		} else {
			nameWithFlag = `${name} flag`;
		}
		let api = `https://api.trello.com/1/cards/${itemID}?name=${nameWithFlag}&key=${key}&token=${token}`;
		$(this).toggleClass('highlight');
		axios.put(api).then(res => {
			if (res.status == 200) {
				location.reload();
			} else {
				alert("Boomm", res.status)
			}
		});
	})
	bindLabelsClick();
}
function openModal(){
	$('.create').addClass('active');
}
function closeModal(){
	$('.create').removeClass('active');
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

$('.button').on('click', function() {
	$('.button').removeClass('active');
	$(this).addClass('active');
	whichList($(this).data('list'));
});
$('.createButton').on('click', function() {
	openModal();
});
