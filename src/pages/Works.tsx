import React, { useEffect, useState, memo } from 'react'
import { Box } from '@material-ui/core'
import AddWork from '../components/AddWork'
import FindWork from '../components/FindWork'
import { useQuery } from '@apollo/client'
import { GET_PRODUCTS } from '../grapql/query/query'
import { ProductsData } from '../grapql/types'
import Loader from '../components/Loader'
import WorkCard from '../components/WorkCard'
import Reload from '../components/Reload'
import { NetworkStatus } from '@apollo/client'

const Home: React.FC = memo(() => {
  const [find, setFindVal] = useState('')

  const { data, loading, refetch, networkStatus } = useQuery<ProductsData, null>(GET_PRODUCTS, {
    notifyOnNetworkStatusChange: true,
  })

  useEffect(() => {
    document.title = 'Роботи'
  }, [])

  if (networkStatus === NetworkStatus.loading && loading) {
    return <Loader />
  }

  const works = data?.products
    .filter((product) => {
      const word = find.toLocaleLowerCase()
      const title = product.title.toLocaleLowerCase()

      return title.includes(word)
    })
    .map((product) => <WorkCard key={product.id} {...product} />)

  return (
    <Box>
      <Box display='flex' flexWrap='wrap' justifyContent='space-between' alignItems='center'>
        <h1>Роботи</h1>
        <Box display='flex' alignItems='center'>
          <AddWork />
          <Reload refetch={refetch} loading={networkStatus} />
        </Box>
      </Box>
      <Box marginTop='10px'>
        <FindWork filter={setFindVal} />
      </Box>
      <Box display='flex' marginLeft='-10px' marginTop='30px' flexWrap='wrap'>
        {works}
      </Box>
      {works!.length === 0 ? <Box textAlign='center'>Роботи відсутні</Box> : null}
    </Box>
  )
})

export default Home
