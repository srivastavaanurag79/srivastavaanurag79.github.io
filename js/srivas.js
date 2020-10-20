// Save elements into variables to prevent
// further redundant firing of jQuery selector
const doc = $(document)
const body = $('body')
const cursorWrapper = $('.cursor')
const cursor = $('.cursor > div')

// MobMenu will be visible/hidden based on this value
let mobMenuVisible = false

// Allocate openMobMenu, closeMobMenu and toggleMobMenu functions
// into RAM for usage without further allocation
const openMobMenu = () => {
  mobMenuVisible = true
  body.addClass('disable-scroll')
}
const closeMobMenu = () => {
  mobMenuVisible = false
  setTimeout(() => {
    body.removeClass('disable-scroll')
  }, 401)
}
const toggleMobMenu = () => {
  if (mobMenuVisible) {
    closeMobMenu()
  } else {
    openMobMenu()
  }
}

// Toggle MobMenu when the user clicks the MobMenu button
doc.on('click', '.header_wrap .navbar_mobile', toggleMobMenu)

// Close MobMenu when the user clicks a link in it
doc.on('click', '.responsive-menu a', closeMobMenu)

// Hide the cursor initially to prevent it from showing
// in the top left corner of the screen
let cursorVisible = false

// Allocate the handleMouseMove event handler into RAM
const handleMouseMove = e => {
  const x = e.clientX
  const y = e.clientY

  cursor.css('transform', `translate(${x}px, ${y}px)`)

  if (!cursorVisible) {
    cursorWrapper.css('opacity', '1')
    cursorVisible = true
  }
}

// Calculate the cursor position when mouse enters the document
document.addEventListener('mouseenter', handleMouseMove)

// Register the mousemove event listener
document.addEventListener('mousemove', handleMouseMove)

// Allocate cursor class naming functions
// into RAM for usage without further allocation
const cursorSetActive = () => cursor.addClass('active')
const cursorSetInactive = () => cursor.removeClass('active')
const cursorSetOpen = () => cursor.addClass('open')
const cursorSetSend = () => cursor.addClass('send')
const cursorSetNormal = () => cursor.removeClass('open send')

// Handle special cursor classes
$('.link_cursor')
  .on('mouseenter', cursorSetActive)
  .on('mouseleave', cursorSetInactive)

$('.send_link')
  .on('mouseenter', cursorSetSend)
  .on('mouseleave', cursorSetNormal)

$('.project_link')
  .on('mouseenter', cursorSetOpen)
  .on('mouseleave', cursorSetNormal)
