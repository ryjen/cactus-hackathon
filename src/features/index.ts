import type { FeatureMetadata } from '@/lib/domain/types'

const loaders: Record<string, () => Promise<any>> = {
  'camera': () => import('./camera/index'),
  'clues-creation': () => import('./clues-creation/index'),
  'game-creation': () => import('./game-creation/index'),
  'game-share': () => import('./game-share/index'),
  'welcome': () => import('./welcome/index'),
}

export async function loadFeature(name: string): Promise<FeatureMetadata> {
  const loader = loaders[name]
  if (!loader) throw new Error(`Unknown feature: ${name}`)
  const module = await loader()
  return module.default
}

