import { WelcomeBlock } from "../WelcomeBlock"
import { Rubric } from "../rubric/Rubric"
import type { FilmCategory } from "../../../components/types"

const rubrics: Array<{ title: string; category: FilmCategory }> = [
  { title: 'Popular Movies', category: 'popular' },
  { title: 'Top Rated Movies', category: 'top_rated' },
  { title: 'Upcoming Movies', category: 'upcoming' },
  { title: 'Now Playing Movies', category: 'now_playing' },
]

export const MenuMain = () => {



  return (
    <div>
      <WelcomeBlock />
      {rubrics.map((rubric) => (
        <Rubric key={rubric.category} title={rubric.title} category={rubric.category} />
      ))}
      {/* < Rubric />
      < Rubric />
      < Rubric />
      < Rubric /> */}
    </div>
  )
}