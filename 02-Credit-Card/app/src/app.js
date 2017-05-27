import './style.scss';   

const target = document.getElementById('target')

const mousemove = Rx.Observable.fromEvent(document, 'mousemove')
const touchmove = Rx.Observable.fromEvent(document, 'touchmove')

const mousedown = Rx.Observable.fromEvent(target, 'mousedown')
const touchstart = Rx.Observable.fromEvent(target, 'touchstart')

const mouseup = Rx.Observable.fromEvent(document, 'mouseup')
const touchend = Rx.Observable.fromEvent(document, 'touchend')

const mousedrag = mousedown.flatMap(md => {
  const rect = target.getBoundingClientRect()

  const startX = md.offsetX
  const startY = md.offsetY
  
  return mousemove.map(mm => {
    mm.preventDefault()
    
    return {
      left: mm.clientX - startX,
      top: mm.clientY - startY
    }
  }).takeUntil(mouseup)
})

const touchdrag = touchstart.flatMap(ts => {
  const rect = target.getBoundingClientRect()
  
  const startX = ts.targetTouches[0].clientX - rect.left
  const startY = ts.targetTouches[0].clientY - rect.top
  
  return touchmove.map(tm => {
    tm.preventDefault()
    
    return {
      left: tm.targetTouches[0].clientX - startX,
      top: tm.targetTouches[0].clientY - startY
    }
  }).takeUntil(touchend)
})

const drag = Rx.Observable.merge(mousedrag, touchdrag)

const dt = 5

const velocity = drag.throttle(dt).pairwise().map(md => {
  let sx = md[1].left - md[0].left
  let sy = md[0].top - md[1].top
  
  let vx = sx / dt // pixels/milisecond
  let vy = sy / dt
  
  return { vx, vy }
})

velocity.subscribe(vel => {
  let x = vel.vx * 2
  let y = vel.vy * 2
  
  let maxAngle = 7
  
  if (x > maxAngle) x = maxAngle
  if (x < -maxAngle) x = -maxAngle
  if (y > maxAngle) y = maxAngle
  if (y < -maxAngle) y = -maxAngle
  
  target.style.transform = `rotateX(${y}deg) rotateY(${x}deg)`
})

mousedown.subscribe(md => target.style.transformOrigin = `${md.offsetX}px ${md.offsetY}px`)
touchstart.subscribe(ts => target.style.transformOrigin = `${ts.offsetX}px ${ts.offsetY}px`)

drag.subscribe(pos => {
  target.style.top = `${pos.top}px`
  target.style.left = `${pos.left}px`
})

mouseup.subscribe(mo => target.style.transform = 'rotateX(0) rotateY(0)')
touchend.subscribe(te => target.style.transform = 'rotateX(0) rotateY(0)')

// initial position
const rect = target.getBoundingClientRect()
target.style.top = `${(window.innerHeight - rect.height) / 2}px`
target.style.left = `${(window.innerWidth - rect.width) / 2}px`

