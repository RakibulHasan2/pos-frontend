import 'react'
import CommonTopNab from '../../Shared/CommonTopNav/CommonTopNab'
import useLoader from '../../Shared/Loader/Loader';
import FinalLoader from '../../Shared/Loader/FinalLoader';

export default function Home() {
  const { loading, online } = useLoader();
  if (loading || !online) {
      return <FinalLoader />;
  }
  return (
    <div className=''>
      <div>
        <CommonTopNab/>
      </div>
      
    </div>
  )
}
