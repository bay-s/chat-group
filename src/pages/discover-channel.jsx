
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import img from '../img/no-post.jpeg'
import { getAllServer } from './get-data'


const DiscoverChannel = () => {
    const [channel,setChannel] = useState([])

    useState(() => {
    const getServer = async () => {
        const server = await getAllServer()
        setChannel(server.data)
    }
    getServer()
    },[channel])

    return(
<article className='column p-0 txt-white border-r has-background-black-bis' id='col-right'>

<div className='container p-5'>

<section class="hero banner">
  <div class="hero-body mx-auto text-center">
    <p class="txt-white is-title is-size-4">
       Find your community on ChatBox
    </p>
    <p class="subtitle mx-auto txt-white is-size-5 my-1">
      From gaming to music , to learn a place for you.
    </p>

<div class="field mt-5">
  <div class="control has-icons-right">
    <input class="input " type="email" placeholder="Explore community" />
    <span class="icon is-small is-right">
      <i class="fa fa-search "></i>
    </span>
  </div>
</div>

  </div>
</section>
{/* END HERO */}

{/* START COLUMNS */}
<section className='my-6 px-4'>
<h3 className='is-title is-size-5 py-4'>Featured communities</h3>
<div className='columns is-multiline txt-white '>
{/* START COL */}
{
 !channel ?  ""
  : channel.map(item => {
    return <div className='column is-4' >
<div class="card has-background-black">
<Link to={`/channel/${item.id}`}>
  <div class="card-image">
    <figure class="image is-4by3">
      <img src={!item.server_banner ?  img  : item.server_banner} className='cover' alt="Placeholder image" />
    </figure>
  </div>
  <div class="p-2 is-flex flex-column gap-1 txt-white">
    <Link to='' className='is-title is-size-6 txt-white'>{item.server_name}</Link>
    {/* <p className='lh-base is-size-7 has-text-grey'>
        The official server of genshin impact is defined but never used in america.
    </p> */}

    <ul className='is-flex justify-between align-center'>
     <li>
        <span className='lh-base is-size-7 has-text-grey'>200 Online</span>
     </li>
     <li>
        <span className='lh-base is-size-7 has-text-grey'>{!item.member ? "0" : item.member}</span>
     </li>
    </ul>
  </div>
</Link>
</div>
{/* end card */}
    </div>
  })
}
{/* end col */}

</div>

</section>
{/* END COLUMNS */}

</div>

</article>
    )
}

export default DiscoverChannel

