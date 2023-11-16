import { useParams } from 'react-router-dom'
import PageTransition from '@/components/PageTransition'
import TrackList from './TrackList'
import player from '@/states/player'
import usePlaylist from '@/api/hooks/usePlaylist'
import Header from './Header'
import useTracks from '@/api/hooks/useTracks'

const Playlist = () => {
  const params = useParams()
  const { data: playlist } = usePlaylist({
    id: Number(params.id),
  })

  const { data: playlistTracks } = useTracks({
    ids: playlist?.playlist?.trackIds?.map(t => t.id) ?? [],
  })

  const onPlay = async (trackID: number | null = null) => {
    await player.playPlaylist(playlist?.playlist?.id, trackID)
  }

  return (
    <PageTransition>
      <Header />
      <div className='pb-10'>
        <TrackList
          tracks={playlistTracks?.songs ?? playlist?.playlist?.tracks ?? []}
          onPlay={onPlay}
          className='z-10 mt-10'
        />
      </div>
    </PageTransition>
  )
}

export default Playlist
