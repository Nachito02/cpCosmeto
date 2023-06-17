import Categories from '../../components/Categories';
import Layout from '../../components/Layout'
import clientAxios from '../../config/clientAxios'
import Head from 'next/head';

export default function Home({categories}) {
  return (
    <>
    <Head>
        <title>CP COSMETO - Reserva tu turno</title>
      </Head>
    <Layout>
      
     <Categories categories={categories}/>
         </Layout>
         </>
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