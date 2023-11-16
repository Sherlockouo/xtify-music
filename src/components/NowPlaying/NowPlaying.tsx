import { css, cx } from '@emotion/css'
import player from '@/states/player'
import { useSnapshot } from 'valtio'
import { AnimatePresence, motion } from 'framer-motion'
import ArtistInline from '../ArtistsInLine'
import persistedUiStates from '@/states/persistedUiStates'
import Controls from './Controls'
import Cover from './Cover'
import Progress from './Progress'
import { ease } from '@/utils/const'
import Icon from '../Icon'
import Info from './Info'

const NowPlaying = () => {
  const { track } = useSnapshot(player)
  const { minimizePlayer } = useSnapshot(persistedUiStates)

  return (
    <>
      {/* Now Playing */}
      <AnimatePresence>
        {!minimizePlayer && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ ease, duration: 0.4 }}
            className={cx(
              'relative flex aspect-square h-full w-full flex-col justify-end overflow-hidden rounded-24 border',
              css`
                border-color: hsl(0, 100%, 100%, 0.08);
              `
            )}
          >
            {/* Cover */}
            <Cover />

            {/* Info & Controls */}
            <Info />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Controls */}
      <Controls />
    </>
  )
}

export default NowPlaying