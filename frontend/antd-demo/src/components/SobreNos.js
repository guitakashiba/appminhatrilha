//SobreNos.js
import React from 'react';
import { Card } from 'antd';
//import { UserOutlined } from '@ant-design/icons';
import { Carousel } from 'antd';
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
  height: 'auto',
  width: 'auto',
  display: 'flex', // Adicionado para centralizar a imagem verticalmente
  alignItems: 'center', // Adicionado para centralizar a imagem verticalmente
  justifyContent: 'center', // Adicionado para centralizar a imagem horizontalmente
  color: '#fff',
  background: '#364d79',
};

const imageStyle = {
  maxWidth: '100%', // A imagem vai tentar preencher o máximo de espaço horizontal disponível, mas não mais que isso
  maxHeight: '100%', // A imagem vai tentar preencher o máximo de espaço vertical disponível, mas não mais que isso
  objectFit: 'contain', // A imagem vai escalar proporcionalmente sem ser cortada
}

  function SobreNos() {
    return (
      <div className="site-card-wrapper">
        <Card style={{ width: 'auto', height: 'auto' }}>
          <Carousel autoplay>
              {teamMembers.map((member, i) => (
                  <div key={i}>
                      <h3 style={contentStyle}>
                        <img src={member.img} alt={`Membro ${i + 1}`} style={imageStyle}/>
                        <p>{member.desc}</p>
                      </h3>
                  </div>
              ))}
          </Carousel>
        </Card>
        <Card>
          <Carousel autoplay>
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
