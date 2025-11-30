import { useMemo } from "react"
import { container, InjectionToken } from "tsyringe"

export const useDependency = <T>(token: InjectionToken<T>): T => {
    const dependency = useMemo(() => {
        return container.resolve<T>(token)
    }, [])

    return dependency
}
