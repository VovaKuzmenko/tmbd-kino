import { useAppDispatch } from '../../../../../../src/'
import { ChangeEvent } from 'react'
import {
  sortByPopularityDecrease,
  sortByPopularityIncrease,
  sortByVoteAverageDecrease,
  sortByVoteAverageIncrease,
  sortByReleaseDateDecrease,
  sortByReleaseDateIncrease,
  sortByTitleIncrease,
  sortByTitleDecrease,
} from '../../../../../store/app-slice'


export const DropList = () => {
  const dispatch = useAppDispatch()

  const handleSortChange = (e: ChangeEvent<HTMLSelectElement>) => {
    switch (e.target.value) {
      case 'popularityDecrease':
        dispatch(sortByPopularityDecrease())
        break
      case 'popularityIncrease':
        dispatch(sortByPopularityIncrease())
        break
      case 'vote_averageDecrease':
        dispatch(sortByVoteAverageDecrease())
        break
      case 'vote_averageIncrease':
        dispatch(sortByVoteAverageIncrease())
        break
      case 'primary_release_dateDecrease':
        dispatch(sortByReleaseDateDecrease())
        break
      case 'primary_release_dateIncrease':
        dispatch(sortByReleaseDateIncrease())
        break
      case 'original_titleIncrease':
        dispatch(sortByTitleIncrease())
        break
      case 'original_titleDecrease':
        dispatch(sortByTitleDecrease())
        break
      default:
        break
    }

    return (
      <div>
        {/* Выпадающий список непосредственно */}

        <select className="sortSelect" onChange={handleSortChange}>
          <option value="popularityDecrease" >Popularity ↓</option>
          <option value="popularityIncrease">Popularity ↑</option>
          <option value="vote_averageDecrease">Rating ↓</option>
          <option value="vote_averageIncrease">Rating ↑</option>
          <option value="primary_release_dateDecrease">Release Date ↓</option>
          <option value="primary_release_dateIncrease">Release Date ↑</option>
          <option value="original_titleIncrease">Title A-Z</option>
          <option value="original_titleDecrease">Title Z-A</option>
        </select>
      </div>
    )
  }