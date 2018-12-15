import UserInfoConsumer from '../../component/UserInfoContext'
import './blog.less'
import List from './src/List'
import Details from './src/Details'
import Edit from './src/Edit'
import Add from './src/Add'

const ListPage = UserInfoConsumer(List)
const DetailsPage = UserInfoConsumer(Details)
const EditPage = UserInfoConsumer(Edit)
const AddPage = UserInfoConsumer(Add)
export { ListPage, DetailsPage, EditPage, AddPage }
