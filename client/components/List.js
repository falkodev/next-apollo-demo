import React, { useState, useEffect } from 'react'
import { gql, useQuery } from '@apollo/client'
import Card from './Card'
import Search from './Search'
import styles from './List.module.css'

const List = () => {
  const LIMIT = 2
  const [users, setUsers] = useState([])
  const [loadMoreButton, setloadMoreButton] = useState(true)

  const handleLoadMore = () => {
      fetchMore({
          variables: {
              offset: data.users.length + 1,
              limit: LIMIT,
          }, updateQuery: (previousResult, { fetchMoreResult }) => {
              if (fetchMoreResult.users.length < 0) {
                setloadMoreButton(false)
              }
              if (!fetchMoreResult) {
                return previousResult
              }

              setUsers(previousResult.users)
              return Object.assign({}, previousResult, {
                  users: [...previousResult.users, ...fetchMoreResult.users]
              })
          }
      })
  }

  const handleSearch = (users) => {
    setUsers(users)
    setloadMoreButton(false)
  }

  const query = gql`
    query Users($limit: Int, $offset: Int) {
      users (limit: $limit, offset: $offset) {
        name
        address
        email
        phone
      }
    }
  `
  let { loading, error, data, fetchMore } = useQuery(query, {
    variables: {
      limit: LIMIT,
      offset: 0
    },
  })

  useEffect(() => {
    if (loading === false && data && data.users) {
      setUsers(data.users)
    }
  }, [loading, data])

  if (loading) return 'Loading...'
  if (error) return `Error! ${error.message}`

  return (
    <div className="cards">
      <Search onSearch={handleSearch} />
      <div className="cards__render">
        {users.length > 0 ? (
          users.map(user => {
            return (
              <div key={user.email + Date.now()}>
                <Card user={user} />
              </div>
            )
          })
        ) : (
          <div className={styles.none}>No results</div>
        )}
      </div>
      {
        loadMoreButton && <div onClick={handleLoadMore} style={{ margin: 'auto 2rem', width: '80%' }}>Load More</div>
      }
    </div>
  )
}

export default List
