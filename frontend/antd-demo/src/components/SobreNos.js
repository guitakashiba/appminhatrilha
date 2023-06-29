//SobreNos.js
import React from 'react';
import { Card, Image } from 'antd';
//import { UserOutlined } from '@ant-design/icons';
import { Carousel } from 'antd';
import './sobreNos.css';
const { Meta } = Card;

const teamMembers = [
  {img: "../../../1.png", desc: "Descrição 1"},
  {img: "../../../2.png", desc: "Descrição 2"},
  {img: "../../../3.png", desc: "Descrição 3"}
]

const supporters = [
  {img: "link/to/image1", desc: "Descrição 1"},
  {img: "link/to/image2", desc: "Descrição 2"},
  {img: "link/to/image3", desc: "Descrição 3"}
]

const projectOrigin = "Texto sobre a origem do projeto";

const contentStyle = {
  color: '#fff',
  background: '#364d79',
};

const imageStyle = {
  'background-size': 'contain', // A imagem vai escalar proporcionalmente sem ser cortada
}

  function SobreNos() {
    return (
      <div className="site-card-wrapper">
        <Card 
          style={{ width: '100%', maxHeight: 600}} 
          bodyStyle={{width: '100%', maxWidth: '100%'}}
        >
          <Carousel autoplay>
              {teamMembers.map((member, i) => (
                <div key={i} className='container'>
                      <Image
                      width={'500px'}
                      src={member.img}
                      />
                </div>
              ))}
          </Carousel>
        </Card>
        <Card>
          <Carousel >
              {supporters.map((member, i) => (
                  <div key={i}>
                      <h3 style={contentStyle}>
                        <img src={member.img} alt={`Professor ${i + 1}`} style={imageStyle}/>
                        <p>{member.desc}</p>
                      </h3>
                  </div>
              ))}
          </Carousel>
        </Card>
      </div>
    );
  }

export default SobreNos;
