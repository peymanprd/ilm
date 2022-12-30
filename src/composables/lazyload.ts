export function useLazyLoad(path: string) {
  if (!path) {
    console.warn('path is void!')
    return
  }
  return () => import(/* @vite-ignore */ path)
}
