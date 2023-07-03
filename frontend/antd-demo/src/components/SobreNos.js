import React from 'react';
import { Card, Image } from 'antd';
import './sobreNos.css';

const teamMembers = [
  {img: "../../../sobrenos.png", desc: "Descrição 1"},
]

const imageStyle = {
  'background-size': 'contain',
}

function SobreNos() {
  return (
    <div className="site-card-wrapper">
      <Card 
        style={{ width: '100%', Height: '100%'}} 
        bodyStyle={{width: '100%', maxWidth: '100%'}}
      >
        <Image
          width={'65%'}
          src={teamMembers[0].img}
          style={imageStyle}
        />
      </Card>
    </div>
  );
}

export default SobreNos;
