import { WelcomeBlock } from "../WelcomeBlock"
import { Rubric } from "../rubric/Rubric"


export const MenuMain = () => {

  //  Здесь по идее сделать запрос и передать в пропсы название рубрики и фильмы конкретной рубрики
  // 

  return (
    <div>
      <WelcomeBlock />
      < Rubric />
      < Rubric />
      < Rubric />
      < Rubric />
      < Rubric />
    </div>
  )
}