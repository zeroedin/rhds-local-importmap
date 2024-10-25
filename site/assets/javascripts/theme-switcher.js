const themeSwitcher = document.querySelector('.theme-switch rh-switch');
const surface = document.querySelector('rh-surface.container');
const secondaryNav = document.querySelector('rh-navigation-secondary');
const subnav = document.querySelector('rh-subnav');

themeSwitcher.addEventListener('change', function(e) {
  if (e.target.checked) {
    console.log('im light');
    surface.colorPalette = "lightest";
    secondaryNav.colorPalette="lighter";
    subnav.colorPalette="lighter";
  } else {
    console.log('im dark');
    surface.colorPalette = "dark";
    secondaryNav.colorPalette="dark";
    subnav.colorPalette="darker"
  }
})