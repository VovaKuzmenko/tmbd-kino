




{/* тут продумать стили для кнопки, как передать название */ }

interface BlockProps {
  showButton?: boolean;
}


export const Button = ({ showButton }: BlockProps) => {
  return (
    <div>
      {showButton && (
        <button>Я кнопка которая везщдесущая</button>)}
    </div>
  )
}