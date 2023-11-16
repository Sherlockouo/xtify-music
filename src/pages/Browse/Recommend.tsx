import { fetchDailyRecommendPlaylists, fetchRecommendedPlaylists } from '@/api/playlist'
import { PlaylistApiNames } from '@/shared/api/Playlists'
import { useQuery } from '@tanstack/react-query'
import CoverRowVirtual from '@/components/CoverRowVirtual'

const reactQueryOptions = {
  refetchOnWindowFocus: false,
  refetchInterval: 1000 * 60 * 60, // 1 hour
  refetchOnMount: false,
}

const Recommend = () => {
  const { data: dailyRecommendPlaylists, isLoading: isLoadingDaily } = useQuery(
    [PlaylistApiNames.FetchDailyRecommendPlaylists],
    () => fetchDailyRecommendPlaylists(),
    reactQueryOptions
  )
  const { data: recommendedPlaylists, isLoading: isLoading } = useQuery(
    [PlaylistApiNames.FetchRecommendedPlaylists, { limit: 500 }],
    () => fetchRecommendedPlaylists({ limit: 500 }),
    reactQueryOptions
  )
  const playlists =
    isLoadingDaily || isLoading
      ? []
      : [...(dailyRecommendPlaylists?.recommend || []), ...(recommendedPlaylists?.result || [])]

  return <CoverRowVirtual playlists={playlists} />
}

export default Recommend
