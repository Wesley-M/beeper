/**
 * Sets the current scroll position from a container reference
 * */
export const setContainerScrollPos = (containerRef, pos) => {
  containerRef.current.scrollLeft = pos;
}