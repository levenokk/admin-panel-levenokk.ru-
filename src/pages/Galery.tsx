import React, { useEffect, memo, useMemo } from 'react'
import { Box } from '@material-ui/core'
import Upload from '../components/AddImg'
import Image from '../components/ImageCard'
import {NetworkStatus, useQuery} from '@apollo/client'
import { GET_IMAGES } from '../grapql/query/query'
import { Images } from '../grapql/types'
import Loader from '../components/Loader'
import Reload from "../components/Reload";

const Galery: React.FC = () => {
  const { data, loading, refetch, networkStatus } = useQuery<Images, null>(GET_IMAGES, {
      notifyOnNetworkStatusChange: true,
  })

  const images = useMemo(()=>data?.images,[data])

  useEffect(() => {
    document.title = 'Зображення'
  }, [])

  if (networkStatus === NetworkStatus.loading && loading) {
    return <Loader />
  }
  return (
    <Box>
      <Box display="flex" flexWrap="wrap" justifyContent="space-between" alignItems="center">
        <h1>Зображення</h1>
        <Box display="flex" alignItems="center">
          <Upload />
          <Reload refetch={refetch} loading={networkStatus}/>
        </Box>
      </Box>
      <Box display="flex" marginLeft="-10px" marginTop="30px" flexWrap="wrap">
        {images?.map((item) => (
          <Image id={item.id} key={item.id} url={item.url} />
        ))}
      </Box>
      {images?.length === 0 && <Box textAlign="center">Фотографії відсутні</Box>}
    </Box>
  )
}

export default memo(Galery)
