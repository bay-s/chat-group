import React from 'react'
import img1 from '../img/a053c2e82b0c5e6a4cc853ca846cc000.svg'
import img2 from '../img/fde233b6899a1a0fac64c419724e668b.svg'
import img3 from '../img/2cb8e7219e1554e094c4a0316e0ab2c2.svg'
import img4 from '../img/5d8898dd9356f25901bae20fc8c980d9.svg'
import img5 from '../img/45d6946387a0c66f4eb4e62a6e7758ea.svg'
import img6 from '../img/b7b57e9fa6377409691f498d5d48714e.svg'


const ModalContent = ({chooseServer}) => {
    const arr = [
        {
          img:img1,
          name:"Gaming",
          cat:'gaming'
        },
        {
          img:img2,
          name:'School Club',
          cat:'school'
        },
        {
          img:img3,
          name:"Friends",
          cat:'friend'
        },
        {
          img:img4,
          name:'Artist Creator',
          cat:'creator'
        },
        {
          img:img5,
          name:'Local Community',
          cat:'local'
        },
        {
          img:img6,
          name:'Study Group',
          cat:'study'
        }
       ]
    return(
<div class="modal-card">
        <header class="modal-card-head align-start">
         <div className='is-flex flex-column gap-1'>
         <p class="modal-card-title is-title text-center is-bold is-size-5">Create Server</p>
         <p className='lh-base  text-center px-5'>
          Your server is where you and your friend hang out , Make your and start talking.
         </p>
         </div>
          <button class="delete" aria-label="close"></button>
        </header>

<section class="modal-card-body modal-contents">

<ul className='is-flex flex-column gap-1'>
{
  arr.map(item => {
    return <li className='button is-large is-light is-flex justify-between align-center py-5' data-category={item.cat} onClick={chooseServer }>
<div className='is-flex align-center gap-1'>
<figure class="image is-36x36" >
  <img src={item.img} data-category={item.cat} />
</figure>
<span className='is-title is-bold is-size-6' data-category={item.cat} >{item.name}</span>
</div>
<i class="fa fa-caret-right" aria-hidden="true" data-category={item.cat} ></i>
</li>
  })
}
</ul>

 </section>

</div>
    )
}

export default ModalContent