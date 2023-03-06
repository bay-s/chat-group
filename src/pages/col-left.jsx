import React from 'react'

const ColumnLeft = () => {

    return(
        
<>

<header className='p-4 border headers'>
    <h3 className='is-title has-text-primary text-center is-size-5'>Messages</h3>
</header>
{/* START USER MESSAGE */}
<div className='is-flex justify-between is-clickable user-message p-3'>

<div className='is-flex align-center gap-1 '>
<figure class="image is-24x24">
<img class="is-rounded" src="https://bulma.io/images/placeholders/128x128.png" />
</figure>
<h3 className='is-title'>Eren Yeager</h3>
</div>
<h3 className='is-title'>05.11 PM</h3>

</div>
{/* END USER MESSAGE */}

{/* START USER MESSAGE */}
<div className='is-flex justify-between is-clickable user-message p-3'>

<div className='is-flex align-center gap-1 '>
<figure class="image is-24x24">
<img class="is-rounded" src="https://bulma.io/images/placeholders/128x128.png" />
</figure>
<h3 className='is-title'>Eren Yeager</h3>
</div>
<h3 className='is-title'>05.11 PM</h3>

</div>
{/* END USER MESSAGE */}




</>
    )
}

export default ColumnLeft