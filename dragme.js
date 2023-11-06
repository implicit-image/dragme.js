
function dragme(selector, handler, resetEvent) {

  let mousePosX = 0
  let mousePosY = 0
  var offsetX = 0
  var offsetY = 0
  var oldStyleList = []

  document.onmousemove = (event) => {
    mousePosX = event.clientX
    mousePosY = event.clientY
  }

  function dragmeSetup(draggableSelector, resetHandlerSelector, resetHandlerEvent) {

    //set up reset event handler
    let resetHandler = document.querySelectorAll(resetHandlerSelector)[0] || 0
    console.log("reset handler: ", resetHandler)
    if (resetHandler != 0) {
      resetHandler.addEventListener(resetHandlerEvent, (event) => {

        let draggableEls = document.querySelectorAll(draggableSelector)
        let oldStyle = oldStyleList.filter((elem) => elem.selector == draggableSelector)[0]

        if (draggableEls.length > 0) {
          for (el of draggableEls) {
            el.style = oldStyle
            console.log("changing style")
          }
        }
        console.log("reset clicked")

      })
    }

    let draggableEls = document.querySelectorAll(draggableSelector)

    if (draggableEls.length > 0) {
      for (el of draggableEls) {
        enableDragMe(el, draggableSelector)
      }
    }
    console.log(oldStyleList)
  }

  function onMouseUp(event) {
    let obj = event.target
    obj.removeEventListener("mousemove", onMouseMove)
  }

  function onMouseMove(event) {
    let obj = event.target
    obj.style.left = `${mousePosX - offsetX}px`
    obj.style.top = `${mousePosY - offsetY}px`
  }

  function onMouseLeave(event) {
    let obj = event.target
    obj.removeEventListener("mousemove", onMouseMove)
  }

  function onMouseDown(event) {
    let obj = event.target

    var rect = obj.getBoundingClientRect()

    offsetX = mousePosX - rect.left
    offsetY = mousePosY - rect.top

    obj.style.left = `${rect.left}px`
    obj.style.top = `${rect.top}px`

    obj.style.zIndex = 1000

    obj.addEventListener("mousemove", onMouseMove)
    obj.addEventListener("mouseup", onMouseUp)
    obj.addEventListener("mouseleave", onMouseLeave)
    obj.style.border = "solid blue 3px"
  }

  function enableDragMe(obj, selector) {
    oldStyleList.push({
      selector: selector,
      style: obj.style
    })
    obj.classList.toggle("draggable", true)
    obj.addEventListener("mousedown", onMouseDown)
    console.log("enabled ", obj)
  }

  dragmeSetup(selector, handler, resetEvent)
}
