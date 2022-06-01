var $photoUrl = document.querySelector('#photo-url');
var $title = document.querySelector('#title');
var $notes = document.querySelector('#notes');
var $imgSrc = document.querySelector('.placeholder-img');
var $form = document.querySelector('#form-entry');
var $editTitle = document.querySelector('.entry-form-title');

$photoUrl.addEventListener('input', function (event) {
  $imgSrc.setAttribute('src', $photoUrl.value);
});

$form.addEventListener('submit', submitEventFunction);

// submit function
function submitEventFunction(event) {
  event.preventDefault();

  if (data.editing === null) {
    var newEntryData = {
      entryId: data.nextEntryId,
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
  } else {
    var editEntryData = {
      entryId: data.editing.entryId,
      title: $title.value,
      photoUrl: $photoUrl.value,
      notes: $notes.value
    };
    var $listElements = document.querySelectorAll('li');
    var replaceEntryData = renderEntry(editEntryData);
    for (var i = 0; i < data.entries.length; i++) {
      var retrievingEditDataId = $listElements[i].getAttribute('data-entry-id');
      var matchEntryId = String(data.editing.entryId);
      if (retrievingEditDataId === matchEntryId) {
        $listElements[i].replaceWith(replaceEntryData);
        data.entries[i] = editEntryData;
      }
    }
  }

  $imgSrc.setAttribute('src', 'images/placeholder-image-square.jpg');
  $form.reset();
  data.editing = null;
  changeViews('entries');
}

// render entry function
function renderEntry(entry) {
  var listEl = document.createElement('li');
  listEl.setAttribute('data-entry-id', entry.entryId);
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
  h2Element.setAttribute('class', 'title-margin-top display-flex space-between');
  h2Element.textContent = entry.title;
  columnDiv2.appendChild(h2Element);

  var editIcon = document.createElement('i');
  editIcon.setAttribute('class', 'fa-solid fa-pen-to-square style-icon');
  editIcon.setAttribute('data-entry-id', entry.entryId);
  h2Element.appendChild(editIcon);

  var pElement = document.createElement('p');
  pElement.textContent = entry.notes;
  columnDiv2.appendChild(pElement);

  return listEl;

}

// rendering list to ul
var $ul = document.querySelector('#entries-ul');
window.addEventListener('DOMContentLoaded', function (event) {
  for (var i = 0; i < data.entries.length; i++) {
    var entry = renderEntry(data.entries[i]);
    $ul.appendChild(entry);
  }
  changeViews(data.view);
});

// button new and entries click events
var $entriesButton = document.querySelector('#entries-button');
var $buttonNew = document.querySelector('#button-new');

$buttonNew.addEventListener('click', function (event) {
  resetForm();
  $editTitle.textContent = 'New Entry';
  changeViews('entry-form');
});

$entriesButton.addEventListener('click', function (event) {
  resetForm();
  changeViews('entries');
});

// changing view pages
var $views = document.querySelectorAll('[data-view]');
function changeViews(view) {
  for (var i = 0; i < $views.length; i++) {
    var pageView = $views[i];
    if (view === pageView.getAttribute('data-view')) {
      pageView.classList.remove('hidden');
    } else {
      pageView.classList.add('hidden');
    }
  }
  data.view = view;
}

// resetting any inputs in entry-form view
function resetForm(entry) {
  $title.value = '';
  $photoUrl.value = '';
  $notes.value = '';
  $imgSrc.setAttribute('src', 'images/placeholder-image-square.jpg');
}

// click event for edit icon
$ul.addEventListener('click', function (event) {
  if (event.target.tagName !== 'I') {
    return;
  }
  if (event.target.tagName === 'I') {
    for (var i = 0; i < data.entries.length; i++) {
      var entryIdx = data.entries[i];
      if (parseInt(event.target.getAttribute('data-entry-id')) === entryIdx.entryId) {
        data.editing = entryIdx;
      }
    }
  }

  changeViews('entry-form');
  editEntry(data.editing);
  $editTitle.textContent = 'Edit Entry';
});

function editEntry(object) {
  $title.value = object.title;
  $photoUrl.value = object.photoUrl;
  $notes.value = object.notes;
  $imgSrc.setAttribute('src', object.photoUrl);
}
