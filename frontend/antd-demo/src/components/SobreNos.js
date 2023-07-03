import React from 'react';
import { Card, Image } from 'antd';
import './sobreNos.css';

const teamMembers = [
  {img: "../../../sobrenosEquipe.png", desc: "Descrição 1"},
]


function SobreNos() {
  return (
    <div className="site-card-wrapper">
      <Card 
        style={{ 
          width: '100%', 
          height: '100%', 
          display: 'flex', 
          justifyContent: 'center',
          alignItems: 'center' 
        }}
        bodyStyle={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: '100%'
        }}
      >
        <Image
          width={'65%'}
          src={teamMembers[0].img}
          style={{ alignSelf: 'center' }} 
        />
      </Card>

    </div>
  );
}

export default SobreNos;
