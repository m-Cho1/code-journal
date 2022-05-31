var $photoUrl = document.querySelector('#photo-url');
var $title = document.querySelector('#title');
var $notes = document.querySelector('#notes');
var $imgSrc = document.querySelector('.placeholder-img');
var $form = document.querySelector('#form-entry');

$photoUrl.addEventListener('input', function (event) {
  $imgSrc.setAttribute('src', $photoUrl.value);
});

$form.addEventListener('submit', submitEventFunction);

function submitEventFunction(event) {
  event.preventDefault();
  var newEntryData = {
    nextEntryId: data.nextEntryId,
    title: $title.value,
    photoUrl: $photoUrl.value,
    notes: $notes.value
  };
  data.nextEntryId++;
  data.entries.unshift(newEntryData);
  $imgSrc.setAttribute('src', 'images/placeholder-image-square.jpg');
  var submitEntry = renderEntry(data.entries[0]);
  $ul.prepend(submitEntry);
  $form.reset();
  changeViews('entries');
}

function renderEntry(entry) {
  var listEl = document.createElement('li');
  listEl.setAttribute('class', 'style-list-entry');

  var containerDiv = document.createElement('div');
  containerDiv.setAttribute('class', 'container');
  listEl.appendChild(containerDiv);

  var rowDiv = document.createElement('div');
  rowDiv.setAttribute('class', 'row');
  containerDiv.appendChild(rowDiv);

  var columnDiv1 = document.createElement('div');
  columnDiv1.setAttribute('class', 'column-half');
  rowDiv.appendChild(columnDiv1);

  var imgEl = document.createElement('img');
  imgEl.setAttribute('class', 'style-image-entry');
  imgEl.setAttribute('src', entry.photoUrl);
  imgEl.setAttribute('alt', 'image');
  columnDiv1.appendChild(imgEl);

  var columnDiv2 = document.createElement('div');
  columnDiv2.setAttribute('class', 'column-half font line-height');
  rowDiv.appendChild(columnDiv2);

  var h2Element = document.createElement('h2');
  h2Element.setAttribute('class', 'title-margin-top');
  h2Element.textContent = entry.title;
  columnDiv2.appendChild(h2Element);

  var pElement = document.createElement('p');
  pElement.textContent = entry.notes;
  columnDiv2.appendChild(pElement);

  return listEl;

}

var $ul = document.querySelector('#entries-ul');
window.addEventListener('DOMContentLoaded', function (event) {
  for (var i = 0; i < data.entries.length; i++) {
    var entry = renderEntry(data.entries[i]);
    $ul.appendChild(entry);
  }
});

var $entriesButton = document.querySelector('#entries-button');
var $buttonNew = document.querySelector('#button-new');

$buttonNew.addEventListener('click', function (event) {
  resetForm();
  changeViews('entry-form');
});

$entriesButton.addEventListener('click', function (event) {
  resetForm();
  changeViews('entries');
});

var $views = document.querySelectorAll('[data-view]');
function changeViews(view) {
  for (var i = 0; i < $views.length; i++) {
    var pagetView = $views[i];
    if (view === pagetView.getAttribute('data-view')) {
      pagetView.classList.remove('hidden');
    } else {
      pagetView.classList.add('hidden');
    }
  }
}

function resetForm(entry) {
  $title.value = '';
  $photoUrl.value = '';
  $notes.value = '';
  $imgSrc.setAttribute('src', 'images/placeholder-image-square.jpg');
}
