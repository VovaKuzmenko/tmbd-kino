import { WelcomeBlock } from "../WelcomeBlock"
import { Rubric } from "../rubric/Rubric"
import type { FilmCategory } from "../../../components/types"
import styles from './MenuMain.module.css'

type RubricItem = {
  title: string
  category: FilmCategory
}

type MenuMainProps = {
  rubrics: RubricItem[]
}

export const MenuMain = ({ rubrics }: MenuMainProps) => {
  return (
    <div className={styles.menuMain}>
      <WelcomeBlock />

      <div className={styles.rubricsList}>
        {rubrics.map((rubric) => (
          <Rubric
            key={rubric.category}
            title={rubric.title}
            category={rubric.category}
            showMoreButton={true}
            showAllMovies={false}
          />
        ))}
      </div>
    </div>
  )
}