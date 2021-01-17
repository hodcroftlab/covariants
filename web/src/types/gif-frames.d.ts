declare module 'gif-frames' {
  import type { Stream } from 'stream'

  export interface GitFramesOptions {
    url: string
    frames: number
    outputType?: string
  }

  export type FrameInfo = Record<string, unknown>

  export interface FrameData {
    getImage(): Stream
    frameIndex: number
    frameInfo: FrameInfo
  }

  export default async function gifFrames(options: GitFramesOptions): Promise<FrameData[]>
}
