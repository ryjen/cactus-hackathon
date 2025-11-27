import type { Action } from "@/lib/core/types"

export type CameraState = {
    url: string | null
}

export type CameraAction =
    Action<'CAPTURE', string>