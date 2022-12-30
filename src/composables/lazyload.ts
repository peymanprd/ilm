export function useLazyLoad(path: string): any {
  if (!path) {
    console.warn('path is void!')
    return
  }
  return () => import(/* @vite-ignore */ path)
}
