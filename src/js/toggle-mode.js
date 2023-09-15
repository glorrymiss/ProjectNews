const switchInputEl = document.querySelector('.switch__input');
const switchInputElMobile = document.querySelector('.switch__input_mobile');
switchInputEl.addEventListener('click', onToggleBtn);
switchInputElMobile.addEventListener('click', onToggleBtn);

localStorageMode();

function onToggleBtn(event) {
  console.log('event', event.currentTarget);

  if (event.currentTarget.checked) {
    document.documentElement.classList.add('dark');
    document.documentElement.classList.remove('light');
    setLocalStorageMode('dark');
  } else {
    event.currentTarget.classList.remove('dark_null');
    document.documentElement.classList.remove('dark');
    document.documentElement.classList.add('light');
    setLocalStorageMode('light');
  }
}

function localStorageMode() {
  const savedMode = getLocalStorageMode();

  if (savedMode === null) {
    setLocalStorageMode('light');
  }

  if (savedMode === 'light') {
    switchInputEl.checked = false;
    switchInputElMobile.checked = false;
  }

  if (savedMode === 'dark') {
    document.documentElement.classList.add('dark');
    document.documentElement.classList.remove('light');
    switchInputEl.classList.add('dark_null');
    switchInputEl.checked = true;

    switchInputElMobile.classList.add('dark_null');
    switchInputElMobile.checked = true;
  }
}

function getLocalStorageMode() {
  return localStorage.getItem('mode');
}

function setLocalStorageMode(modeValue) {
  return localStorage.setItem('mode', modeValue);
}
