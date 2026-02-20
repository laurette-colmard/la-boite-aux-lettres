export const useScroll = (threshold: number = 100) => {
  const isScrolled = ref(false)
  let rafId: number | null = null
  
  const handleScroll = () => {
    if(rafId) return

    rafId = requestAnimationFrame(() => {
      isScrolled.value = window.scrollY > threshold
      rafId = null
    })
  }
  
  onMounted(() => {
    window.addEventListener('scroll', handleScroll)
    handleScroll()
  })
  
  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
  })
  
  return { isScrolled }
}