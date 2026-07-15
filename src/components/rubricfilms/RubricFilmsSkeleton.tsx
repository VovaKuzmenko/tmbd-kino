import Skeleton from 'react-loading-skeleton'
import styles from './rubricfilm.module.css'

type RubricFilmsSkeletonProps = {
  count?: number
}

export const RubricFilmsSkeleton = ({ count = 6 }: RubricFilmsSkeletonProps) => {
  return (
    <div className={styles.positional__properties}>
      {Array.from({ length: count }).map((_, index) => (
        <article key={index} className={styles.skeletonCard}>
          <Skeleton className={styles.skeletonPoster} />
          <div className={styles.skeletonBottom}>
            <Skeleton height={16} width="72%" />
            <Skeleton circle width={26} height={26} />
          </div>
        </article>
      ))}
    </div>
  )
}