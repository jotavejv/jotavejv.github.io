const key = "90369978b88f25b492536fd7dfdebbc0";
const token = "84936dfde53b06de669e71a6f9c392b887e3b3ea3eb77d211075c8b3087b144e";
let boardsAPI = `https://api.trello.com/1/members/me/boards?key=${key}&token=${token}`;
let boards = [];
//let lists = [];
let allLabels = [];
let listItems = [];
let cardsJSON = [];
let boardNamePrinted;
const listTasks = "5af78e7ac91d7add92c8f78e";
const listPriority = "5af78e97f3374a701d0cc2f9";
const listWip = "5af78ea3ef160aa530af298a";
const listDone = "5af78ea7b339d5de4d4eca92";
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
cards("5af78e6aa8d84903f0601b2c").then(res => {
	let cards = res.data;
	//console.log(cards);
	cards.map(card => {
		if(card.idList !== "5af78ea7b339d5de4d4eca92"){ // done list
			let labels = [];
			card.labels.map(label =>labels.push(label.name));
			cardsJSON.push({
				"name": card.name,
				"label": labels,
				"idList": card.idList,
				"color": card.labels[0].color,
				"due": card.due,
				"id": card.id
			})
		}
	})
	let sortByDate = cardsJSON.sort(function(a,b){ // asc
	  return new Date(a.due) - new Date(b.due);
	});
	render(sortByDate);
})
getLabels("5af78e6aa8d84903f0601b2c").then(res => {
	res.data.map(item => {
		$('#labels').append(`<option value="${item.name}">${item.name}</option>`);
	});
	$('#labels').on('change', function () {
		let val = $(this).val();
		whichLabel(val);
	});
})
function render(data){
	//console.log(data);
	$('.content ul').html('');
	data.map(item => {
		$('.content ul').append(`
			<li data-id="${item.id}">${item.name}
				<span>${item.due ? formatDate(new Date(item.due)) : ''}</span>
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
	$('.menu').on('change', function () {
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
	bindLabelsClick();
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

$('button').on('click', function() {
	whichList($(this).data('list'));
});
