import Categories from '@/components/Categories';
import Layout from '@/components/Layout';

import clientAxios from '../../config/clientAxios'
import Head from 'next/head';

export default function Home({categories}) {
  return (
    <>
      <Head>
        <title>{`CP COSMETO `}</title>
      </Head>

      
     <Categories categories={categories}/>
       
         </>
  )
}

export async function getServerSideProps() {

    try {
      const response = await clientAxios.get('/api/getCategories');
  return {
    props: {
      categories : response.data
    }
  }
    } catch (error) {
      return {
        props: {
          notFound: true
        }
      }   
    }

}