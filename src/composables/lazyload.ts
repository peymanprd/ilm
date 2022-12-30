export function useLazyLoad(path: string): unknown {
  if (!path) {
    console.warn('path is void!')
    return
  }
  return () => import(/* @vite-ignore */ path)
}
