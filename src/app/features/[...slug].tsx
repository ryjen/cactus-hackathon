import { useLocalSearchParams } from 'expo-router'
import { loadFeature } from '@/features'
import { useEffect, useState, useMemo } from 'react'
import { Text } from 'react-native'
import { container } from 'tsyringe'

export default function FeatureRoute() {
  const { slug } = useLocalSearchParams<{ slug: string[] }>()
  const [meta, setMeta] = useState<any>(null)

  if (!slug || slug.length === 0) {
    console.error(`Invalid feature: ${slug}`)
    return <Text>Invalid feature route</Text>
  }

  const [featureName, screenKey = 'index'] = slug

  if (!featureName) {
    console.error(`Invalid feature: ${featureName}`)
    return <Text>Invalid feature</Text>
  }

  // Convert remaining segments into a map
  const params: Record<string, string> = {}
  for (let i = 2; i < slug.length; i += 2) {
    const key = slug[i]
    const value = slug[i + 1]
    if (key && value) params[key] = value
  }

  useEffect(() => {
    loadFeature(featureName)
      .then((loadedMeta) => {
        setMeta(loadedMeta)
        loadedMeta.init?.(container)
      })
      .catch((e) => {
        console.error(`Failed to load feature: ${featureName}`, e)
      })
  }, [featureName])

  if (!meta) {
    return null
  }

  const Screen = meta.screens?.[screenKey] ?? meta.entryComponent

  if (!Screen) {
    console.error(`Invalid screen: ${screenKey}`)
    return null
  }

  return <Screen params={params} />
}
