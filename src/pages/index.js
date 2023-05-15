import Image from 'next/image'
import { Inter } from 'next/font/google'
import Form from '../../components/Form/Form'
import Layout from '../../components/Layout/Layout'
import clientAxios from '../../config/clientAxios'
const inter = Inter({ subsets: ['latin'] })

export default function Home(props) {

  console.log(props)
  return (
   
    <Layout>
      
      <Form services={props.services} /> 
         </Layout>
    
  )
}

export async function getServerSideProps() {
    
  const response = await clientAxios.get('/api/getService');
  return {
    props: {
      services : response.data
    }
  }

}