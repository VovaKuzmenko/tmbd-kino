
// это досступ к спрайтам
// import iconSprite from '../../assets/images/icons-sprite.svg'

// типизация спрайта
type IconPropsType = {
  iconId: string
  width?: string
  height?: string
  viewBox?: string
}




export const Icon = (props: IconPropsType) => {
  return (
    <div>
      {/* тут значения из пропсов */}
      {/* <svg width={...}... /> */}
      {/* <use XLiunkHref={`${iconSprite}#${props.id}`} /> */}
    </div>
  )
}