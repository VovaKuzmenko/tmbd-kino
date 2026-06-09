




{/* тут продумать стили для кнопки, как передать название */ }

// const rubrics: Array<{ title: string; category: FilmCategory }> = [
//   { title: 'Popular Movies', category: 'popular' },
//   { title: 'Top Rated Movies', category: 'top_rated' },
//   { title: 'Upcoming Movies', category: 'upcoming' },
//   { title: 'Now Playing Movies', category: 'now_playing' },
// ]

type ButtonProps = {
  key: string
  title: string
  category: string
}

const HanddlerButtonCategory = {

}



export const Button = ({ key, title, category }: ButtonProps) => {
  return (
    <div>
      <button onClick={HanddlerButtonCategory}>{title}</button>
    </div>
  )
}