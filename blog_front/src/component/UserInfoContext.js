
import React, {createContext} from 'react'
const {Provider, Consumer} = createContext()

export default Component => function UserInfoConsumer (props) {
  return (
    <Consumer>
      {value => <Component {...props} userInfo={value} />}
    </Consumer>
  )
}

export {Provider as UserInfoProvider}
