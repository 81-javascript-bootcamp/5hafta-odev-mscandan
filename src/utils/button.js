export const changeButtonDisable = ($btn) => {
  if ($btn.getAttribute('disabled')) {
    $btn.removeAttribute('disabled');
    $btn.innerText = 'Add Task';
  } else {
    $btn.setAttribute('disabled', true);
    $btn.innerText = 'Adding...';
  }
};
