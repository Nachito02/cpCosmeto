import Form from '../../components/Form/Form'
import Layout from '../../components/Layout/Layout'
import clientAxios from '../../config/clientAxios'
export default function Home(props) {
  return (
    <Layout>
      <Form categories={props.categories} /> 
         </Layout>
  )
}

export async function getServerSideProps() {
  const response = await clientAxios.get('/api/getCategories');
  return {
    props: {
      categories : response.data
    }
  }

}