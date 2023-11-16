import { resizeImage } from '@/utils/common'
import Image from '@/components/Image'
import { memo, useEffect, useState } from 'react'
import uiStates from '@/states/uiStates'
import VideoCover from '@/components/VideoCover'
import ArtworkViewer from '../ArtworkViewer'
import useSettings from '@/hooks/useSettings'

const Cover = memo(({ cover, videoCover }: { cover?: string; videoCover?: string }) => {
  useEffect(() => {
    if (cover) uiStates.blurBackgroundImage = cover
  }, [cover])

  const [isOpenArtworkViewer, setIsOpenArtworkViewer] = useState(false)

  return (
    <>
      <div
        onClick={() => {
          if (cover) setIsOpenArtworkViewer(true)
        }}
        className='relative aspect-square w-full overflow-hidden rounded-24'
      >
        <Image className='absolute inset-0' src={resizeImage(cover || '', 'lg')} />

        {videoCover && <VideoCover source={videoCover} />}
      </div>

      <ArtworkViewer
        type='album'
        artwork={cover || ''}
        isOpen={isOpenArtworkViewer}
        onClose={() => setIsOpenArtworkViewer(false)}
      />
    </>
  )
})
Cover.displayName = 'Cover'

export default Cover
