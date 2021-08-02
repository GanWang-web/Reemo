import React from 'react'

export default function Mainpage() {
  return (
    <div style={{
      display:'flex',
      justifyContent:'center',
      alignItems:'center',
      flexDirection:'column',
      flexGrow:"-1",
    }}
    >
      <h2 style={{maxWidth:"30rem",marginTop:"7rem"}}>
      Welcome to Reemo v1.0, this platform is for data storage, users can store up to 10G data on this platform without any charge. Due to this platform is in testing phase, please don't store important data on this platform. If you find any loopholes or you have any issues with this platform, please don't hesitate to send email to the developer,sammywang1224@gmail.com.
      </h2>
    </div>
  )
}
