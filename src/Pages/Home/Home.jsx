import 'react'
import CommonTopNab from '../../Shared/CommonTopNav/CommonTopNab'
import useLoader from '../../Shared/Loader/Loader';
import FinalLoader from '../../Shared/Loader/FinalLoader';
import useGetData from '../../Hooks/useGetData';

export default function Home() {
  const { loading, online } = useLoader();

  const { data: sellData,  } = useGetData(
    "http://localhost:5000/api/customerProduct/getAllCustomerProducts"
  );
console.log(sellData.data)

  if (loading || !online) {
      return <FinalLoader />;
  }
  return (
    <div className=''>
      <div>
        <CommonTopNab/>
      </div>


      <section>

      </section>

    </div>
  )
}
