import type { IData } from "../Components/Mainpage"

interface ICard extends IData{
  bgcolor?:"black" |"red",
  textcolor?:"white"
}


const Card = ({title,link,tags,type,userId}:ICard) => {
  return (
    <div>
      {title}
      {JSON.stringify(tags)}
      {JSON.stringify(userId)}
      {link}
      {type}
      {title}
    </div>
  )
}

export default Card