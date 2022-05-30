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
    title: $title.value,
    photoUrl: $photoUrl.value,
    notes: $notes.value,
    nextEntryId: data.nextEntryId
  };
  data.nextEntryId++;
  data.entries.unshift(newEntryData);
  $imgSrc.setAttribute('src', 'images/placeholder-image-square.jpg');
  $form.reset();
}
