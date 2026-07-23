
import type { AppDispatch } from "./../../../../../store/store"
import { useDispatch } from 'react-redux'
import {
  sortByPopularityDecrease,
  sortByPopularityIncrease,
  sortByRatingIncrease,
  sortByRatingDecrease,
  sortByReleaseDateDecrease,
  sortByReleaseDateIncrease,
  sortByTitleIncrease,
  sortByTitleDecrease,
  beginUiTask,
  endUiTask,
} from '../../../../../store/app-slice'
import styles from './Droplist.module.css'

export const DropList = () => {
  const dispatch = useDispatch<AppDispatch>()

  const runUiTask = (cb: () => void) => {
    dispatch(beginUiTask())
    cb()
    requestAnimationFrame(() => {
      dispatch(endUiTask())
    })
  }

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    switch (e.target.value) {
      case 'popularityDecrease':
        runUiTask(() => dispatch(sortByPopularityDecrease()))
        break
      case 'popularityIncrease':
        runUiTask(() => dispatch(sortByPopularityIncrease()))
        break
      case 'ratingDecrease':
        runUiTask(() => dispatch(sortByRatingDecrease()))
        break
      case 'ratingIncrease':
        runUiTask(() => dispatch(sortByRatingIncrease()))
        break
      case 'primary_release_dateDecrease':
        runUiTask(() => dispatch(sortByReleaseDateDecrease()))
        break
      case 'primary_release_dateIncrease':
        runUiTask(() => dispatch(sortByReleaseDateIncrease()))
        break
      case 'original_titleIncrease':
        runUiTask(() => dispatch(sortByTitleIncrease()))
        break
      case 'original_titleDecrease':
        runUiTask(() => dispatch(sortByTitleDecrease()))
        break
      default:
        break
    }
  }

  return (
    <div className={styles.block}>
      {/* Выпадающий список непосредственно */}
      <div>Sort by</div>
      <select className="sortSelect" onChange={handleSortChange}>
        <option value="popularityDecrease">Popularity ↓</option>
        <option value="popularityIncrease">Popularity ↑</option>
        <option value="ratingDecrease">Rating ↓</option>
        <option value="ratingIncrease">Rating ↑</option>
        <option value="primary_release_dateDecrease">Release Date ↓</option>
        <option value="primary_release_dateIncrease">Release Date ↑</option>
        <option value="original_titleIncrease">Title A-Z</option>
        <option value="original_titleDecrease">Title Z-A</option>
      </select>
    </div>
  )
}
