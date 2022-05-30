var $photoUrl = document.querySelector('#photo-url');
var $imgSrc = document.querySelector('.placeholder-img');

$photoUrl.addEventListener('input', function (event) {
  $imgSrc.setAttribute('src', $photoUrl.value);
});
