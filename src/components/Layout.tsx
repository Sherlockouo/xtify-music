import Main from '@/components/Main'
import Player from '@/components/Player'
import MenuBar from '@/components/MenuBar'
import Topbar from '@/components/Topbar/TopbarDesktop'
import { css, cx } from '@emotion/css'
import player from '@/states/player'
import { useSnapshot } from 'valtio'
import Login from './Login'
import TitleBar from './TitleBar'
import uiStates from '@/states/uiStates'
import ContextMenus from './ContextMenus/ContextMenus'
import settings from '@/states/settings'
import { ease } from '../utils/const'
import { motion } from 'framer-motion'
import Router from '@/components/Router'
import { arch,osType } from '@/utils/env'

const Layout = () => {
  const playerSnapshot = useSnapshot(player)
  const { fullscreen } = useSnapshot(uiStates)
  const showPlayer = !!playerSnapshot.track
  const { showBackgroundImage, theme } = useSnapshot(settings)

  return (
    <div>
      {location.pathname == '/desktoplyrics' ? (
        <Router />
      ) : (
        <div
      id='layout'
      className={cx(
        'h-full',
        'bg-img ',
        css`
          position: relative;
        `
      )}
    >
      {/* layout */}
      <motion.div
        className={cx(
          'h-full',
          css`
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
          `,
          showBackgroundImage &&
            css`
              background-repeat: no-repeat;
              background-size: cover;
              background-position: center;
              transform: translate3d(0, 0, 0);
            `,
          theme === 'dark' ? 'bg-black/90' : 'bg-white/90'
        )}
        style={{ backgroundImage: showBackgroundImage ? `url(${player.track?.al?.picUrl})` : '' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3, ease }}
      >
        <div
          className={cx(
            css`
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              background-color: rgba(0, 0, 0, 0.05); /* 设置半透明背景颜色 */
              z-index: 1; /* 设置层级为较高的值，确保遮罩在内容上方 */
              pointer-events: none;
            `
          )}
        ></div>
      </motion.div>
      {/* mask */}
      <motion.div
        className={cx(
          'absolute inset-0 z-0',
          theme === 'dark' ? 'bg-black/40' : 'bg-white/40'
        )}
      />
      <div
        id='layout-foreground'
        className={cx(
          'rounded-12',
          'backdrop-blur-md',
          'relative grid h-screen select-none overflow-hidden',
          'text-black transition-colors duration-400 dark:text-white'
        )}
      >
        <MenuBar />
        <div className=''>
          <Topbar />
        </div>
        <Main />
        <Login />
        {showPlayer && <Player />}
        {
        // (window.env?.isWindows ||
        //   window.env?.isLinux ||
        //   window.localStorage.getItem('showWindowsTitleBar') === 'true') && 
        
          osType == "Windows" || osType == "Linux" &&  <TitleBar />
          }

        <ContextMenus />
      </div>
    </div>
      )
      }
    </div>
    
  )
}

export default Layout
